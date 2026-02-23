import { Box, Button, Group, Image, Text, ThemeIcon } from "@mantine/core";
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
    <Box
      w="100%"
      bdrs="0.5rem"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Button
        color={target ? "primary.3" : "neutral.3"}
        variant="outline"
        onClick={() => setOpen(true)}
        fullWidth
        h="3.5rem"
        px="xs"
        styles={{
          label: {
            width: "100%",
            justifyContent: "space-between",
          },
        }}
      >
        {target ? (
          <>
            <Group>
              <Image
                src={targets.find((t) => t.title === target)?.image}
                alt={target}
                w="2.25rem"
                h="2.25rem"
                bdrs="0.25rem"
              />
              <Text fz="md" c="neutral.8">
                {target}
              </Text>
            </Group>
            <ThemeIcon variant="transparent" c="primary.5">
              <DeveloperBoardIcon />
            </ThemeIcon>
          </>
        ) : (
          <>
            <Text fz="sm" c="neutral.7">
              {t("書き込みターゲットを選択")}
            </Text>
            <ThemeIcon
              variant="transparent"
              c="neutral.7"
              bd="none"
              size="1.5rem"
            >
              <NorthWestIcon />
            </ThemeIcon>
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
