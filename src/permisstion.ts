import router from '@/router'
//@ts-ignore
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
/*
   路由鉴权，项目当中路由能不能被权限的设置(某一个路由什么条件下可以访问，什么条件下不可以访问)
   需要在main.ts中引入
   1、任意路由的切换，实现进度条的业务
      需要安装 nprogress 插件才能有进度条功能:  pnpm i nprogress
      进度条的样式进入到 node_modules/nprogress/nprogress.css 中的 #nprogress .bar 中可进行修改
 */

/*
   全局守卫：项目当中任意路由切换都会触发的钩子
 */

/*
   全局前置守卫: 初始化的时候被调用、每次路由切换之前被调用
 */
router.beforeEach(
  (
    //@ts-ignore
    to: any,
    //@ts-ignore
    from: any,
    next: any,
  ) => {
    // to :你将要访问哪个路由
    // from: 你从哪个路由而来
    // next: 路由的放行函数
    nprogress.start()
    next()
  },
)

/*
  全局后置守卫: 切换之后调用
 */
router.afterEach(
  (
    //@ts-ignore
    to: any,
    //@ts-ignore
    from: any,
  ) => {
    nprogress.done()
  },
)
