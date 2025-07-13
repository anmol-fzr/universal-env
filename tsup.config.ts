import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["packages/core/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  target: "node18",
});
