import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton/IconButton";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import Divider from "@mui/joy/Divider";

import {
  changeRequired,
  copyQuestion,
  deleteQuestion,
} from "../../redux/reducer/Reducer";
import { stateProps, surveyProps } from "../../data/Type";
import { FooterContainer } from "./QuestionFooter.styled";
import { FormControlLabel } from "@mui/material";

export const QuestionFooter = ({ id }: { id: string }) => {
  const item = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();

  return (
    <FooterContainer>
      <IconButton
        onClick={() => {
          dispatch(copyQuestion({ id }));
        }}
      >
        <ContentCopyRoundedIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          dispatch(deleteQuestion({ id }));
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Divider orientation="vertical" />
      <FormControlLabel
        value={item.isRequired}
        control={
          <Switch
            color="primary"
            onChange={() => {
              dispatch(changeRequired({ id }));
            }}
          />
        }
        label="필수"
        labelPlacement="start"
      />
    </FooterContainer>
  );
};
