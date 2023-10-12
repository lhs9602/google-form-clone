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
    // 초기 렌더링 시, survey에 질문이 없다면, 초기값으로 질문을 추가
    if (survey.length < 2) {
      dispatch(addQuestion());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    //제목 혹은 잘못된 지점에 드래그를 해제할 경우, 이벤트 중지
    if (!destination || destination.index === 0) {
      return;
    }

    // source.droppableId가 "editBox"이면 위치를 변경
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
            {/* survey에 저장된 질문들을 렌더링 */}
            {survey.map((data, index) =>
              data.type === "title" ? (
                // 타이틀의 경우 드래그 불가
                <EditBox
                  key={data.id}
                  id={data.id}
                  type={data.type}
                  isFocused={data.isFocused}
                />
              ) : (
                //문제 경우 드래그 가능
                //Draggable로 드래그 이벤트를 제어합니다.
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
