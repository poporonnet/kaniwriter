export type NotificationColor = "success" | "danger" | "warning" | "primary";

export type Notification = {
  title: string;
  message: string;
  type: NotificationColor;
  autoClose?: number | boolean;
};
