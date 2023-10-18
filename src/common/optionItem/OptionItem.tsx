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

  const handleDeleteOption = () => {
    dispatch(deleteOption({ id: questionId, contentId: option.contentId }));
  };

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
          <DragHand {...provided.dragHandleProps}>
            <DragIndicatorIcon fontSize="small" />
          </DragHand>

          <OptionMark type={questionType} num={index} />

          <QuestionField
            value={option.text}
            variant="standard"
            fullWidth={true}
            color="secondary"
            onChange={(e) => handleChangeOption(e.target.value)}
            multiline
          />

          {isFocused && <IconButton onClick={handleDeleteOption}>x</IconButton>}
        </OptionContainer>
      )}
    </Draggable>
  );
};
