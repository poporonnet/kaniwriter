import { Checkbox } from "@mui/joy";

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
    label={label}
  />
);
