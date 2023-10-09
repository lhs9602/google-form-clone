import { PersistState } from "redux-persist/lib/types";

export interface surveyProps {
  id: string;
  type: string;
  title: string;
  contents: string | contentProps[];
  isFocused: boolean;
  isRequired?: boolean;
  isEtc?: boolean;
}
export interface handleResponseProps {
  (type: string, newValue: string | string[]): void;
}
export interface contentProps {
  contentId: string;
  text: string;
}

export interface stateProps {
  survey: surveyProps[];
  _persist: PersistState;
}

export interface TypeSelectorProps {
  value: string;
  id: string;
}
export interface QuestionValue {
  isRequired: boolean;
  value: string | string[];
}

export interface FormValues {
  [key: string]: QuestionValue;
}
