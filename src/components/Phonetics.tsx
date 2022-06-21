import React from "react";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface PhoneticsProps {
  initial?: string;
  final?: string;
  tone?: string;
  meanings?: string;
  preferred: boolean;
  onClick?: () => void;
}

const Phonetics = ({
  initial,
  final,
  tone,
  meanings,
  preferred,
  onClick,
}: PhoneticsProps) => {
  return (
    <Box sx={rootSx}>
      <Button
        onClick={onClick}
        sx={{
          textTransform: "none",
        }}
      >
        <Box
          sx={{
            borderColor: grey[500],
            borderStyle: preferred ? "dashed" : "none",
            borderWidth: 0,
            borderLeftWidth: 1,
            pl: 1,
            "& span": {
              mx: 0.1,
            },
            textAlign: "left",
          }}
        >
          <Typography component="span" variant={"h6"} color="error">
            {initial}
          </Typography>
          <Typography component="span" variant={"h6"} color="aquamarine">
            {final}
          </Typography>
          <Typography component="span" variant={"h6"} color="green">
            {tone}
          </Typography>
        </Box>
      </Button>
      <Typography
        sx={{ whiteSpace: "nowrap" }}
        variant="h6"
        color="textPrimary"
      >
        {meanings}
      </Typography>
    </Box>
  );
};

export default Phonetics;

const rootSx: SxProps<Theme> = {
  display: "flex",
  overflow: "scroll",
  alignItems: "center",
};
