import { useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { NotificationIcon } from "components/NotificationIcon";
import { useCallback } from "react";
import type { Notification } from "src/types/notification";

export const useNotify = () => {
  const theme = useMantineTheme();
  return useCallback(
    (notification: Notification) => {
      notifications.show({
        title: notification.title,
        message: notification.message,
        color: `${notification.type}.5`, // success.5, danger.5
        autoClose: notification.autoClose ?? false,
        withBorder: true,
        icon: <NotificationIcon type={notification.type} />,
        styles: {
          root: {
            borderColor: theme.colors[notification.type][3],
            borderRadius: "6px",
            width: "22rem",
            paddingInline: "1rem",
            paddingBlock: "1rem",
            backgroundColor: theme.colors.neutral[0],
          },
          title: {
            color: theme.colors[notification.type][5],
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
            color: theme.colors[notification.type][5],
            width: "1.5rem",
          },
        },
      });
    },
    [theme]
  );
};
