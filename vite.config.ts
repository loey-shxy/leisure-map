import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { viteMockServe } from 'vite-plugin-mock'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode}) => {
  return {
    plugins: [
      VueSetupExtend(),
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/assets/style/quasar-variables.scss'
      }),
      viteMockServe({
        mockPath: './src/mock',
        supportTs: true, // 启用 ts
        localEnabled: command === 'serve' && mode === 'mock', //在开发环境中启用 mock
      }),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        imports: ['vue'],
      }),
    ],
    
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': resolve(__dirname, './src'),
        '@utils': resolve(__dirname, './src/utils'),
        '@components': resolve(__dirname, 'src/components')
      },
    }
  }
})
