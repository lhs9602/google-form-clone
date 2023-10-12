import { createSlice, nanoid } from "@reduxjs/toolkit";
import { contentProps } from "../../data/Type";
import { initialdata, questionForm, contentsForm } from "../../data/SurveyData";
import {
  clearFocus,
  findQuestion,
  findQuestionIndex,
} from "../../utill/reducerFunc";

export const surveySlice = createSlice({
  name: "survey",
  initialState: initialdata,
  reducers: {
    //질문 추가
    addQuestion: (state) => {
      //focus 초기화
      const newState = clearFocus(state);

      // 새로운 질문 추가
      newState.push(questionForm(nanoid(), newState.length));
      return newState;
    },
    //질문 삭제
    deleteQuestion: (state, action) => {
      //focus 초기화
      const newState = clearFocus(state);
      // 질문의 인덱스 찾기
      const targetIndex = findQuestionIndex(newState, action.payload.id);

      if (targetIndex !== -1) {
        // 질문 제거
        newState.splice(targetIndex, 1);

        // focus 설정 로직
        // 삭제한 요소의 바로 앞 요소가 있고, 그 요소의 타입이 'title'이 아니라면,
        // 바로 앞 요소에 focus를 설정합니다.
        if (
          newState[targetIndex - 1] &&
          newState[targetIndex - 1].type !== "title"
        ) {
          newState[targetIndex - 1].isFocused = true;
        } else if (newState.length === 1 || targetIndex < state.length) {
          // 삭제한 요소가 마지막 요소거나,
          // 삭제한 요소의 인덱스가 남아있는 요소의 총 갯수보다 작다면
          // 다음 요소에 focus를 설정
          // 만약 삭제한 요소가 마지막 요소였다면, 첫 번째 요소인 제목에 focus를 설정
          newState[targetIndex]
            ? (newState[targetIndex].isFocused = true)
            : (newState[0].isFocused = true);
        }
        return newState;
      }
    },
    //포커스 변경
    focusState: (state, action) => {
      // focus 상태 초기화
      const newState = clearFocus(state);

      // 특정 질문 찾기
      const targetState = findQuestion(newState, action.payload);
      // 해당 질문에 focus 상태 설정
      targetState.isFocused = true;
      return newState;
    },
    //제목 변경
    setTitle: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);
      // 제목 설정
      targetState.title = action.payload.text;
    },
    //제목 상세 설명 변경
    setTitleContent: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);
      // 내용 설정
      targetState.contents = action.payload.text;
    },
    //질문 타입 변경
    changeType: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);

      // 사용될 질문 유형 정의
      const textTypes = ["text", "textarea"];
      const choiceTypes = ["radio", "checkBox", "dropDown"];

      //변경될 타입이 textTypes일 경우
      if (textTypes.includes(action.payload.type)) {
        // contents에서 옵션을 제거하고 ""으로 변경
        targetState.contents = " ";
        //textTypes은 기타항목이 없으니 isEtc를 false로 설정
        targetState.isEtc = false;
      }
      // 기존 질문 유형이 textTypes이고, 변경될 유형이 choiceTypesn 중 하나일 경우
      else if (
        textTypes.includes(targetState.type) &&
        choiceTypes.includes(action.payload.type)
      ) {
        // contents를 새로운 형태로 초기화
        targetState.contents = [contentsForm(nanoid(), 1)];

        // 변경될 유형이 dropDown일 경우,기타가 없기에 isEtc를 false로 설정
        if (action.payload.type === "dropDown") {
          targetState.isEtc = false;
        }
      }

      // 질문 type 변경
      targetState.type = action.payload.type;
    },
    //질문의 옵션 추가
    addOption: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);

      //질문의 옵션을 할당
      const targetContents = targetState.contents as contentProps[];

      // 새로운 옵션을 추가
      targetContents.push(contentsForm(nanoid(), action.payload.num + 1));
    },
    //질문의 옵션 삭제
    deleteOption: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);

      //질문의 옵션들을 할당
      const targetContents = targetState.contents as contentProps[];

      //특정 옵션 탐샏
      const targetOptionIndex = targetContents.findIndex(
        (option: contentProps) => option.contentId === action.payload.contentId
      );

      //질문 옵션 제거
      targetContents.splice(targetOptionIndex, 1);
    },
    //질문의 옵션 변경
    changeOption: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);

      //질문의 옵션들을 할당
      const targetContents = targetState.contents as contentProps[];

      //특정 옵션 탐색
      const targetOption = targetContents.find(
        (option: contentProps) => option.contentId === action.payload.contentId
      ) as contentProps;

      targetOption.text = action.payload.text;
    },
    //기타 항목 추가
    addEtc: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);
      //기타 항목 활성화
      targetState.isEtc = true;
    },
    //기타 항목 삭제
    deleteEtc: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);
      //기타 항목 비활성화
      targetState.isEtc = false;
    },
    //질문 복사
    copyQuestion: (state, action) => {
      // focus 상태 초기화
      const newState = clearFocus(state);

      // 질문의 인덱스 찾기
      const targetIndex = findQuestionIndex(newState, action.payload.id);

      //질문을 복사. 단 제목은 겹치지 않게 기본 제목에 번호 추가
      newState.push({
        ...newState[targetIndex],
        id: nanoid(),
        title: `질문 ${newState.length}`,
        isFocused: true,
      });

      return newState;
    },
    //필수 여부 변경
    changeRequired: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);

      // isRequired 값이: true면 false로, false면 true로 변경
      targetState.isRequired = !targetState.isRequired;
    },
    //질문 드래그 이동
    moveQuestion: (state, action) => {
      const newState = [...state];

      //출발지점과 도착지점
      const { start, end } = action.payload;

      // newState에서 start 인덱스에 위치한 질문을 제거하고 targetState에 할당
      const targetState = newState.splice(Number(start), 1);

      // newState의 end 인덱스 위치에 targetState의 질문을 삽입
      newState.splice(Number(end), 0, ...targetState);

      return newState;
    },
    //질문 옵션 드래그 이동
    moveOption: (state, action) => {
      // 특정 질문 찾기
      const targetState = findQuestion(state, action.payload.id);
      const contents = targetState.contents as contentProps[];

      //출발지점과 도착지점
      const { start, end } = action.payload;

      // contents에서 start 인덱스에 위치한 옵션을 제거하고 moveContents에 할당
      const moveContents = contents.splice(Number(start), 1);

      // contents의 end 인덱스 위치에 moveContents의 옵션을 삽입
      contents.splice(Number(end), 0, ...moveContents);
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  focusState,
  setTitle,
  setTitleContent,
  changeType,
  addOption,
  deleteOption,
  changeOption,
  addEtc,
  deleteEtc,
  copyQuestion,
  changeRequired,
  moveQuestion,
  moveOption,
} = surveySlice.actions;
