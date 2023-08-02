// vite.config.ts
import { defineConfig } from "file:///E:/projects/leisure-map/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/projects/leisure-map/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { quasar, transformAssetUrls } from "file:///E:/projects/leisure-map/node_modules/@quasar/vite-plugin/src/index.js";
import { viteMockServe } from "file:///E:/projects/leisure-map/node_modules/vite-plugin-mock/dist/index.js";
import VueSetupExtend from "file:///E:/projects/leisure-map/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import AutoImport from "file:///E:/projects/leisure-map/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "E:\\projects\\leisure-map";
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      VueSetupExtend(),
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: "src/assets/style/quasar-variables.scss"
      }),
      viteMockServe({
        mockPath: "./src/mock",
        supportTs: true,
        // 启用 ts
        localEnabled: command === "serve" && mode === "mock"
        //在开发环境中启用 mock
      }),
      AutoImport({
        dts: "src/auto-imports.d.ts",
        imports: ["vue"]
      })
    ],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        "@": resolve(__vite_injected_original_dirname, "./src"),
        "@utils": resolve(__vite_injected_original_dirname, "./src/utils"),
        "@components": resolve(__vite_injected_original_dirname, "src/components")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0c1xcXFxsZWlzdXJlLW1hcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdHNcXFxcbGVpc3VyZS1tYXBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3RzL2xlaXN1cmUtbWFwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBxdWFzYXIsIHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gJ0BxdWFzYXIvdml0ZS1wbHVnaW4nXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbmltcG9ydCBWdWVTZXR1cEV4dGVuZCBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIFZ1ZVNldHVwRXh0ZW5kKCksXG4gICAgICB2dWUoe1xuICAgICAgICB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfVxuICAgICAgfSksXG4gICAgICBxdWFzYXIoe1xuICAgICAgICBzYXNzVmFyaWFibGVzOiAnc3JjL2Fzc2V0cy9zdHlsZS9xdWFzYXItdmFyaWFibGVzLnNjc3MnXG4gICAgICB9KSxcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICBtb2NrUGF0aDogJy4vc3JjL21vY2snLFxuICAgICAgICBzdXBwb3J0VHM6IHRydWUsIC8vIFx1NTQyRlx1NzUyOCB0c1xuICAgICAgICBsb2NhbEVuYWJsZWQ6IGNvbW1hbmQgPT09ICdzZXJ2ZScgJiYgbW9kZSA9PT0gJ21vY2snLCAvL1x1NTcyOFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUyRFx1NTQyRlx1NzUyOCBtb2NrXG4gICAgICB9KSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZSddLFxuICAgICAgfSksXG4gICAgXSxcbiAgICBcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICB2dWU6ICd2dWUvZGlzdC92dWUuZXNtLWJ1bmRsZXIuanMnLFxuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdXRpbHMnKSxcbiAgICAgICAgJ0Bjb21wb25lbnRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpXG4gICAgICB9LFxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlAsU0FBUyxvQkFBb0I7QUFDMVIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixTQUFTLFFBQVEsMEJBQTBCO0FBQzNDLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sZ0JBQWdCO0FBTnZCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFJLE1BQU07QUFDaEQsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsSUFBSTtBQUFBLFFBQ0YsVUFBVSxFQUFFLG1CQUFtQjtBQUFBLE1BQ2pDLENBQUM7QUFBQSxNQUNELE9BQU87QUFBQSxRQUNMLGVBQWU7QUFBQSxNQUNqQixDQUFDO0FBQUEsTUFDRCxjQUFjO0FBQUEsUUFDWixVQUFVO0FBQUEsUUFDVixXQUFXO0FBQUE7QUFBQSxRQUNYLGNBQWMsWUFBWSxXQUFXLFNBQVM7QUFBQTtBQUFBLE1BQ2hELENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLFNBQVMsQ0FBQyxLQUFLO0FBQUEsTUFDakIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDL0IsVUFBVSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxRQUMxQyxlQUFlLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
