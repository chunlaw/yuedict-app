import React, { useMemo, useContext } from "react";
import "./App.css";
import { Button, Container, Paper } from "@mui/material";
import AppContext from "./AppContext";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  SxProps,
} from "@mui/material/styles";
import Header from "./layout/Header";
import { Theme } from "@mui/system";
import Footer from "./layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Definition from "./pages/Definition";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":queryStr" element={<Definition />} />
        <Route path="*" element={<Definition />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  const { db } = useContext(AppContext);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "'Chiron Sans HK Pro WS', sans-serif",
        },
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs" sx={rootSx}>
          <Header />
          <Router />
          <Footer />
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: 1,
};
