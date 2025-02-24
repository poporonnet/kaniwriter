import { ColorPaletteProp } from "@mui/joy";
import { createContext } from "react";

export type Notify = (notification: Notification) => void;

export type Notification = {
  title: string;
  message: string;
  type?: ColorPaletteProp;
  autoCloseMs?: number;
};

export const NotificationContext = createContext<Notify>(() => {
  return;
});
