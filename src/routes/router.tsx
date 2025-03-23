import { Home } from "pages/home";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { Layout } from "routes/layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  ),
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);
