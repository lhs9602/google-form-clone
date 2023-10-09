import { useDispatch } from "react-redux";
import { TitleEditBody } from "../../common/titleEditBody/TitleEditBody";
import { focusState } from "../../redux/reducer/Reducer";
import { BoxContainer, FocusLine, TitleHeader } from "./EditBox.styled";
import { QuestionEditBody } from "../../common/questionEditBody/QuestionEditBody";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

export const EditBox = ({
  id,
  type,
  isFocused,
  handle,
}: {
  id: string;
  type: string;
  isFocused: boolean;
  handle?: DraggableProvidedDragHandleProps;
}) => {
  const dispatch = useDispatch();

  return (
    <BoxContainer
      onClick={() => {
        if (!isFocused) {
          dispatch(focusState(id));
        }
      }}
    >
      {type === "title" ? <TitleHeader /> : null}
      {isFocused && <FocusLine />}
      {type === "title" ? (
        <TitleEditBody id={id} />
      ) : (
        <QuestionEditBody id={id} isFocused={isFocused} handle={handle} />
      )}
    </BoxContainer>
  );
};
