import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rspack/cli";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  mode: "production",
  devtool: false,
  target: "node",
  entry: {
    postprocess: "./src/bin/postprocess.ts",
    prepare: "./src/bin/prepare.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
});
