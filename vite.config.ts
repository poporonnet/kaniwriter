import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    build: {
      sourcemap: true,
      rolldownOptions: {
        output: {
          advancedChunks: {
            groups: [
              {
                test: /node_modules\/react/,
                name: "react",
              },
              {
                test: /node_modules\/@mui\/joy/,
                name: "@mui/joy",
              },
            ],
          },
        },
      },
    },
    plugins: [
      react(),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "poporon-network",
        project: "kaniwriter",
        sourcemaps: {
          filesToDeleteAfterUpload: "dist/**/*.js.map",
        },
        disable: process.env.NODE_ENV !== "production",
        silent: process.env.NODE_ENV !== "production",
      }),
    ],
    define: {
      "import.meta.env.NPM_PACKAGE_VERSION": JSON.stringify(
        process.env.npm_package_version
      ),
    },
    base: "./",
    resolve: { tsconfigPaths: true },
  };
});
