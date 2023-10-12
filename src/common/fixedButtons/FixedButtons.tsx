import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonContainer } from "./FixedButtons.styled";
import { addQuestion } from "../../redux/reducer/Reducer";

export const FixedButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 질문 추가
  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  // 미리보기 페이지 이동
  const handlePreview = () => {
    navigate("/viewform");
  };

  return (
    <ButtonContainer>
      <ButtonGroup orientation="vertical">
        {/* 질문 추가 버튼 */}
        <Tooltip title="질문 추가">
          <Button onClick={handleAddQuestion}>
            <AddCircleOutlineRoundedIcon
              style={{ color: "black" }}
              fontSize="large"
            />
          </Button>
        </Tooltip>

        {/* 미리보기 버튼 */}
        <Tooltip title="미리보기">
          <Button onClick={handlePreview}>
            <VisibilityRoundedIcon
              style={{ color: "black" }}
              fontSize="large"
            />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </ButtonContainer>
  );
};
