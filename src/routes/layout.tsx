import { Box } from "@mui/material";
import { Header } from "components/Header";
import { Outlet } from "react-router";

export const Layout = () => (
  <Box
    sx={{
      width: "fit-content",
      height: "fit-content",
      minWidth: "100vw",
      minHeight: "100vh",
      "&": {
        minWidth: "100dvw",
        minHeight: "100dvh",
      },
      background: "white",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Header />
    <Outlet />
  </Box>
);
