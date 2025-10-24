import { Button } from "@mui/material";

export default function VoteComponent({ voteId, hasBorder }) {
  const voteText = ["Aprovo", "Reprovo", "Me abstenho", "Colocar em diligência"];
  const voteColor = ["success", "error", "secondary", "warning"];

  return (
    <Button
      variant={hasBorder ? "outlined" : "text"}
      color={voteColor[voteId]}
      sx={{
        borderRadius: 2,
        px: 4,
        py: 1.2,
      }}
    >
      {voteText[voteId]}
    </Button>
  );
}
