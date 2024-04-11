import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取对应环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached(svg适量图标存放目录)
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // localEnabled: command === 'serve', // 开发阶段可以使用mock接口localEnabled可能爆红但不影响运行
        // 换回2.9.8版本不爆红但是，启动有黄色警报
        enable: true, // 3.0.0以上版本用这个即可,gitHub的新解释
        // https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT as unknown as number,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据服务器地址
          target: env.VITE_SERVE,
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/matrix/, ''),
        },
      },
    },
  }
})
