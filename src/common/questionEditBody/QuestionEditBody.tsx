import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton/IconButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { stateProps, surveyProps } from "../../data/Type";
import { deleteEtc, moveOption } from "../../redux/reducer/Reducer";
import {
  QuestionContainer,
  QuestionField,
  OptionContainer,
  DragHand,
} from "./QuestionEditBody.styled";
import { OptionMark } from "../optionMark/OptionMark";
import { AddOption } from "../addOption/AddOption";
import { QuestionFooter } from "../questionFooter/QuestionFooter";
import {
  DropResult,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { QuestionHeader } from "../questionHeader/QuestionHeader";
import { QuestionOption } from "../questionOption/QuestionOption";

export const QuestionEditBody = ({
  id,
  isFocused,
  handle,
}: {
  id: string;
  isFocused: boolean;
  handle?: DraggableProvidedDragHandleProps;
}) => {
  const questionData = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();
  const choiceTypes = ["radio", "checkBox", "dropDown"];

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === "option") {
      dispatch(
        moveOption({
          id: id,
          start: String(source.index),
          end: String(destination.index),
        })
      );
    }
  };

  const handleDeleteEtc = (id: string) => {
    dispatch(deleteEtc({ id: id }));
  };

  return (
    <QuestionContainer $isFocused={isFocused}>
      <DragHand {...handle}>
        <DragHandleIcon fontSize="small" />
      </DragHand>

      <QuestionHeader
        id={id}
        title={questionData.title}
        type={questionData.type}
        isFocused={isFocused}
      />
      {choiceTypes.includes(questionData.type) ? (
        <QuestionOption
          questionData={questionData}
          isFocused={isFocused}
          handleOnDragEnd={handleOnDragEnd}
        />
      ) : (
        <QuestionField
          value={
            questionData.type === "text" ? "단답형 텍스트" : "장문형 텍스트"
          }
          variant="standard"
          fullWidth={true}
          color="secondary"
          disabled={true}
        />
      )}

      {questionData.isEtc && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <OptionMark
            type={questionData.type}
            num={questionData.contents.length}
          />
          <QuestionField
            value={"기타..."}
            variant="standard"
            fullWidth={true}
            color="secondary"
            disabled={true}
          />
          <IconButton
            onClick={() => {
              handleDeleteEtc(id);
            }}
          >
            x
          </IconButton>
        </OptionContainer>
      )}

      {choiceTypes.includes(questionData.type) && isFocused && (
        <AddOption
          id={id}
          type={questionData.type}
          num={questionData.contents.length}
          isEtc={questionData.isEtc}
        />
      )}
      {isFocused && <QuestionFooter id={questionData.id} />}
    </QuestionContainer>
  );
};
