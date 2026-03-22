import { MantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

export type Notification = {
  title: string;
  message: string;
  type?: MantineColor;
  autoClose?: number | boolean;
};

export const useNotify = () => {
  return useCallback((notification: Notification) => {
    notifications.show({
      title: notification.title,
      message: notification.message,
      color: notification.type,
      autoClose: notification.autoClose ?? false,
      withBorder: true,
      // icon:
      //   notification.type && notification.type !== "neutral" ? (
      //     <NotificationIcon type={notification.type} />
      //   ) : undefined,
    });
  }, []);
};
