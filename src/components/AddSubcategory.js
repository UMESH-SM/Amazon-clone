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

export default function AddSubcategory({
  oldCategories,
  handleAddSubcategory,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("none");
  const [newSubcategory, setNewSubcategory] = useState("");
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

  const handleAddSubcategoryRequest = (e) => {
    e.preventDefault();
    if (categoryName === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a Category.",
      });
    } else {
      oldCategories.categories.forEach((item) => {
        if (item.category === categoryName) {
          if (item.subcategoriesList.includes(newSubcategory)) {
            setSnackbaralert({
              show: true,
              type: "error",
              msg:
                "Subcategory '" +
                newSubcategory +
                "' already exists in Category '" +
                categoryName +
                "'.",
            });
          } else {
            handleAddSubcategory(categoryName, newSubcategory);
            handleClose();
          }
        }
      });
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <div className="manageaccount__editBtn">
        <Button variant="contained" onClick={handleClickOpen}>
          Add Subcategory
        </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleAddSubcategoryRequest}>
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
                Add Subcategory
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                ADD
              </Button>
            </Toolbar>
          </AppBar>
          <div className="addcategory">
            <div className="addcategory__inputFields">
              <label>Select Category name</label>
              <select
                defaultValue="none"
                onChange={(e) => setCategoryName(e.target.value)}
              >
                <option value="none">--- select ---</option>
                {oldCategories &&
                  oldCategories.categoriesList.map((item) => (
                    <option value={item}>{capitalizeFirstLetter(item)}</option>
                  ))}
              </select>
            </div>
            <div className="addcategory__inputFields">
              <label>Enter Subcategory name</label>
              <input
                type="text"
                onChange={(e) =>
                  setNewSubcategory(e.target.value.toLowerCase())
                }
                minLength="4"
                required
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
