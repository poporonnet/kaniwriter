import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { CompileStatus } from "hooks/useCompile";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorDetailModal } from "./ErrorMessageModal";

export const CompileStatusCard = ({
  status,
  errorName,
  errorBody,
}: CompileStatus) => {
  const [t] = useTranslation();
  const [isOpenErrorDetail, setIsOpenErrorDetail] = useState(false);

  return (
    <Box
      sx={{
        p: "0.5rem 1.5rem",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'M PLUS Rounded 1c', sans-serif",
      }}
    >
      {status === "idle" && (
        <>
          {t("コンパイル待機中")}
          <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "compile" && (
        <>
          {t("コンパイル中")}
          <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "success" && (
        <>
          {t("コンパイル完了")}
          <CheckIcon color="success" />
        </>
      )}
      {status === "error" && (
        <Box
          display="flex"
          flexDirection="column"
          flex="1"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            {t("コンパイル失敗")}
            <ErrorOutlineIcon color="error" />
          </Box>
          {errorBody ? (
            <>
              <Box
                display="flex"
                flexDirection="column"
                textAlign="center"
                width="100%"
                py="0.2rem"
                sx={{
                  userSelect: "none",
                  ":hover": {
                    background: "#FFEEEE",
                  },
                  ":active": {
                    background: "#FFDDDD",
                  },
                }}
                borderRadius="0.5rem"
                onClick={() => setIsOpenErrorDetail((prev) => !prev)}
              >
                <code>{errorName ?? "unknown error"}</code>
                <Typography fontSize="0.8rem" color="danger">
                  {isOpenErrorDetail
                    ? t("クリックして閉じる")
                    : t("エラーの詳細を見る")}
                </Typography>
              </Box>
              <ErrorDetailModal
                error={errorBody}
                isOpen={isOpenErrorDetail}
                setIsOpen={setIsOpenErrorDetail}
              />
            </>
          ) : (
            <code>{errorName ?? "unknown error"}</code>
          )}
        </Box>
      )}
    </Box>
  );
};
