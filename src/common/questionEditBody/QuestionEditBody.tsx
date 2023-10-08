import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton/IconButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { stateProps, surveyProps } from "../../data/Type";
import {
  deleteEtc,
  deleteOption,
  moveOption,
  setTitle,
} from "../../redux/reducer/Reducer";
import {
  QuestionContainer,
  HeaderContainer,
  QuestionField,
  OptionContainer,
  DragHand,
} from "./QuestionEditBody.styled";
import { OptionMark } from "../optionMark/OptionMark";
import TypeSelector from "../typeSelector/TypeSelector";
import { AddOption } from "../addOption/AddOption";
import { QuestionFooter } from "../questionFooter/QuestionFooter";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

export const QuestionEditBody = ({
  id,
  isFocused,
  handle,
}: {
  id: string;
  isFocused: boolean;
  handle?: DraggableProvidedDragHandleProps;
}) => {
  const item = useSelector((state: stateProps) =>
    state.survey.find((item) => item.id === id)
  ) as surveyProps;
  const dispatch = useDispatch();

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

  return (
    <QuestionContainer $isFocused={isFocused}>
      {isFocused && (
        <DragHand {...handle}>
          <DragHandleIcon fontSize="small" />
        </DragHand>
      )}
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="option" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {Array.isArray(item.contents) &&
                  item.contents.map((option, index) => (
                    <Draggable
                      key={option.contentId}
                      draggableId={String(option.contentId)}
                      index={index}
                    >
                      {(provided) => (
                        <OptionContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <DragHand {...provided.dragHandleProps}>
                            <DragIndicatorIcon fontSize="small" />
                          </DragHand>
                          <OptionMark type={item.type} num={index} />
                          <QuestionField
                            value={option.text}
                            variant="standard"
                            fullWidth={true}
                            color="secondary"
                            multiline
                          />
                          {isFocused && (
                            <IconButton
                              onClick={() => {
                                dispatch(
                                  deleteOption({
                                    id: id,
                                    contentId: option.contentId,
                                  })
                                );
                              }}
                            >
                              x
                            </IconButton>
                          )}
                        </OptionContainer>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
        <OptionContainer style={{ paddingLeft: "20px" }}>
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
