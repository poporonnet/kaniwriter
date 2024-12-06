import { Modal, ModalClose, Sheet } from "@mui/joy";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const UnsupportedBrowserModal = () => {
  const [open, setOpen] = useState(true);
  const [t] = useTranslation();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: "90%",
        minWidth: "500px",
        m: "auto",
        alignContent: "center",
      }}
    >
      <Sheet variant="outlined" sx={{ borderRadius: "0.5rem" }}>
        <Typography
          fontFamily="'M PLUS Rounded 1c', sans-serif"
          variant="h4"
          m={1}
          alignItems="center"
        >
          {t("このブラウザはサポートされていません")}
        </Typography>
        <ModalClose variant="plain" sx={{ m: 0.5 }} />

        <Typography
          fontFamily={"'M PLUS Rounded 1c', sans-serif"}
          fontSize="sm"
          m={"0.5rem"}
          whiteSpace={"pre-line"}
        >
          {t("対応するブラウザを使ってください")}
        </Typography>
      </Sheet>
    </Modal>
  );
};
