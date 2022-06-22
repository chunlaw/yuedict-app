import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  BottomNavigationActionProps,
} from "@mui/material";
import {
  Search as SearchIcon,
  SignLanguage as SignLanguageIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction label={t("字典")} icon={<SearchIcon />} />
      <BottomNavigationAction label={t("韻表")} icon={<SignLanguageIcon />} />
      <BottomNavigationAction label={t("設定")} icon={<SettingsIcon />} />
    </BottomNavigation>
  );
};

const BottomNavigationAction = React.forwardRef<
  HTMLButtonElement,
  BottomNavigationActionProps
>((props, ref) => {
  return (
    <MuiBottomNavigationAction
      sx={{
        color: "white",
      }}
      ref={ref}
      {...props}
    />
  );
});

export default Footer;
