import { Box } from "@mantine/core";

export const ErrorDetailModal = ({
  error,
  isOpen,
  setIsOpen,
}: {
  error: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => (
  <>
    {isOpen && (
      <>
        <Box
          onClick={() => setIsOpen(false)}
          style={{
            top: 0,
            left: 0,
            width: "min(100dvw, 100vw)",
            height: "min(100dvh, 100vh)",
            position: "fixed",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 3,
          }}
        />
        <Box
          style={{
            textAlign: "left",
            left: "50%",
            position: "fixed",
            transform: "translateX(-50%)",
            zIndex: 4,
            width: "60rem",
            minWidth: "30rem",
            maxWidth: "calc(100vw - 10rem)",
            maxHeight: "30rem",
            overflow: "auto",
            top: "10.5rem",
            padding: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #FFBBBB",
            background: "white",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 3px 10px gray",
          }}
        >
          {error.split("\n").map((t, index) => (
            <code key={`${index}-${t}`}>{t}</code>
          ))}
        </Box>
      </>
    )}
  </>
);
