import { useDispatch } from "react-redux";
import { TitleEditBody } from "../../common/titleEditBody/TitleEditBody";
import { focusState } from "../../redux/reducer/Reducer";
import { BoxContainer, FocusLine, TitleHeader } from "./EditBox.styled";
import { QuestionEditBody } from "../../common/questionEditBody/QuestionEditBody";
import { EditBoxProps } from "../../data/Type";

export const EditBox = ({ id, type, isFocused, handle }: EditBoxProps) => {
  const dispatch = useDispatch();

  const handleFocuse = () => {
    if (!isFocused) {
      dispatch(focusState(id));
    }
  };

  return (
    <BoxContainer onClick={handleFocuse}>
      {type === "title" && <TitleHeader />}
      {isFocused && <FocusLine />}
      {type === "title" ? (
        <TitleEditBody id={id} />
      ) : (
        <QuestionEditBody id={id} isFocused={isFocused} handle={handle} />
      )}
    </BoxContainer>
  );
};

export default EditBox;
