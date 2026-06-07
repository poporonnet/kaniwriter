import { Option, Select } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { useTranslation } from "react-i18next";
import { Version } from "#/hooks/useVersions";

type Props = {
  versions: Version[];
  version: string;
  disabled?: boolean;
  onChange?: (version: Version) => void;
  sx?: SxProps;
};

export const CompilerSelector = ({
  versions,
  version,
  disabled,
  onChange,
  sx,
}: Props) => {
  const [t] = useTranslation();

  return (
    <Select
      variant="soft"
      placeholder={t("コンパイラを選択")}
      onChange={(_, value) => {
        if (onChange && typeof value === "string") {
          onChange(value);
        }
      }}
      value={version}
      sx={{
        pl: "1rem",
        ...sx,
      }}
      disabled={disabled}
    >
      {versions.map((version) => (
        <Option value={version} key={version}>
          mrbc {version}
        </Option>
      ))}
    </Select>
  );
};
