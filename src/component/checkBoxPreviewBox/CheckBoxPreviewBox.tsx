import { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Divider,
  Typography,
} from "@mui/material";

import {
  contentProps,
  handleResponseProps,
  surveyProps,
} from "../../data/Type";
import {
  CustomContainer,
  HeaderContainer,
  PreviewContainer,
} from "./CheckBoxPreviewBox.stlyed";

export const CheckBoxPreviewBox = ({
  question,
  checkValue,
  handleResponse,
}: {
  question: surveyProps;
  checkValue: string[];
  handleResponse: handleResponseProps;
}) => {
  const questionTitle = question.title as string;
  const options = question.contents as contentProps[];
  const [customOptions, setCustomOptions] = useState("");

  return (
    <PreviewContainer>
      <HeaderContainer>
        {question.isRequired && (
          <Typography variant="h5" color="primary">
            *
          </Typography>
        )}
        <Typography variant="h6">{questionTitle}</Typography>

        <Divider variant="fullWidth" />
      </HeaderContainer>
      {options.map((option) => (
        <FormControlLabel
          key={option.contentId}
          control={
            <Checkbox
              name="checkboxOptions"
              value={option.text}
              checked={checkValue.includes(option.text)}
              onChange={() => handleResponse(questionTitle, option.text)}
            />
          }
          label={option.text}
        />
      ))}
      <CustomContainer>
        <Checkbox
          name="checkboxOptions"
          value={customOptions}
          checked={checkValue.includes(customOptions)}
          onChange={() => handleResponse(questionTitle, customOptions)}
        />
        <TextField
          name="customCheckbox"
          variant="standard"
          fullWidth={true}
          placeholder="기타..."
          value={customOptions}
          onChange={(e) => {
            setCustomOptions(e.target.value);
          }}
        />
      </CustomContainer>
    </PreviewContainer>
  );
};
