import { Select, Text, ThemeIcon } from "@mantine/core";
import { Version } from "hooks/useVersions";
import { useTranslation } from "react-i18next";
import { MdUnfoldMore as UnfoldMoreIcon } from "react-icons/md";

type Props = {
  versions: Version[];
  version: string;
  disabled?: boolean;
  onChange?: (version: Version) => void;
};

export const CompilerSelector = ({
  versions,
  version,
  disabled,
  onChange,
}: Props) => {
  const [t] = useTranslation();

  return (
    <Select
      placeholder={t("コンパイラを選択")}
      value={version}
      onChange={(value) => {
        if (typeof value === "string") {
          onChange?.(value);
        }
      }}
      disabled={disabled}
      withCheckIcon
      withScrollArea={false}
      checkIconPosition="right"
      data={versions.map((version) => ({
        value: version,
        label: `mrbc ${version}`,
      }))}
      variant="filled"
      rightSection={
        <ThemeIcon
          size="fit-content"
          variant="transparent"
          c={disabled ? "neutral.4" : "neutral.5"}
          bd={0}
        >
          <UnfoldMoreIcon size="1.25rem" />
        </ThemeIcon>
      }
      renderOption={(item) => (
        <Text
          px="0.75rem"
          py="0.375rem"
          w="100%"
          c="neutral.7"
          fz="md"
          bg={item.checked ? "neutral.3" : "transparent"}
        >
          {item.option.label}
        </Text>
      )}
      comboboxProps={{ offset: 3, shadow: "md" }}
      radius="6px"
      styles={(theme) => ({
        input: {
          fontSize: "1rem",
          paddingLeft: "1rem",
          border: 0,
          color: theme.colors.neutral[7],
          background: disabled
            ? theme.colors.neutral[0]
            : theme.colors.neutral[1],
          boxShadow: "0px 1px 2px 0px rgba(21 21 21 / 0.08)",
        },
        section: {
          width: "fit-content",
          marginRight: "8px",
        },
        dropdown: {
          padding: "6px 0",
          border: 0,
          background: theme.colors.neutral[1],
        },
        option: {
          padding: 0,
          borderRadius: 0,
        },
      })}
    />
  );
};
