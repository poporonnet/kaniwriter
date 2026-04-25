import { notifications } from "@mantine/notifications";
import { NotificationIcon } from "components/NotificationIcon";
import { createElement, useCallback } from "react";
import type { Notification } from "src/types/notification";

// Joy UI の各セマンティックカラーは Mantine テーマの同名カラーと同じパレットを参照している
// 500 相当（インデックス 5）をメインカラーとして使用する

export const useNotify = () => {
  return useCallback((notification: Notification) => {
    notifications.show({
      title: notification.title,
      message: notification.message,
      color: `${notification.type}.5`, // success.5, danger.5
      autoClose: notification.autoClose ?? false,
      withBorder: true,
      icon: createElement(NotificationIcon, { type: notification.type }),
      styles: {
        root: {
          borderColor: `var(--mantine-color-${notification.type}-3)`,
          borderRadius: "6px",
          width: "22rem",
          paddingInline: "1rem",
          paddingBlock: "1rem",
          backgroundColor: `var(--mantine-color-neutral-0)`,
        },
        title: {
          color: `var(--mantine-color-${notification.type}-5)`,
          fontSize: "1rem",
        },
        icon: {
          marginTop: "0.1rem",
          marginRight: "0.5rem",
          marginBottom: "auto",
          width: "1.25rem",
          height: "1.25rem",
        },
        description: {
          fontSize: "0.7rem",
          color: "black",
        },
        closeButton: {
          color: `var(--mantine-color-${notification.type}-5)`,
          "--cb-icon-size": "1.5rem",
          "&:hover": {
            backgroundColor: `var(--mantine-color-${notification.type}-1)`,
          },
        },
      },
    });
  }, []);
};
