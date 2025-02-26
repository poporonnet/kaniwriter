import { RouterProvider } from "react-router-dom";
import { router } from "routes/router";
import "../i18n/i18n";
import {
  CssVarsProvider,
  THEME_ID as JOY_THEME_ID,
  extendTheme,
} from "@mui/joy/styles";
import {
  CssBaseline,
  THEME_ID as MATERIAL_THEME_ID,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { NotificationProvider } from "components/NotificationProvider";

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
        <RouterProvider router={router} />
      </NotificationProvider>
    </CssVarsProvider>
  </ThemeProvider>
);
