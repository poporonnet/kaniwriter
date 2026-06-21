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
        zIndex="101"
        onClick={() => setIsOpen(false)}
      />
      <Paper
        withBorder
        pos="absolute"
        top="100%"
        left={0}
        w="60rem"
        miw="30rem"
        maw="calc(100vw - 10rem)"
        mah="30rem"
        p="1rem"
        radius="0.3rem"
        style={{
          zIndex: "102",
          overflow: "auto",
          borderColor: "#FFBBBB",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 3px 10px gray",
        }}
      >
        {error.split("\n").map((t) => (
          <code style={{ textAlign: "left" }}>{t}</code>
        ))}
      </Paper>
    </>
  );
