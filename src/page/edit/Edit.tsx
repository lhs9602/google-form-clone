import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { EditBox } from "../../component/editBox/EditBox";
import { stateProps } from "../../data/Type";
import { EditContainer } from "./Edit.styled";
import { addQuestion } from "../../redux/reducer/Reducer";

function Edit() {
  const survey = useSelector((state: stateProps) => state.survey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (survey.length < 2) {
      dispatch(addQuestion());
    }
  });

  return (
    <EditContainer>
      {survey.map((data) => (
        <EditBox
          key={data.id}
          id={data.id}
          type={data.type}
          isFocused={data.isFocused}
        />
      ))}
    </EditContainer>
  );
}

export default Edit;
