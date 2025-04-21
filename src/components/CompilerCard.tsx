import { Box, Sheet, Typography } from "@mui/joy";
import { CompileStatus as CompileStatusType } from "hooks/useCompile";
import { Status as GetVersionsStatus, Version } from "hooks/useVersions";
import { useTranslation } from "react-i18next";
import { CompileStatus } from "./CompileStatus";
import { CompilerSelector } from "./CompilerSelector";

export const CompilerCard = ({
  versions,
  getVersionsStatus,
  version,
  compileStatus,
  onChangeVersion,
}: {
  versions: Version[];
  getVersionsStatus: GetVersionsStatus;
  version: Version | undefined;
  compileStatus: CompileStatusType;
  onChangeVersion: (version: Version) => void;
}) => {
  const [t] = useTranslation();

  return (
    <Sheet
      variant="outlined"
      sx={{
        pt: "1rem",
        pb: "0.5rem",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "sm",
        borderColor:
          getVersionsStatus == "error" || compileStatus.status == "error"
            ? "red"
            : "lightgrey",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Box sx={{ width: "calc(100% - 2rem)" }}>
        <Typography level="body-xs">{t("コンパイラバージョン")}</Typography>
        <CompilerSelector
          versions={versions.sort()}
          version={version || ""}
          disabled={getVersionsStatus != "success"}
          onChange={onChangeVersion}
          sx={{ width: "100%" }}
        />
      </Box>
      <CompileStatus
        status={getVersionsStatus == "error" ? "error" : compileStatus.status}
        errorName={
          getVersionsStatus == "error"
            ? "fetching versions failed"
            : compileStatus.errorName
        }
        errorBody={compileStatus.errorBody}
      />
    </Sheet>
  );
};
