import {
  Typography,
  Divider,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  contentProps,
  handleResponseProps,
  surveyProps,
} from "../../data/Type";
import {
  PreviewContainer,
  HeaderContainer,
  CustomContainer,
} from "../checkBoxPreviewBox/CheckBoxPreviewBox.stlyed";
export const RadioPreviewBox = ({
  question,
  handleResponse,
}: {
  question: surveyProps;
  handleResponse: handleResponseProps;
}) => {
  const questionTitle = question.title as string;
  const options = question.contents as contentProps[];

  // 문자열 상태로 변경
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customOptions, setCustomOptions] = useState("");

  const radioHandler = (text: string) => {
    setSelectedOption(text);
    handleResponse(questionTitle, text); // 단일 문자열로 업데이트
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
            <Radio // Radio 컴포넌트 사용
              name="radioOptions"
              value={option.text}
              checked={selectedOption === option.text}
              onChange={() => radioHandler(option.text)}
            />
          }
          label={option.text}
        />
      ))}
      <CustomContainer>
        <Radio
          name="radioOptions"
          value={customOptions}
          checked={selectedOption === customOptions}
          onChange={() => radioHandler(customOptions)}
        />
        <TextField
          name="customRadio"
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
