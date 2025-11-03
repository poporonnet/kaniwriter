import {
  DeviceHub as DeviceHubIcon,
  NorthWest as NorthWestIcon,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/joy";
import { Target } from "libs/mrubyWriterConnector";
import React from "react";
import { useTranslation } from "react-i18next";
import ESP32 from "/images/ESP32.webp";
import RBoard from "/images/Rboard.webp";
import { TargetSelectModal } from "./TargetSelectModal";

export const targets = [
  {
    title: "RBoard",
    image: RBoard,
  },
  {
    title: "ESP32",
    image: ESP32,
  },
] as const satisfies readonly { title: Target; image: string }[];

export const TargetSelector = ({
  target,
  onChangeTarget,
}: {
  target: Target | undefined;
  onChangeTarget: (target: Target) => void;
}) => {
  const [t] = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
        borderRadius: "0.5rem",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
        },
      }}
    >
      <Button
        color={target ? "primary" : "neutral"}
        variant="outlined"
        onClick={() => setOpen(true)}
        fullWidth
        sx={{
          justifyContent: "space-between",
          gap: target ? 1.5 : 0,
          p: 1.25,
          height: "3.5rem",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
        }}
      >
        {target ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={targets.find((t) => t.title === target)?.image}
                alt={target}
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "0.25rem",
                  marginRight: "1rem",
                }}
              />
              <Typography level="title-md">
                {target}
              </Typography>
            </Box>
            <DeviceHubIcon />
          </>
        ) : (
          <>
            {t("書き込みターゲットを選択")}
            <NorthWestIcon />
          </>
        )}
      </Button>
      <TargetSelectModal
        open={open}
        setOpen={setOpen}
        target={target}
        onChangeTarget={onChangeTarget}
      />
    </Box>
  );
};
