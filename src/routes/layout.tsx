import { Box } from "@mui/joy";
import { Header } from "components/Header";
import { Outlet } from "react-router";

const Layout = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "100vh",
      minWidth: "44rem",
      "&": {
        minHeight: "100dvh",
      },
      background: "white",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      alignItems: "center",
    }}
  >
    <Header />
    <Box
      sx={{
        width: "100%",
        pl: "2rem",
        pr: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
        flexGrow: 1,
      }}
    >
      <Outlet />
    </Box>
  </Box>
);

export default Layout;
