import { Box, Stack, Text } from "@mantine/core";
import { CompileStatus as CompileStatusType } from "hooks/useCompile";
import { Status as GetVersionsStatus, Version } from "hooks/useVersions";
import { useTranslation } from "react-i18next";
import { CompilerSelector } from "./CompilerSelector";
import { CompileStatus } from "./CompileStatus";

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
    <Stack
      gap="0.5rem"
      pt="md"
      pb="0.5rem"
      w="100%"
      bdrs="6px"
      bg="neutral.0"
      style={{
        border: "1px solid",
        borderColor:
          getVersionsStatus == "error" || compileStatus.status == "error"
            ? "red"
            : "lightgrey",
      }}
    >
      <Box w="100%" px="1rem">
        <Text fz="xs" c="neutral.6">
          {t("コンパイラバージョン")}
        </Text>
        <CompilerSelector
          versions={versions.sort()}
          version={version || ""}
          disabled={getVersionsStatus != "success"}
          onChange={onChangeVersion}
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
    </Stack>
  );
};
