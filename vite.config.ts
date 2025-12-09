import { reactRouter } from "@react-router/dev/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      reactRouter(),
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
