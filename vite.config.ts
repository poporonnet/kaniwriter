import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    plugins: [reactRouter()],
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        css: path.resolve(__dirname, "src/css"),
        pages: path.resolve(__dirname, "src/pages"),
        routes: path.resolve(__dirname, "src/routes"),
        libs: path.resolve(__dirname, "src/libs"),
        hooks: path.resolve(__dirname, "src/hooks"),
      },
    },
  };
});
