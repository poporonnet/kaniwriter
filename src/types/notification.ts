export type NotificationColors =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning";

export type Notification = {
  title: string;
  message: string;
  type: NotificationColors;
  autoClose?: number | boolean;
};
