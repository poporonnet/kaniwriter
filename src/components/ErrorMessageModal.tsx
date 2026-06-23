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
        backgroundOpacity={0.5}
        onClick={() => setIsOpen(false)}
      />
      <Paper
        withBorder
        pos="absolute"
        top="100%"
        left="0"
        w="60rem"
        miw="30rem"
        maw="calc(100vw - 10rem)"
        mah="30rem"
        p="1rem"
        radius="0.3rem"
        ta="left"
        style={{
          zIndex: "var(--mantine-z-index-modal)",
          overflow: "auto",
          borderColor: "#FFBBBB",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 3px 10px gray",
        }}
      >
        {error.split("\n").map((t, i) => (
          <code key={i}>{t}</code>
        ))}
      </Paper>
    </>
  );
