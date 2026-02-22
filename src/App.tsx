import "../i18n/i18n";
import {
  CSSVariablesResolver,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { NotificationProvider } from "components/NotificationProvider";
import { Home } from "pages/home";
import { IconContext } from "react-icons";
import { Layout } from "./layouts/layout";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from "@mantine/code-highlight";

const theme = extendTheme({
  fontFamily: {
    display: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    body: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
    code: "'Noto Sans Mono', monospace",
  },
});

const mantineTheme = createTheme({
  fontFamily: "Inter, 'Kosugi Maru', system-ui, Avenir, Helvetica, Arial",
  cursorType: "pointer",
  colors: {
    danger: [
      "#FEF6F6",
      "#FCE4E4",
      "#F7C5C5",
      "#F09898",
      "#E47474",
      "#C41C1C",
      "#A51818",
      "#7D1212",
      "#430A0A",
      "#240505",
    ],
    neutral: [
      "#FBFCFE",
      "#F0F4F8",
      "#DDE7EE",
      "#CDD7E1",
      "#9FA6AD",
      "#636B74",
      "#555E68",
      "#32383E",
      "#171A1C",
      "#0B0D0E",
    ],
    primary: [
      "#EDF5FD",
      "#E3EFFB",
      "#C7DFF7",
      "#97C3F0",
      "#4393E4",
      "#0B6BCB",
      "#185EA5",
      "#12467B",
      "#0A2744",
      "#051423",
    ],
    success: [
      "#F6FEF6",
      "#E3FBE3",
      "#C7F7C7",
      "#A1E8A1",
      "#51BC51",
      "#1F7A1F",
      "#136C13",
      "#0A470A",
      "#042F04",
      "#021D02",
    ],
    warning: [
      "#FEFAF6",
      "#FDF0E1",
      "#FCE1C2",
      "#F3C896",
      "#EA9A3E",
      "#9A5B13",
      "#72430D",
      "#492B08",
      "#2E1B05",
      "#1D1002",
    ],
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-disabled": theme.colors.neutral[1],
    "--mantine-color-disabled-color": theme.colors.neutral[4],
    "--text-lh": "1.5", // TODO: Mantineへの移行が完了したらデフォルトに戻す
  },
  dark: {
    "--mantine-color-disabled": theme.colors.neutral[1],
    "--mantine-color-disabled-color": theme.colors.neutral[4],
    "--text-lh": "1.5", // TODO: Mantineへの移行が完了したらデフォルトに戻す
  },
});

export const App = () => {
  async function loadShiki() {
    const { createHighlighter } = await import("shiki");
    const shiki = await createHighlighter({
      langs: ["ruby"],
      themes: ["github-light"],
    });
    return shiki;
  }

  const shikiAdapter = createShikiAdapter(loadShiki);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <MantineProvider theme={mantineTheme} cssVariablesResolver={resolver}>
        <CodeHighlightAdapterProvider adapter={shikiAdapter}>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <NotificationProvider>
              <Layout>
                <Home />
              </Layout>
            </NotificationProvider>
          </IconContext.Provider>
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </CssVarsProvider>
  );
};
