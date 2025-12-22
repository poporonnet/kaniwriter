import { Checkbox, CheckboxProps, Text } from "@mantine/core";
import { MdOutlineCheck as OutlineCheckIcon } from "react-icons/md";

const CheckboxIcon: CheckboxProps["icon"] = ({ className }) => (
  <OutlineCheckIcon
    className={className}
    style={{
      width: "100%",
      height: "100%",
    }}
  />
);

export const OptionCheckbox = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}) => (
  <Checkbox
    onChange={(ev) => setValue(ev.currentTarget.checked)}
    checked={value}
    label={
      <Text c="black" inline>
        {label}
      </Text>
    }
    icon={CheckboxIcon}
    color="primary.5"
    styles={{
      body: {
        alignItems: "center",
      },
      label: {
        paddingLeft: "10px",
      },
    }}
  />
);
