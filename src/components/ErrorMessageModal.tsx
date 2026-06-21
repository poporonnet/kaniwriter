import { Overlay, Paper } from "@mantine/core";

export const ErrorDetailModal = ({
  error,
  isOpen,
  setIsOpen,
}: {
  error: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) =>
  isOpen && (
    <>
      <Overlay
        fixed
        color="#000"
        backgroundOpacity={0.5}
        zIndex={200}
        onClick={() => setIsOpen(false)}
      />
      <Paper
        withBorder
        pos="fixed"
        top="50%"
        left="50%"
        w="60rem"
        miw="30rem"
        maw="calc(100vw - 10rem)"
        mah="30rem"
        p="1rem"
        radius="0.3rem"
        style={{ zIndex: 201, overflow: "auto", borderColor: "#FFBBBB", transform: "translate(-50%, -50%)" }}
      >
        {error.split("\n").map((t) => (
          <code>{t}</code>
        ))}
      </Paper>
    </>
  );
