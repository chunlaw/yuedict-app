import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import AppContext, { Pronunciation } from "../AppContext";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import Phonetics from "./Phonetics";

interface CharacterCardProps {
  char: string;
}

const getUrl = (pronunciation: Pronunciation): string => {
  try {
    const { initial, final, tone } = pronunciation;
    return `https://data.yuedict.app/wav/${initial}${final}${tone}.mp3`;
  } catch {
    return "";
  }
};

const CharacterCard = React.forwardRef<any, CharacterCardProps>(
  ({ char }, ref) => {
    const { db, phoneticSys } = useContext(AppContext);
    const { t } = useTranslation();
    const [pIdx, setPIdx] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.autoplay = true;
            audio.onended = resolve;
            audio.onerror = resolve;
            audio.onplay = () => {
              if (!isNaN(audio.currentTime)) audio.playbackRate = 1.5;
            };
            audio.src = getUrl(db[char]?.phonetics.lshk[pIdx]);
          });
        },
      }),
      [pIdx, db, char]
    );

    useEffect(() => {
      setPIdx(
        db[char]?.phonetics.lshk.reduce((acc, {meanings}, idx, self) => (
          meanings.length > self[acc].meanings.length ? idx : acc
        ), 0)
      );
    }, [db, char]);

    return (
      <Box sx={rootSx}>
        <Box sx={{ minWidth: "20%", textAlign: "center" }}>
          <Typography variant="h2" color="textPrimary">
            {char}
          </Typography>
        </Box>
        <Box sx={definitinoContainerSx}>
          {db[char] && (
            <>
              <Box sx={phoneticsContainer}>
                {db[char].phonetics[phoneticSys].map((p, idx) => (
                  <Phonetics
                    {...p}
                    key={idx}
                    preferred={pIdx === idx}
                    onClick={() => setPIdx(idx)}
                  />
                ))}
              </Box>
            </>
          )}
          {db[char] === undefined && (
            <Typography variant="h5" color="GrayText">
              {t("沒有資料")}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }
);

export default CharacterCard;

const rootSx: SxProps<Theme> = {
  display: "flex",
  my: 1,
  p: 2,
  borderColor: grey[500],
  borderWidth: 1,
  borderStyle: "dashed",
  borderRadius: 5,
};

const definitinoContainerSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  minWidth: 0,
};

const phoneticsContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minWidth: 0,
};
