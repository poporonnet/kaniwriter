import { RouterProvider } from "react-router-dom";
import { router } from "routes/router";
import "../i18n/i18n";
import { NotificationProvider } from "components/NotificationProvider";

export const App = () => (
  <NotificationProvider>
    <RouterProvider router={router} />
  </NotificationProvider>
);
