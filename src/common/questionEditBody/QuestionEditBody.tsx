import { useSelector, useDispatch } from "react-redux";

import { stateProps, surveyProps } from "../../data/Type";
import { deleteEtc, deleteOption, setTitle } from "../../redux/reducer/Reducer";
import {
  QuestionContainer,
  HeaderContainer,
  QuestionField,
  OptionContainer,
} from "./QuestionEditBody.styled";
import { OptionMark } from "../optionMark/OptionMark";
import TypeSelector from "../typeSelector/TypeSelector";
import { AddOption } from "../addOption/AddOption";
import IconButton from "@mui/material/IconButton/IconButton";
import { QuestionFooter } from "../questionFooter/QuestionFooter";

export const QuestionEditBody = ({
  id,
  isFocused,
}: {
  id: string;
  isFocused: boolean;
}) => {
  const item = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();
  return (
    <QuestionContainer>
      <HeaderContainer>
        <QuestionField
          value={item.title}
          onChange={(e) => dispatch(setTitle({ id: id, text: e.target.value }))}
          placeholder="제목"
          color="secondary"
          variant="filled"
          fullWidth={true}
          $isFocused={isFocused}
        />

        {isFocused ? <TypeSelector value={item.type} id={id} /> : null}
      </HeaderContainer>
      {["radio", "checkBox", "dropDown"].includes(item.type) ? (
        Array.isArray(item.contents) &&
        item.contents.map((option, index) => {
          return (
            <OptionContainer key={option.contentId}>
              <OptionMark type={item.type} num={index} />
              <QuestionField
                value={option.text}
                variant="standard"
                fullWidth={true}
                color="secondary"
                multiline
              />
              <IconButton
                onClick={() => {
                  dispatch(
                    deleteOption({ id: id, contentId: option.contentId })
                  );
                }}
              >
                x
              </IconButton>
            </OptionContainer>
          );
        })
      ) : (
        <QuestionField
          value={item.type === "text" ? "단답형 텍스트" : "장문형 텍스트"}
          variant="standard"
          fullWidth={true}
          color="secondary"
          disabled={true}
        />
      )}

      {item.isEtc && (
        <OptionContainer>
          <OptionMark type={item.type} num={item.contents.length} />
          <QuestionField
            value={"기타..."}
            variant="standard"
            fullWidth={true}
            color="secondary"
            disabled={true}
          />
          <IconButton
            onClick={() => {
              dispatch(deleteEtc({ id: id }));
            }}
          >
            x
          </IconButton>
        </OptionContainer>
      )}

      {["radio", "checkBox", "dropDown"].includes(item.type) && isFocused && (
        <AddOption
          id={id}
          type={item.type}
          num={item.contents.length}
          isEtc={item.isEtc}
        />
      )}
      {isFocused && <QuestionFooter id={item.id} />}
    </QuestionContainer>
  );
};
