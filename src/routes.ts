import { index, layout, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [index("./pages/home.tsx")]),
] satisfies RouteConfig;
