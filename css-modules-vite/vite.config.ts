import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // generateScopedName: "harrison_[name]__[local]__[hash:base64:5]",
      generateScopedName: function (name, filename, css) {
        console.log(name, filename, css);

        return "xxx";
      },
      getJSON: function (cssFileName, json, outputFileName) {
        console.log(cssFileName, json, outputFileName);
      },
      exportGlobals: true, // 全局的 className 也导出到对象
      scopeBehaviour: "local", // 控制是否全局
      localsConvention: "camelCase", // 导出的对象的 key 的格式
      globalModulePaths: [/Button1/], // 哪些文件路径默认是全局 className
    },
  },
});
