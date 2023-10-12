import { useDispatch } from "react-redux";
import { TitleEditBody } from "../../common/titleEditBody/TitleEditBody";
import { focusState } from "../../redux/reducer/Reducer";
import { BoxContainer, FocusLine, TitleHeader } from "./EditBox.styled";
import { QuestionEditBody } from "../../common/questionEditBody/QuestionEditBody";
import { EditBoxProps } from "../../data/Type";

export const EditBox = ({ id, type, isFocused, handle }: EditBoxProps) => {
  const dispatch = useDispatch();

  //포커스 상태 변경
  const handleFocuse = () => {
    if (!isFocused) {
      dispatch(focusState(id));
    }
  };

  return (
    <BoxContainer onClick={handleFocuse}>
      {/* type이 "title"인 경우에만 TitleHeader 컴포넌트를 렌더링 */}
      {type === "title" && <TitleHeader />}

      {/* 포커스 상태 시 표시 */}
      {isFocused && <FocusLine />}

      {/*"title"인 경우 TitleEditBody, 그렇지 않은 경우 QuestionEditBody를 렌더링 */}
      {type === "title" ? (
        <TitleEditBody id={id} />
      ) : (
        <QuestionEditBody id={id} isFocused={isFocused} handle={handle} />
      )}
    </BoxContainer>
  );
};

export default EditBox;
