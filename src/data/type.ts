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
