import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export const useNotify = () => useContext(NotificationContext);
