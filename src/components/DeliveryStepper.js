import React, { useState } from "react";
import "./DeliveryStepper.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import StepConnector from "@material-ui/core/StepConnector";
import { Link } from "react-router-dom";

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(255,153,0) 0%, rgb(255,153,0) 50%, rgb(255,153,0) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(255,153,0) 0%, rgb(255,153,0) 50%, rgb(255,153,0) 100%)",
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(255,153,0) 0%,rgb(255,153,0) 50%,rgb(255,153,0) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(255,153,0) 0%,rgb(255,153,0) 50%,rgb(255,153,0) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocalShippingIcon style={{ color: "black" }} />,
    2: <PaymentIcon style={{ color: "black" }} />,
    3: <DoneOutlineIcon style={{ color: "black" }} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return ["DELIVERY", "PAYMENT", "PLACE ORDER"];
}

function DeliveryStepper({ step }) {
  const [activeStep, setActiveStep] = useState(step);
  const steps = getSteps();

  return (
    <div className="delivery__stepper">
      <Link to="/" className="delivery__stepperLink">
        <img src="amazon-logo2.png" alt="" />
      </Link>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default DeliveryStepper;
