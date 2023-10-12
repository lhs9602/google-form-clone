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

  // 질문을 복사
  const handleCopyClick = () => {
    dispatch(copyQuestion({ id }));
  };

  // 질문을 삭제
  const handleDeleteClick = () => {
    dispatch(deleteQuestion({ id }));
  };

  // 질문을 필수 여부를 변경
  const handleSwitchChange = () => {
    dispatch(changeRequired({ id }));
  };

  return (
    <FooterContainer>
      {/* 복사 버튼*/}
      <IconButton onClick={handleCopyClick}>
        <ContentCopyRoundedIcon />
      </IconButton>
      {/* 삭제 버튼 */}
      <IconButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
      <Divider orientation="vertical" />
      {/* 필수 여부를 변경하는 토글*/}
      <FormControlLabel
        control={
          <Switch
            checked={item.isRequired}
            color="primary"
            onChange={handleSwitchChange}
          />
        }
        label="필수"
        labelPlacement="start"
      />
    </FooterContainer>
  );
};
