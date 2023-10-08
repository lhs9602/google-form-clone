import { useDispatch } from "react-redux";
import { TitleEditBody } from "../../common/titleEditBody/TitleEditBody";
import { focusState } from "../../redux/reducer/Reducer";
import { EditBoxContainer, FocusLine, TitleHeader } from "./EditBox.styled";
import { QuestionEditBody } from "../../common/questionEditBody/QuestionEditBody";

export const EditBox = ({
  id,
  type,
  isFocused,
}: {
  id: string;
  type: string;
  isFocused: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <EditBoxContainer
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
        <QuestionEditBody id={id} isFocused={isFocused} />
      )}
    </EditBoxContainer>
  );
};
