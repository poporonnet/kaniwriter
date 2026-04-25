import { MantineColor } from "@mantine/core";

export const NOTIFICATION_COLORS = [
  "success",
  "danger",
  "warning",
  "primary",
] as const;
export type NotificationColors = (typeof NOTIFICATION_COLORS)[number];

export type Notification = {
  title: string;
  message: string;
  type: MantineColor;
  autoClose?: number | boolean;
};
