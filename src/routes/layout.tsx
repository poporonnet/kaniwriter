import { AppShell } from "@mantine/core";
import { Header } from "components/Header";
import { Outlet } from "react-router";

const Layout = () => (
  <AppShell header={{ height: "4rem", offset: false }} mih="100vh" miw="44rem">
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
      <Outlet />
    </AppShell.Main>
  </AppShell>
);

export default Layout;
