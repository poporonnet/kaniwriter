import { Button, Flex, Group, Text } from "@mantine/core";
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
        borderRadius: "0.5rem",
      }}
    >
      <Button
        color={target ? "primary" : "gray"}
        variant="outline"
        onClick={() => setOpen(true)}
        h={"3.5rem"}
        px="xs"
        w={"100%"}
        styles={{
          label: {
            width: "100%",
            justifyContent: "space-between",
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
            <Text fz={"sm"} c={"dark"} >
              {t("書き込みターゲットを選択")}
            </Text>
            <NorthWestIcon color="black" />
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
