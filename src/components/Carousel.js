import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./Carousel.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath: "carousel/1sale.png",
  },
  {
    imgPath: "carousel/2amazon-echo.png",
  },
  {
    imgPath: "carousel/3nord.jpg",
  },
  {
    imgPath: "carousel/4cloth.jpg",
  },
  {
    imgPath: "carousel/5poster.jpeg",
  },
  {
    imgPath: "carousel/6play-and-win.jpg",
  },
  {
    imgPath: "carousel/7mobile.jpg",
  },
  {
    imgPath: "carousel/8reward.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  img: {
    height: "70vh",
    overflow: "hidden",
    width: "100%",
  },
  rightArrow: {
    position: "absolute",
    top: "40%",
    right: "2%",
    color: "white",
  },
  leftArrow: {
    position: "absolute",
    top: "40%",
    left: "2%",
    color: "white",
  },
}));

function Carousel() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = (activeStep) => {
    if (activeStep === maxSteps - 1) {
      activeStep = 0;
    } else {
      activeStep += 1;
    }
    setActiveStep(activeStep);
  };

  const handleBack = (activeStep) => {
    if (activeStep === 0) {
      activeStep = maxSteps - 1;
    } else {
      activeStep -= 1;
    }
    setActiveStep(activeStep);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div className="carousel" key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt="" />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            disableRipple={true}
            className={classes.rightArrow}
            onClick={() => handleNext(activeStep)}
          >
            <KeyboardArrowRight style={{ fontSize: 50 }} />
          </Button>
        }
        backButton={
          <Button
            disableRipple={true}
            className={classes.leftArrow}
            onClick={() => handleBack(activeStep)}
          >
            <KeyboardArrowLeft style={{ fontSize: 50 }} />
          </Button>
        }
      />
    </div>
  );
}

export default Carousel;
