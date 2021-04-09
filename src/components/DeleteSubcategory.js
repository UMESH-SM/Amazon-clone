import React, { useState, useEffect } from "react";
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
import ConfirmBox from "./ConfirmBox";

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

export default function DeleteSubcategory({
  oldCategories,
  handleDeleteSubcategory,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("none");
  const [subcategoryName, setSubcategoryName] = useState("none");
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [confirmbox, setConfirmbox] = useState({
    show: false,
    title: "",
    text: "",
    ok: "",
    no: "",
  });

  useEffect(() => {
    if (categoryName === "none") {
      setSubcategoriesList([]);
    } else {
      oldCategories &&
        oldCategories.categories.forEach((item) => {
          if (item.category === categoryName) {
            setSubcategoriesList(item.subcategoriesList);
          }
        });
    }
  }, [categoryName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleDeleteSubcategoryRequest = (e) => {
    e.preventDefault();
    if (categoryName === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a Category.",
      });
    } else if (subcategoryName === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a Subcategory.",
      });
    } else if (
      (categoryName === "electronics" ||
        categoryName === "clothing" ||
        categoryName === "footwear") &&
      (subcategoryName === "mobiles" ||
        subcategoryName === "laptops" ||
        subcategoryName === "tablets" ||
        subcategoryName === "televisions" ||
        subcategoryName === "shirts" ||
        subcategoryName === "trousers" ||
        subcategoryName === "jeans" ||
        subcategoryName === "t-shirts" ||
        subcategoryName === "shoes" ||
        subcategoryName === "sandals")
    ) {
      setSnackbaralert({
        show: true,
        type: "error",
        msg:
          "Cannot delete subcategory '" +
          subcategoryName +
          "' from the Application.",
      });
    } else {
      setConfirmbox({
        show: true,
        title: "Delete subcategory '" + subcategoryName + "'",
        text: "Are you sure?",
        ok: "Yes",
        no: "No",
      });
    }
  };

  const handleConfirmBoxConfirm = () => {
    setConfirmbox({
      ...confirmbox,
      show: false,
    });
    handleDeleteSubcategory(categoryName, subcategoryName);
    setSubcategoriesList(
      subcategoriesList.filter((item) => item !== subcategoryName)
    );
    handleClose();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <div className="manageaccount__editBtn">
        <Button variant="contained" onClick={handleClickOpen}>
          Delete Subcategory
        </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleDeleteSubcategoryRequest}>
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
                Delete Subcategory
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                Delete
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
              <label>Select Subcategory name</label>
              <select
                defaultValue="none"
                onChange={(e) => setSubcategoryName(e.target.value)}
              >
                <option value="none">--- select ---</option>
                {subcategoriesList &&
                  subcategoriesList.map((item) => (
                    <option value={item}>{capitalizeFirstLetter(item)}</option>
                  ))}
              </select>
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
      {confirmbox.show ? (
        <ConfirmBox
          confirmbox={confirmbox}
          setConfirmbox={setConfirmbox}
          handleConfirmBoxConfirm={handleConfirmBoxConfirm}
        />
      ) : null}
    </div>
  );
}
