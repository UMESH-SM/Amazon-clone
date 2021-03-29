import React, { useState, useContext } from "react";
import "./EditUsername.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { UserContext } from "../contexts/UserContext";
import { db, fire } from "../firebase_config";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditUsername({ oldUsername }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(oldUsername);
  const [user, setUser] = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setUsername(oldUsername);
    setOpen(false);
  };

  const handleNameChange = (e, username) => {
    e.preventDefault();
    fire.auth().currentUser.updateProfile({
      displayName: username,
    });
    db.collection(user.uid).doc("user-info").update({
      name: username,
    });
    setUser({
      ...user,
      name: username,
    });

    setOpen(false);
  };

  return (
    <div>
      <div className="manageaccount__editBtn">
        <Button
          type="submit"
          variant="contained"
          size="small"
          onClick={handleClickOpen}
        >
          Change name
        </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={(e) => handleNameChange(e, username)}>
          <AppBar
            className={classes.appBar}
            style={{ backgroundColor: "#232f3e" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCancelEdit}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit Name
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className="editUsernameBox">
            <div>
              <label>Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
                autoFocus
                required
              />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
