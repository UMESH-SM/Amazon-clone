import React, { useState, useEffect } from "react";
import "./ProductDescription.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ProductDescription({
  item,
  productDescription,
  setProductDescription,
}) {
  const { searchName, image, images } = item;
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setProductDescription({
      ...productDescription,
      show: false,
    });
    setOpen(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{ width: "100%" }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {searchName}
        </DialogTitle>
        <DialogContent>
          <div className="productdescription">
            <div className="productdescription__image">
              <img src={selectedImage} alt="" />
            </div>
            <div className="productdescription__imagesContainer">
              {images.map((imageUrl, i) => (
                <div onClick={() => setSelectedImage(imageUrl)}>
                  <input
                    type="radio"
                    id={i}
                    name="description_images"
                    className="productdescription__images"
                    defaultChecked={imageUrl === image ? true : false}
                  />
                  <label for={i}>
                    <img src={imageUrl} alt="" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
