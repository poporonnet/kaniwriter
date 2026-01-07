import { AppShell } from "@mantine/core";
import { Header } from "components/Header";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => (
  <AppShell
    header={{ height: "4rem", offset: false }}
    mih="100vh"
    miw="44rem"
    display="flex"
    style={{ flexDirection: "column" }}
  >
    <AppShell.Header pos="static" bd={0}>
      <Header />
    </AppShell.Header>

    <AppShell.Main
      display="flex"
      pt="2rem"
      pl="2rem"
      pr="1rem"
      style={{
        minHeight: "unset",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
        flexGrow: 1,
      }}
    >
      {children}
    </AppShell.Main>
  </AppShell>
);
