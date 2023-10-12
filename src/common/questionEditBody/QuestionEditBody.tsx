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

  //드래그로 옵션 위치 변경
  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    //잘못된 위치에 드래그를 놓을 경우 중지
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

  //기타 옵션 제거
  const handleDeleteEtc = (id: string) => {
    dispatch(deleteEtc({ id: id }));
  };

  return (
    <QuestionContainer $isFocused={isFocused}>
      {/* 드래그 핸들 */}
      <DragHand {...handle}>
        <DragHandleIcon fontSize="small" />
      </DragHand>
      {/* 제목이나 타입지정하는 질문헤더 */}
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
      {/* 기타 항목은 가장 아래에 위치하고 드래그 불가능 하게 따로 선언 */}
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

      {/* 옵션을 추가하는 버튼  */}
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
