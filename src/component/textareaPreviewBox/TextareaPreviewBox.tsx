import { Typography, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { handleResponseProps, surveyProps } from "../../data/Type";
import {
  PreviewContainer,
  HeaderContainer,
} from "../checkBoxPreviewBox/CheckBoxPreviewBox.stlyed";

export const TextareaPreviewBox = ({
  question,
  handleResponse,
}: {
  question: surveyProps;
  handleResponse: handleResponseProps;
}) => {
  const questionTitle = question.title as string;
  const [textResponse, setTextResponse] = useState<string>("");

  const textHandler = (text: string) => {
    setTextResponse(text);
    handleResponse(questionTitle, text);
  };

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

      <TextField
        variant="standard"
        fullWidth={true}
        placeholder="답변을 입력하세요..."
        value={textResponse}
        onChange={(e) => textHandler(e.target.value)}
        multiline
      />
    </PreviewContainer>
  );
};
