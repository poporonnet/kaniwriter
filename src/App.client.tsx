import "../i18n/i18n";
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { NotificationProvider } from "components/NotificationProvider";
import { IconContext } from "react-icons";
import { Outlet } from "react-router";

const theme = extendTheme({
  fontFamily: {
    display: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    body: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    code: "'Noto Sans Mono', monospace",
  },
});

export const App = () => (
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </IconContext.Provider>
  </CssVarsProvider>
);
