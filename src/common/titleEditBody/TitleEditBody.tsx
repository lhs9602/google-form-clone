import TextField from "@mui/material/TextField";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { stateProps, surveyProps } from "../../data/Type";
import { setTitle, setTitleContent } from "../../redux/reducer/Reducer";

export const TitleContainer = styled.div`
  padding: 24px;
  outline: none;
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 12px;
  font-size: 24pt;
`;
export const TitleEditBody = ({ id }: { id: string }) => {
  const item = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();
  return (
    <TitleContainer>
      <div>
        <TextField
          value={item.title}
          onChange={(e) => dispatch(setTitle({ id: id, text: e.target.value }))}
          placeholder="제목"
          color="secondary"
          variant="standard"
          fullWidth={true}
          multiline
        />
      </div>
      <div>
        <TextField
          value={item.contents}
          onChange={(e) =>
            dispatch(setTitleContent({ id: id, text: e.target.value }))
          }
          placeholder="설문지 설명"
          variant="standard"
          fullWidth={true}
          color="secondary"
          multiline
        />
      </div>
    </TitleContainer>
  );
};
