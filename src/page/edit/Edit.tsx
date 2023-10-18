import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { EditBox } from "../../component/editBox/EditBox";
import { stateProps } from "../../data/Type";
import { EditContainer } from "./Edit.styled";
import { addQuestion, moveQuestion } from "../../redux/reducer/Reducer";
import { FixedButtons } from "../../common/fixedButtons/FixedButtons";

function Edit() {
  const survey = useSelector((state: stateProps) => state.survey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (survey.length < 2) {
      dispatch(addQuestion());
    }
  }, []);

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || destination.index === 0) {
      return;
    }

    if (source.droppableId === "editBox") {
      dispatch(
        moveQuestion({
          start: String(source.index),
          end: String(destination.index),
        })
      );
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="editBox" direction="vertical">
        {(provided) => (
          <EditContainer {...provided.droppableProps} ref={provided.innerRef}>
            {survey.map((data, index) =>
              data.type === "title" ? (
                <EditBox
                  key={data.id}
                  id={data.id}
                  type={data.type}
                  isFocused={data.isFocused}
                />
              ) : (
                <Draggable
                  key={data.id}
                  draggableId={String(data.id)}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <EditBox
                        id={data.id}
                        type={data.type}
                        isFocused={data.isFocused}
                        handle={
                          provided.dragHandleProps as DraggableProvidedDragHandleProps
                        }
                      />
                    </div>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}

            <FixedButtons />
          </EditContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default Edit;
