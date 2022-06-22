import React, { useRef } from "react";
import { Box, IconButton, SxProps, TextField } from "@mui/material";
import { Theme } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CharacterCard from "../components/CharacterCard";

const Definition = () => {
  const { queryStr } = useParams();
  const navigate = useNavigate();
  const refs = useRef<any[]>([]);

  const playSound = async () => {
    for (let i = 0; i < refs.current?.length; ++i) {
      await refs.current[i].play();
    }
  };

  return (
    <Box sx={rootSx}>
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          value={queryStr ?? ""}
          onChange={({ target: { value } }) => {
            navigate(`/${value}`);
          }}
        />
        <IconButton onClick={() => playSound()}>
          <PlayCircleIcon />
        </IconButton>
      </Box>
      {queryStr?.split("").map((c, idx) => (
        <CharacterCard
          key={`card-${idx}`}
          char={c}
          ref={(el) => (refs.current[idx] = el)}
        />
      ))}
    </Box>
  );
};

export default Definition;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  overflow: "scroll",
};
