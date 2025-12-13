import { IconButton, Snackbar, Stack, Typography } from "@mui/joy";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { Notification } from "../contexts/NotificationContext";
import { NotificationIcon } from "./NotificationIcon";

export const NotificationBar = ({
  notifications,
  setNotification,
}: {
  notifications: Notification[];
  setNotification: Dispatch<SetStateAction<Notification[]>>;
}) => {
  const [open, setOpen] = useState(notifications[0] != null);
  const close = useCallback(() => {
    setOpen(false);
    setNotification((prev) => prev.toSpliced(0, 1));
  }, [setNotification]);
  const { title, message, type, autoCloseMs } = useMemo(
    () =>
      ({
        title: notifications.at(0)?.title ?? "",
        message: notifications.at(0)?.message ?? "",
        type: notifications.at(0)?.type ?? "neutral",
        autoCloseMs: notifications.at(0)?.autoCloseMs,
      }) satisfies Notification,
    [notifications]
  );

  useEffect(() => {
    setOpen(notifications[0] != null);
  }, [notifications]);

  return (
    <Snackbar
      open={open}
      color={type}
      variant="outlined"
      startDecorator={<NotificationIcon type={type} />}
      endDecorator={
        <IconButton onClick={close} color={type} size="sm">
          <CloseIcon />
        </IconButton>
      }
      sx={{ alignItems: "flex-start", width: "22rem" }}
      autoHideDuration={autoCloseMs}
      onClose={(_, reason) => {
        if (reason == "clickaway") return;
        close();
      }}
    >
      <Stack flex={1}>
        <Typography sx={{ color: "inherit" }}>{title}</Typography>
        <Typography fontSize="0.7rem">{message}</Typography>
      </Stack>
    </Snackbar>
  );
};
