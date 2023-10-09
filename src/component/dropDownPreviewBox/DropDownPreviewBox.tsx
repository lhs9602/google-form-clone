import {
  Typography,
  Divider,
  FormControl,
  SelectChangeEvent,
  Select,
  MenuItem,
} from "@mui/material";

import {
  contentProps,
  handleResponseProps,
  surveyProps,
} from "../../data/Type";
import {
  PreviewContainer,
  HeaderContainer,
} from "../checkBoxPreviewBox/CheckBoxPreviewBox.stlyed";

export const DropDownPreviewBox = ({
  question,
  handleResponse,
}: {
  question: surveyProps;
  handleResponse: handleResponseProps;
}) => {
  const questionTitle = question.title as string;
  const options = question.contents as contentProps[];

  const handleDropDownChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value as string;
    handleResponse(questionTitle, value);
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

      <FormControl fullWidth>
        <Select
          labelId="dropdown-label"
          defaultValue=""
          onChange={handleDropDownChange}
          fullWidth
          displayEmpty
        >
          <MenuItem value="">선택</MenuItem>
          <Divider />
          {options.map((option) => (
            <MenuItem key={option.contentId} value={option.text}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </PreviewContainer>
  );
};
