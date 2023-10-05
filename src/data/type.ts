export interface surveyProps {
  id?: string;
  type: string;
  title: string;
  contents:
    | string
    | {
        contentId?: string;
        text?: string;
        etc?: boolean;
      }[];
  isFocused: boolean;
  isRequired?: boolean;
}
