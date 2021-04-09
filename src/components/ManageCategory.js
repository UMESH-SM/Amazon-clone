import React, { useState, useEffect } from "react";
import "./ManageCategory.css";
import Header from "./Header";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import AddSubcategory from "./AddSubcategory";
import DeleteSubcategory from "./DeleteSubcategory";
import AddBrand from "./AddBrand";
import DeleteBrand from "./DeleteBrand";
import { db } from "../firebase_config";
import SnackBar from "./SnackBar";

function ManageCategory() {
  const [oldCategories, setOldCategories] = useState(null);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    db.collection("products")
      .doc("info")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const productsInfo = doc.data();
          setOldCategories(productsInfo);
        }
      })
      .catch((error) => {
        console.log(
          "Products info fetch error while managing categories: ",
          error
        );
      });
  }, []);

  const handleAddCategory = (newCategory, newSubcategories, newBrands) => {
    let oldCategoriesCopy = oldCategories;
    oldCategoriesCopy.categoriesList.push(newCategory);
    oldCategoriesCopy.categoriesList.sort();
    oldCategoriesCopy.categories.push({
      category: newCategory,
      subcategoriesList: newSubcategories.length
        ? newSubcategories.split(",")
        : [],
      brandsList: newBrands ? newBrands.split(",") : [],
    });

    db.collection("products")
      .doc("info")
      .set(oldCategoriesCopy)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg: "Category '" + newCategory + "' added.",
        });
      })
      .catch((error) => {
        console.error("Error adding new category: ", error);
      });

    setOldCategories(oldCategoriesCopy);
  };

  const handleDeleteCategory = (categoryName) => {
    let oldCategoriesCopy = oldCategories;
    oldCategoriesCopy.categoriesList = oldCategoriesCopy.categoriesList.filter(
      (item) => item !== categoryName
    );
    oldCategoriesCopy.categories = oldCategoriesCopy.categories.filter(
      (item) => item.category !== categoryName
    );

    db.collection("products")
      .doc("info")
      .set(oldCategoriesCopy)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg: "Category '" + categoryName + "' deleted.",
        });
      })
      .catch((error) => {
        console.error("Error deleting category: ", error);
      });

    setOldCategories(oldCategoriesCopy);
  };

  const handleAddSubcategory = (categoryName, newSubcategory) => {
    let oldCategoriesCopy = oldCategories;
    oldCategoriesCopy.categories.forEach((item) => {
      if (item.category === categoryName) {
        item.subcategoriesList.push(newSubcategory);
        item.subcategoriesList.sort();
      }
    });

    db.collection("products")
      .doc("info")
      .set(oldCategoriesCopy)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg:
            "Subcategory '" +
            newSubcategory +
            "' added to category '" +
            categoryName +
            "'.",
        });
      })
      .catch((error) => {
        console.error("Error adding new subcategory: ", error);
      });

    setOldCategories(oldCategoriesCopy);
  };

  const handleDeleteSubcategory = (categoryName, subcategoryName) => {
    let oldCategoriesCopy = oldCategories;
    oldCategoriesCopy.categories.forEach((item) => {
      if (item.category === categoryName) {
        item.subcategoriesList = item.subcategoriesList.filter(
          (names) => names !== subcategoryName
        );
      }
    });

    db.collection("products")
      .doc("info")
      .set(oldCategoriesCopy)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg:
            "Subcategory '" +
            subcategoryName +
            "' deleted from category '" +
            categoryName +
            "'.",
        });
      })
      .catch((error) => {
        console.error("Error deleting subcategory: ", error);
      });

    setOldCategories(oldCategoriesCopy);
  };

  const handleAddBrand = (categoryName, newBrand) => {
    let oldCategoriesCopy = oldCategories;
    oldCategoriesCopy.categories.forEach((item) => {
      if (item.category === categoryName) {
        item.brandsList.push(newBrand);
        item.brandsList.sort();
      }
    });

    db.collection("products")
      .doc("info")
      .set(oldCategoriesCopy)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg:
            "Brand '" +
            newBrand +
            "' added to category '" +
            categoryName +
            "'.",
        });
      })
      .catch((error) => {
        console.error("Error adding new brand: ", error);
      });

    setOldCategories(oldCategoriesCopy);
  };

  const handleDeleteBrand = (categoryName, brandName) => {
    let oldCategoriesCopy = oldCategories;
    oldCategoriesCopy.categories.forEach((item) => {
      if (item.category === categoryName) {
        item.brandsList = item.brandsList.filter(
          (names) => names !== brandName
        );
      }
    });

    db.collection("products")
      .doc("info")
      .set(oldCategoriesCopy)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg:
            "Brand '" +
            brandName +
            "' deleted from category '" +
            categoryName +
            "'.",
        });
      })
      .catch((error) => {
        console.error("Error deleting brand : ", error);
      });

    setOldCategories(oldCategoriesCopy);
  };

  return (
    <>
      <Header />
      <div className="managecategory">
        <div className="managecategory__buttonsContainer">
          <div className="managecategory__buttonPairs">
            <AddCategory
              oldCategories={oldCategories}
              handleAddCategory={handleAddCategory}
            />
            <DeleteCategory
              oldCategories={oldCategories}
              handleDeleteCategory={handleDeleteCategory}
            />
          </div>
          <div className="managecategory__buttonPairs">
            <AddSubcategory
              oldCategories={oldCategories}
              handleAddSubcategory={handleAddSubcategory}
            />
            <DeleteSubcategory
              oldCategories={oldCategories}
              handleDeleteSubcategory={handleDeleteSubcategory}
            />
          </div>
          <div className="managecategory__buttonPairs">
            <AddBrand
              oldCategories={oldCategories}
              handleAddBrand={handleAddBrand}
            />
            <DeleteBrand
              oldCategories={oldCategories}
              handleDeleteBrand={handleDeleteBrand}
            />
          </div>
        </div>
      </div>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </>
  );
}

export default ManageCategory;
