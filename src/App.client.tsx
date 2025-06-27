import "../i18n/i18n";
import {
  CssVarsProvider,
  extendTheme,
  THEME_ID as JOY_THEME_ID,
} from "@mui/joy/styles";
import {
  CssBaseline,
  createTheme,
  THEME_ID as MATERIAL_THEME_ID,
  ThemeProvider,
} from "@mui/material";
import { NotificationProvider } from "components/NotificationProvider";
import { Outlet } from "react-router";

const muiTheme = createTheme({
  typography: {
    fontFamily: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
  },
});

const joyTheme = extendTheme({
  fontFamily: {
    display: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    body: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    code: "'Noto Sans Mono', monospace",
  },
});

export const App = () => (
  <ThemeProvider theme={{ [MATERIAL_THEME_ID]: muiTheme }}>
    <CssVarsProvider theme={{ [JOY_THEME_ID]: joyTheme }}>
      <CssBaseline enableColorScheme />
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </CssVarsProvider>
  </ThemeProvider>
);
