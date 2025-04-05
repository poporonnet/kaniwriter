import { ReactNode, useCallback, useState } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import { Notification } from "../contexts/NotificationContext";
import { NotificationBar } from "./NotificationBar";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notify = useCallback(
    (notification: Notification) =>
      setNotifications((prev) => [...prev, notification]),
    []
  );

  return (
    <NotificationContext.Provider value={notify}>
      <NotificationBar
        notifications={notifications}
        setNotification={setNotifications}
      />
      {children}
    </NotificationContext.Provider>
  );
};
