import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  buildDirectory: "dist",
  ssr: false,
  basename: process.env.VITE_BASE_URL,
} satisfies Config;
