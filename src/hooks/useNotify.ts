import { useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

export type JoyColor = "primary" | "neutral" | "danger" | "success" | "warning";

// Joy UI の各セマンティックカラーは Mantine テーマの同名カラーと同じパレットを参照している
// 500 相当（インデックス 5）をメインカラーとして使用する
const JOY_COLOR_INDEX = 5;

export type Notification = {
  title: string;
  message: string;
  type: JoyColor;
  autoClose?: number | boolean;
};

export const useNotify = () => {
  const theme = useMantineTheme();

  return useCallback(
    (notification: Notification) => {
      const color = theme.colors[notification.type][JOY_COLOR_INDEX];

      notifications.show({
        title: notification.title,
        message: notification.message,
        color,
        autoClose: notification.autoClose ?? false,
        withBorder: true,
      });
    },
    [theme]
  );
};
