import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuestionFlashCard from "../components/QuestionFlashCard";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/store";

const questions = [
  {
    _id: "65c7be9009a20abf42719ab2",
    statement:
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answers: [
      {
        option: "a",
        content: "Throws an error",
        _id: "65c7be9009a20abf42719ab3",
      },
      {
        option: "b",
        content: "Ignores the statements",
        _id: "65c7be9009a20abf42719ab4",
      },
      {
        option: "c",
        content: "Gives a warning",
        _id: "65c7be9009a20abf42719ab5",
      },
      {
        option: "d",
        content: "None of the above",
        _id: "65c7be9009a20abf42719ab6",
      },
    ],
    __v: 0,
  },
  {
    _id: "65c7bff109a20abf42719ad0",
    statement: "What is the use of the <noscript> tag in Javascript?",
    answers: [
      {
        option: "a",
        content: "The contents are displayed by non-JS-based browsers",
        _id: "65c7bff109a20abf42719ad1",
      },
      {
        option: "b",
        content: "Clears all the cookies and cache",
        _id: "65c7bff109a20abf42719ad2",
      },
      {
        option: "c",
        content: "Both a and b",
        _id: "65c7bff109a20abf42719ad3",
      },
      {
        option: "d",
        content: "None of the above",
        _id: "65c7bff109a20abf42719ad4",
      },
    ],
    __v: 0,
  },
  {
    _id: "65c7c04d09a20abf42719ad6",
    statement:
      "When an operator’s value is NULL, the typeof returned by the unary operator is:",
    answers: [
      {
        option: "a",
        content: "Boolean",
        _id: "65c7c04d09a20abf42719ad7",
      },
      {
        option: "b",
        content: "Undefined",
        _id: "65c7c04d09a20abf42719ad8",
      },
      {
        option: "c",
        content: "Object",
        _id: "65c7c04d09a20abf42719ad9",
      },
      {
        option: "d",
        content: "Integer",
        _id: "65c7c04d09a20abf42719ada",
      },
    ],
    __v: 0,
  },
  {
    _id: "65c7bf0609a20abf42719abe",
    statement: "How can a datatype be declared to be a constant type?",
    answers: [
      {
        option: "a",
        content: "const",
        _id: "65c7bf0609a20abf42719abf",
      },
      {
        option: "b",
        content: "var",
        _id: "65c7bf0609a20abf42719ac0",
      },
      {
        option: "c",
        content: "let",
        _id: "65c7bf0609a20abf42719ac1",
      },
      {
        option: "d",
        content: "constant",
        _id: "65c7bf0609a20abf42719ac2",
      },
    ],
    __v: 0,
  },
  {
    _id: "65c7bf7e09a20abf42719ac4",
    statement:
      "When the switch statement matches the expression with the given labels, how is the comparison done?",
    answers: [
      {
        option: "a",
        content:
          "Both the datatype and the result of the expression are compared",
        _id: "65c7bf7e09a20abf42719ac5",
      },
      {
        option: "b",
        content: "Only the datatype of the expression is compared",
        _id: "65c7bf7e09a20abf42719ac6",
      },
      {
        option: "c",
        content: "Only the value of the expression is compared",
        _id: "65c7bf7e09a20abf42719ac7",
      },
      {
        option: "d",
        content: "None of the above",
        _id: "65c7bf7e09a20abf42719ac8",
      },
    ],
    __v: 0,
  },
];

const questionMap = new Map();

// console.log(questions[0]._id);

export default function ExamPage() {
  const { seconds, setSeconds } = useQuizStore((state) => state);

  // questionMap.clear();

  const navigate = useNavigate();

  // const [seconds, setSeconds] = React.useState(5 * 60);

  const setSecondsRef = React.useRef();
  setSecondsRef.current = setSeconds;

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    navigate("/results");
  };

  if (activeStep === questions.length || seconds === 0) {
    setTimeout(() => {
      handleSubmit();
    }, 500);
  }

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const TimerComponent = React.useCallback(
  //   () => <Timer seconds={seconds} setSeconds={setSecondsRef} />,
  //   []
  // );

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {/* <TimerComponent /> */}
        <Timer seconds={seconds} setSeconds={setSeconds} />
      </Box>
      <Stepper activeStep={activeStep}>
        {questions.map((question, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{question?.statement}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === questions.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        // <React.Fragment>
        //   <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        //   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        //     <Button
        //       color="inherit"
        //       disabled={activeStep === 0}
        //       onClick={handleBack}
        //       sx={{ mr: 1 }}
        //     >
        //       Back
        //     </Button>
        //     <Box sx={{ flex: "1 1 auto" }} />
        //     {isStepOptional(activeStep) && (
        //       <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
        //         Skip
        //       </Button>
        //     )}

        //     <Button onClick={handleNext}>
        //       {activeStep === questions.length - 1 ? "Finish" : "Next"}
        //     </Button>
        //   </Box>
        // </React.Fragment>

        <QuestionFlashCard
          //   key={questions[activeStep]?._id}
          question={questions[activeStep]}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
          lastStep={questions.length - 1}
          isStepOptional={isStepOptional}
          questionMap={questionMap}
        />
      )}
    </Box>
  );
}
