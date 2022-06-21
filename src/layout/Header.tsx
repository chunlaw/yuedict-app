import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Typography,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { Theme } from "@mui/system";
import { useTranslation } from "react-i18next";
import AppContext from "../AppContext";

interface HeaderState {
  langAnchorEl: null | EventTarget;
  sysAnchorEl: null | EventTarget;
}

const Header = () => {
  const { phoneticSys, setSys } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<HeaderState>({
    langAnchorEl: null,
    sysAnchorEl: null,
  });

  const { langAnchorEl, sysAnchorEl } = state;

  const changeLanguage = (lang: "zh" | "en") => {
    i18n.changeLanguage(lang);
    handleClose();
  };
  const changeSys = (sys: "lshk" | "yale") => {
    setSys(sys);
    handleClose();
  };

  const handleClick = (
    fieldId: keyof HeaderState,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState((prev) => ({
      ...prev,
      [fieldId]: event.currentTarget,
    }));
  };
  const handleClose = () => {
    setState({
      sysAnchorEl: null,
      langAnchorEl: null,
    });
  };

  return (
    <Box sx={rootSx}>
      <Typography variant="h6" color="textPrimary">
        {t("粵讀 YueDict")}
      </Typography>
      <Button
        onClick={(e) => handleClick("sysAnchorEl", e)}
        aria-label="sys"
        aria-controls={langAnchorEl ? "sys-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={langAnchorEl ? "true" : undefined}
        sx={{ color: "white" }}
      >
        {t(phoneticSys)}
      </Button>
      <Menu
        open={sysAnchorEl !== null}
        onClose={handleClose}
        // @ts-ignore
        anchorEl={sysAnchorEl}
        MenuListProps={{
          "aria-labelledby": "lang-button",
        }}
      >
        <MenuItem onClick={() => changeSys("lshk")}>{t("lshk")}</MenuItem>
        <MenuItem onClick={() => changeSys("yale")}>{t("yale")}</MenuItem>
      </Menu>
      <IconButton
        onClick={(e) => handleClick("langAnchorEl", e)}
        aria-label="language"
        aria-controls={langAnchorEl ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={langAnchorEl ? "true" : undefined}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        open={langAnchorEl !== null}
        onClose={handleClose}
        // @ts-ignore
        anchorEl={langAnchorEl}
        MenuListProps={{
          "aria-labelledby": "lang-button",
        }}
      >
        <MenuItem onClick={() => changeLanguage("en")}>En</MenuItem>
        <MenuItem onClick={() => changeLanguage("zh")}>中</MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;

const rootSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  py: 2,
  alignItems: "center",
};
