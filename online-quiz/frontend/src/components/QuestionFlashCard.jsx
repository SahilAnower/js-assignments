import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { useQuizStore } from "../store/store";

const QuestionFlashCard = ({
  question,
  activeStep,
  lastStep,
  handleBack,
  handleNext,
  handleSkip,
  isStepOptional,
  questionMap,
}) => {
  // const questionMap = useQuizStore((state) => state.questionMap);

  const getQuestionOptionInitialState = () => {
    if (questionMap.hasOwnProperty(question?._id)) {
      return questionMap[question?._id];
    } else {
      return "";
    }
  };

  const [optionSelected, setOptionSelected] = useState(
    getQuestionOptionInitialState()
  );

  useEffect(() => {
    setOptionSelected(getQuestionOptionInitialState());
  }, [question?._id]);

  const handleOptionChange = (e) => {
    setOptionSelected(e.target.value);
  };

  const handleQuestionOptionSave = () => {
    questionMap[question?._id] = optionSelected;
  };

  return (
    <Card>
      <CardContent>
        <FormControl>
          <FormLabel id="question-label">{question?.statement}</FormLabel>
          <RadioGroup
            aria-labelledby="question-label"
            defaultValue={""}
            name="question-radio-buttons-group"
            onChange={handleOptionChange}
            value={optionSelected}
          >
            <FormControlLabel
              value=""
              control={<Radio />}
              sx={{
                display: "none",
              }}
            />
            <FormControlLabel
              value={question?.answers[0]?.option}
              control={<Radio />}
              label={question?.answers[0]?.content}
            />
            <FormControlLabel
              value={question?.answers[1]?.option}
              control={<Radio />}
              label={question?.answers[1]?.content}
            />
            <FormControlLabel
              value={question?.answers[2]?.option}
              control={<Radio />}
              label={question?.answers[2]?.content}
            />
            <FormControlLabel
              value={question?.answers[3]?.option}
              control={<Radio />}
              label={question?.answers[3]?.content}
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => {
              handleBack();
              handleQuestionOptionSave();
            }}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            color="inherit"
            onClick={() => {
              handleSkip();
              handleQuestionOptionSave();
            }}
            sx={{ mr: 1 }}
          >
            Skip
          </Button>

          <Button
            onClick={() => {
              handleNext();
              handleQuestionOptionSave();
            }}
          >
            {activeStep === lastStep ? "Finish" : "Next"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionFlashCard;
