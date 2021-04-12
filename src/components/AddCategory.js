import React, { useState } from "react";
import "./AddCategory.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import SnackBar from "./SnackBar";

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

export default function AddCategory({ oldCategories, handleAddCategory }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategories, setNewSubcategories] = useState("");
  const [newBrands, setNewBrands] = useState("");
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleAddCategoryRequest = (e) => {
    e.preventDefault();
    if (oldCategories.categoriesList.includes(newCategory)) {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Category '" + newCategory + "' already exists.",
      });
    } else {
      handleAddCategory(newCategory, newSubcategories, newBrands);
      handleClose();
    }
  };

  return (
    <div>
      <div className="manageaccount__editBtn">
        <Button variant="contained" onClick={handleClickOpen}>
          Add Category
        </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleAddCategoryRequest}>
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
                Add Category
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                ADD
              </Button>
            </Toolbar>
          </AppBar>
          <div className="addcategory">
            <div className="addcategory__inputFields">
              <label>Enter Category name </label>
              <input
                type="text"
                minLength="4"
                autoFocus
                required
                onChange={(e) => setNewCategory(e.target.value.toLowerCase())}
              />
            </div>
            <div className="addcategory__inputFields">
              <label>
                Enter Subcategory names seperated by commas (Optional)
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setNewSubcategories(e.target.value.toLowerCase())
                }
              />
            </div>
            <div className="addcategory__inputFields">
              <label>Enter Brand names seperated by commas (Optional)</label>
              <input
                type="text"
                onChange={(e) => setNewBrands(e.target.value.toLowerCase())}
              />
            </div>
          </div>
        </form>
      </Dialog>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </div>
  );
}
