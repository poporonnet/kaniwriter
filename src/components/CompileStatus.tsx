import { Box, CircularProgress, SvgIcon, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import {
  MdCheck as CheckIcon,
  MdErrorOutline as ErrorOutlineIcon,
} from "react-icons/md";
import type { CompileStatus as CompileStatusType } from "#/hooks/useCompile";

type CompileStatusProps = CompileStatusType & {
  onClickOpenError: () => void;
};

export const CompileStatus = ({
  status,
  errorName,
  errorBody,
  onClickOpenError,
}: CompileStatusProps) => {
  const [t] = useTranslation();

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
      }}
    >
      {status === "idle" && (
        <>
          {t("コンパイル待機中")}
          <CircularProgress size="sm" thickness={2} sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "compile" && (
        <>
          {t("コンパイル中")}
          <CircularProgress size="sm" thickness={2} sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "success" && (
        <>
          {t("コンパイル完了")}
          <SvgIcon color="success">
            <CheckIcon />
          </SvgIcon>
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
          <Box display="flex" justifyContent="center">
            {t("コンパイル失敗")}
            <SvgIcon color="danger">
              <ErrorOutlineIcon />
            </SvgIcon>
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
                onClick={() => onClickOpenError()}
              >
                <code>{errorName ?? "unknown error"}</code>
                <Typography fontSize="0.8rem" color="danger">
                  {t("エラーの詳細を見る")}
                </Typography>
              </Box>
            </>
          ) : (
            <code>{errorName ?? "unknown error"}</code>
          )}
        </Box>
      )}
    </Box>
  );
};
