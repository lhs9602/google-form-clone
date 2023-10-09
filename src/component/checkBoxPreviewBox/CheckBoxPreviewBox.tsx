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
  handleResponse,
}: {
  question: surveyProps;
  handleResponse: handleResponseProps;
}) => {
  const questionTitle = question.title as string;
  const options = question.contents as contentProps[];
  const [checkboxOptions, setCheckboxOptions] = useState<string[]>([]);
  const [customOptions, setCustomOptions] = useState("");

  const checkboxHandler = (text: string) => {
    if (checkboxOptions.includes(text)) {
      setCheckboxOptions((prev) => prev.filter((item) => item !== text));
    } else {
      setCheckboxOptions((prev) => [...prev, text]);
    }
    handleResponse(questionTitle, checkboxOptions);
  };
  return (
    <PreviewContainer>
      <HeaderContainer>
        {!question.isRequired && (
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
              checked={checkboxOptions.includes(option.text)}
              onChange={() => checkboxHandler(option.text)}
            />
          }
          label={option.text}
        />
      ))}
      <CustomContainer>
        <Checkbox
          name="checkboxOptions"
          value={customOptions}
          checked={checkboxOptions.includes(customOptions)}
          onChange={() => checkboxHandler(customOptions)}
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
