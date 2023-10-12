import Typography from "@mui/material/Typography";
import { TitleContainer } from "../../common/titleEditBody/TitleEditBody.styled";
import { BoxContainer, TitleHeader } from "../editBox/EditBox.styled";
import { Divider } from "@mui/material";

export const TitlePreviewBox = ({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) => {
  return (
    <BoxContainer>
      <TitleHeader />
      <TitleContainer>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography variant="caption" gutterBottom>
          *은 필수적으로 대답하셔야 하고, 단답형은 10글자 제한이 있습니다.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {contents}
        </Typography>
      </TitleContainer>
    </BoxContainer>
  );
};
