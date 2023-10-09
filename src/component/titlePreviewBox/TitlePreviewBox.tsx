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
        <Typography variant="h6" gutterBottom>
          {contents}
        </Typography>
      </TitleContainer>
    </BoxContainer>
  );
};
