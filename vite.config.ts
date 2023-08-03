import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import postCssToViewpoint from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode}) => {
  return {
    plugins: [
      VueSetupExtend(),
      vue(),
      viteMockServe({
        mockPath: './src/mock',
        supportTs: true, // 启用 ts
        localEnabled: command === 'serve' && mode === 'mock', //在开发环境中启用 mock
      }),
      Components({
        resolvers: [VarletUIResolver()]
      }),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        imports: ['vue'],
        resolvers: [VarletUIResolver({ autoImport: true })]
      }),
    ],
    
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': resolve(__dirname, './src'),
        '@utils': resolve(__dirname, './src/utils'),
        '@components': resolve(__dirname, './src/components')
      },
    },
    css: {
      postcss: {
        plugins: [
          postCssToViewpoint({
            viewportWidth: 375,
            unitPrecision: 6,
            unitToConvert: 'px',
            propList: ['*'],
          })
        ]
      }
    }
  }
})
