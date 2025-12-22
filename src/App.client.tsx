import "../i18n/i18n";
import {
  CSSVariablesResolver,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { NotificationProvider } from "components/NotificationProvider";
import { IconContext } from "react-icons";
import { Outlet } from "react-router";
import "@mantine/core/styles.css";

const theme = extendTheme({
  fontFamily: {
    display: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    body: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    code: "'Noto Sans Mono', monospace",
  },
});

const mantineTheme = createTheme({
  fontFamily: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
});

const resolver: CSSVariablesResolver = (theme) => ({
});

export const App = () => (
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <MantineProvider theme={mantineTheme} cssVariablesResolver={resolver}>
      <IconContext.Provider value={{ size: "1.5rem" }}>
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
      </IconContext.Provider>
    </MantineProvider>
  </CssVarsProvider>
);
