import { useSelector, useDispatch } from "react-redux";
import { stateProps, surveyProps } from "../../data/Type";
import { setTitle, setTitleContent } from "../../redux/reducer/Reducer";
import { TitleContainer, TitleField } from "./TitleEditBody.styled";

export const TitleEditBody = ({ id }: { id: string }) => {
  const item = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();
  return (
    <TitleContainer>
      <div>
        <TitleField
          value={item.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setTitle({ id: id, text: e.target.value }))
          }
          inputProps={{
            style: { fontSize: 24 },
          }}
          placeholder="제목"
          color="secondary"
          variant="standard"
          fullWidth={true}
          $isFocused={item.isFocused}
        />
      </div>
      <div>
        <TitleField
          value={item.contents}
          onChange={(e) =>
            dispatch(setTitleContent({ id: id, text: e.target.value }))
          }
          placeholder="설문지 설명"
          variant="standard"
          fullWidth={true}
          color="secondary"
          $isFocused={item.isFocused}
          multiline
        />
      </div>
    </TitleContainer>
  );
};
