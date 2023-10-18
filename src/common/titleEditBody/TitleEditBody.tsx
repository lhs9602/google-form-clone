import { useSelector, useDispatch } from "react-redux";
import { stateProps, surveyProps } from "../../data/Type";
import { setTitle, setTitleContent } from "../../redux/reducer/Reducer";
import { TitleContainer, TitleField } from "./TitleEditBody.styled";
export const TitleEditBody = ({ id }: { id: string }) => {
  const titleData = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id: id, text: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleContent({ id: id, text: e.target.value }));
  };

  return (
    <TitleContainer>
      <div>
        <TitleField
          value={titleData.title}
          onChange={handleTitleChange}
          inputProps={{
            style: { fontSize: 24 },
          }}
          placeholder="제목"
          color="secondary"
          variant="standard"
          fullWidth={true}
          $isFocused={titleData.isFocused}
        />
      </div>

      <div>
        <TitleField
          value={titleData.contents}
          onChange={handleContentChange}
          placeholder="설문지 설명"
          variant="standard"
          fullWidth={true}
          color="secondary"
          $isFocused={titleData.isFocused}
          multiline
        />
      </div>
    </TitleContainer>
  );
};
