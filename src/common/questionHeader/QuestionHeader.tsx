import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/reducer/Reducer";
import { QuestionField } from "../questionEditBody/QuestionEditBody.styled";
import { TypeSelector } from "../typeSelector/TypeSelector";
import { QuestionHeaderProps } from "../../data/Type";
import { QuestionHeaderContainer } from "./QuestionHeader.styled";

export const QuestionHeader = ({
  id,
  title,
  type,
  isFocused,
}: QuestionHeaderProps) => {
  const dispatch = useDispatch();

  const handleTitleChange = (id: string, value: string) => {
    dispatch(setTitle({ id: id, text: value }));
  };
  return (
    <QuestionHeaderContainer>
      <QuestionField
        value={title}
        onChange={(e) => handleTitleChange(id, e.target.value)}
        placeholder="제목"
        color="secondary"
        variant="filled"
        fullWidth={true}
        $isFocused={isFocused}
      />

      {isFocused ? <TypeSelector value={type} id={id} /> : null}
    </QuestionHeaderContainer>
  );
};
