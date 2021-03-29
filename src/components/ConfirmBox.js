import React, { useEffect } from "react";
import "./ConfirmBox.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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

export default function ConfirmBox({
  confirmbox,
  setConfirmbox,
  handleConfirmBoxConfirm,
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setConfirmbox({
      ...confirmbox,
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
          {confirmbox.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmbox.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {confirmbox.no}
          </Button>
          <Button onClick={handleConfirmBoxConfirm} color="primary">
            {confirmbox.ok}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
