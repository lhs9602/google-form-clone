import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { DragAndDropProps } from "../../data/Type";
import { OptionItem } from "../optionItem/OptionItem";

export const QuestionOption = ({
  questionData,
  isFocused,
  handleOnDragEnd,
}: DragAndDropProps) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="option" direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {Array.isArray(questionData.contents) &&
              questionData.contents.map((option, index) => (
                <div key={option.contentId}>
                  <OptionItem
                    questionId={questionData.id}
                    option={option}
                    index={index}
                    questionType={questionData.type}
                    isFocused={isFocused}
                  />
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
