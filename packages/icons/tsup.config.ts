import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/index.ts"], // 정확한 상대 경로
  dts: {
    entry: "src/components/index.ts", // DTS entry 따로 명시
  },
  format: ["esm"],
  sourcemap: true,
  clean: true,
  target: "esnext",
  external: ["react"],
  tsconfig: "./tsconfig.app.json",
});
