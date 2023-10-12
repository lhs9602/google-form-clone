import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { OptionMark } from "../optionMark/OptionMark";
import { Draggable } from "react-beautiful-dnd";
import {
  OptionContainer,
  DragHand,
  QuestionField,
} from "../questionEditBody/QuestionEditBody.styled";
import { OptionItemProps } from "../../data/Type";
import { useDispatch } from "react-redux";
import { changeOption, deleteOption } from "../../redux/reducer/Reducer";

export const OptionItem = ({
  questionId,
  option,
  index,
  questionType,
  isFocused,
}: OptionItemProps) => {
  const dispatch = useDispatch();
  //옵션 제거
  const handleDeleteOption = () => {
    dispatch(deleteOption({ id: questionId, contentId: option.contentId }));
  };
  //옵션 변경
  const handleChangeOption = (text: string) => {
    dispatch(
      changeOption({
        id: questionId,
        contentId: option.contentId,
        text: text,
      })
    );
  };
  return (
    <Draggable
      key={option.contentId}
      draggableId={String(option.contentId)}
      index={index}
    >
      {(provided) => (
        <OptionContainer ref={provided.innerRef} {...provided.draggableProps}>
          {/* 드래그를 가능하게 해주는 핸들 */}
          <DragHand {...provided.dragHandleProps}>
            <DragIndicatorIcon fontSize="small" />
          </DragHand>
          {/*객관식,체크박스등을 구별하는 아이콘*/}
          <OptionMark type={questionType} num={index} />
          {/*옵션을 입력*/}
          <QuestionField
            value={option.text}
            variant="standard"
            fullWidth={true}
            color="secondary"
            onChange={(e) => handleChangeOption(e.target.value)}
            multiline
          />
          {/*포커스에만 보이는 제거 버튼*/}
          {isFocused && <IconButton onClick={handleDeleteOption}>x</IconButton>}
        </OptionContainer>
      )}
    </Draggable>
  );
};
