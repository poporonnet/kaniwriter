import "../i18n/i18n";
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { NotificationProvider } from "components/NotificationProvider";
import { Home } from "pages/home";
import { IconContext } from "react-icons";
import { Layout } from "./layouts/layout";

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
        <Layout>
          <Home />
        </Layout>
      </NotificationProvider>
    </IconContext.Provider>
  </CssVarsProvider>
);
