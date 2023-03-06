import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./home";
import Viewevents from "./viewEvents";
import Addeventform from "./addEventForm";

const theme = createTheme();

export default function Mainboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}></Container>
    </ThemeProvider>
  );
}
