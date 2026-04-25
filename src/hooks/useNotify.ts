import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

type Colors = "primary" | "neutral" | "danger" | "success" | "warning";

// Joy UI の各セマンティックカラーは Mantine テーマの同名カラーと同じパレットを参照している
// 500 相当（インデックス 5）をメインカラーとして使用する

export type Notification = {
  title: string;
  message: string;
  type: Colors;
  autoClose?: number | boolean;
};

export const useNotify = () => {
  return useCallback((notification: Notification) => {
    notifications.show({
      title: notification.title,
      message: notification.message,
      color: `${notification.type}.5`, // success.5, danger.5
      autoClose: notification.autoClose ?? false,
      withBorder: true,
      styles: {
        root: {
          borderColor: `var(--mantine-color-${notification.type}-5)`,
          boxShadow: "none",
          width: "22rem",
        },
      },
    });
  }, []);
};
