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
import { showErrorToast } from "../toast/toastMessage";
import { getQuestionsAPI } from "../api/question";
import { createResultAPI } from "../api/result";

// const questionMap = new Map();

export default function ExamPage() {
  const {
    seconds,
    setSeconds,
    questions,
    setQuestions,
    questionMap,
    user,
    setCurrResult,
    setQuestionMap,
    setUser,
  } = useQuizStore((state) => state);

  React.useEffect(() => {
    // check questions exist in global state, if exist render them only
    // console.log(questions);
    if (questions) {
      console.log("here inside null check");
      return;
    }
    // if not exists, call api to get the questions
    async function getQuestions() {
      try {
        const response = await getQuestionsAPI();
        setQuestions(response);
      } catch (error) {
        showErrorToast(error?.response?.data?.message);
      }
    }
    // set questions in global state
    getQuestions();
  }, []);

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

  const handleSubmit = async () => {
    // call results api to post a new result
    const answers = [];
    // console.log(questionMap);
    for (let property in questionMap) {
      answers.push({
        id: property,
        answer: questionMap[property],
      });
    }
    const payload = {
      userId: user?.userId,
      answers: answers,
    };
    // console.log(payload);
    try {
      const response = await createResultAPI(payload);
      setCurrResult(response);
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    }
    setQuestionMap({});
    setUser({});
    setSeconds(5 * 60);
    setQuestions(null);
    navigate("/results");
  };

  React.useEffect(() => {
    if (questions && (activeStep === questions.length || seconds === 0)) {
      setTimeout(async () => {
        await handleSubmit();
      }, 500);
    }
  }, [activeStep, seconds]);

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
      {questions && (
        <>
          <Box>
            {/* <TimerComponent /> */}
            <Timer seconds={seconds} setSeconds={setSeconds} />
          </Box>
          <Stepper activeStep={activeStep}>
            {questions.map((question, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //     <Typography variant="caption">Optional</Typography>
              //   );
              // }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step
                  key={index}
                  {...stepProps}
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  <StepLabel {...labelProps}>{`Question - ${
                    index + 1
                  }`}</StepLabel>
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
        </>
      )}
    </Box>
  );
}
