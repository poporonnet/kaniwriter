import { Box, Button, Group, Paper, Text } from "@mantine/core";
import { Target } from "libs/mrbwrite/controller";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MdDeveloperBoard as DeveloperBoardIcon,
  MdNorthWest as NorthWestIcon,
} from "react-icons/md";
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
    <Group
      w={"100%"}
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
        transition: "box-shadow 0.2s",
        borderRadius: "0.5rem",
        root: {
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
          },
        },
      }}
    >
      <Button
        color={target ? "primary" : "neutral"}
        variant="outline"
        onClick={() => setOpen(true)}
        fullWidth
        h={"3.5rem"}
        w="100%"
        styles={{
          label: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1.25,
            fontWeight: 700,
          },
        }}
      >
        {target ? (
          <>
            <Group
              style={{
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
              <Text fz="md" c={"dark"}>
                {target}
              </Text>
            </Group>
            <DeveloperBoardIcon />
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
    </Group>
  );
};
