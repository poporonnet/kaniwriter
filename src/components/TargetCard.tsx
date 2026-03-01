import { Radio, Text, ThemeIcon, Image } from "@mantine/core";
import { Target } from "libs/mrbwrite/controller";
import { MdCheckCircle as CheckCircleIcon } from "react-icons/md";

type TargetCardProps = {
  title: Target;
  image: string;
  target?: string;
  setOpen: (open: boolean) => void;
};

export const TargetCard = (props: TargetCardProps) => {
  const isChecked = props.target === props.title;

  return (
    <Radio.Card
      value={props.title}
      onClick={() => {
        props.setOpen(false);
      }}
      pos="relative"
      display="flex"
      px="2rem"
      py="0.75rem"
      m="0.5rem"
      bd={isChecked ? "3px solid primary.5" : "1px solid neutral.3"}
      radius="md"
      style={(theme) => ({
        alignItems: "center",
        flexDirection: "column",
        gap: "0.75rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
        cursor: "pointer",
        transition: "box-shadow 0.2s, border 0.2s",
        backgroundColor: `${theme.colors.neutral[1]}`,
      })}
      onMouseEnter={(e) => {
        if (!isChecked)
          e.currentTarget.animate(
            {
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
            },
            { duration: 200, fill: "forwards" },
          );
      }}
      onMouseLeave={(e) => {
        if (!isChecked)
          e.currentTarget.animate(
            {
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
            },
            { duration: 200, fill: "forwards" },
          );
      }}
    >
      {isChecked && (
        <ThemeIcon
          pos="absolute"
          top="calc(-0.4rem - 2px)"
          right="calc(-0.4rem - 2px)"
          bd={0}
          variant="transparent"
          c="primary.5"
          bg="neutral.0"
          radius="100%"
          display="block"
          size={24}
          style={{
            zIndex: 2,
          }}
        >
          <CheckCircleIcon size={24} />
        </ThemeIcon>
      )}

      <Text component="label" htmlFor={props.title}>
        {props.title}
      </Text>
      <Image src={props.image} alt={props.title} h="5.5rem" w="5.5rem" />
    </Radio.Card>
  );
};
