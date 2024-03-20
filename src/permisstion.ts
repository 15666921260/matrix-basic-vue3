import router from '@/router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 获取小仓库的token数据, 判断是否登录
import useUserStore from '@/store/modules/user.ts'
import pinia from '@/store'
import setting from '@/setting.ts'
const userStore = useUserStore(pinia)
// 不显示加载的小圈圈
nprogress.configure({ showSpinner: false })
/*
   路由鉴权，项目当中路由能不能被权限的设置(某一个路由什么条件下可以访问，什么条件下不可以访问)
   需要在main.ts中引入
   1、任意路由的切换，实现进度条的业务
      需要安装 nprogress 插件才能有进度条功能:  pnpm i nprogress
      进度条的样式进入到 node_modules/nprogress/nprogress.css 中的 #nprogress .bar 中可进行修改
   2、路由鉴权的问题:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)
      用户未登录，可以访问login。其余不能访问。
      登录成功后不能访问login[指向首页]，其余的可以访问
 */

/*
   全局守卫：项目当中任意路由切换都会触发的钩子
 */

/*
   全局前置守卫: 初始化的时候被调用、每次路由切换之前被调用
 */
router.beforeEach(
  (
    to: any,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    from: any,
    next: any,
  ) => {
    // to :你将要访问哪个路由
    // from: 你从哪个路由而来
    // next: 路由的放行函数
    // 实时修改页面title
    document.title = `${setting.title} - ${to.meta.title}`
    nprogress.start()
    // 获取token, 去判断用户登录、还是未登录
    const token = userStore.token
    // 获取用户的名字
    // let userName = userStore.username;
    if (token) {
      // 用户登录
      if (to.path == '/login') {
        next({ path: '/' })
      } else {
        // 登录成功返回其他路由
        next()
      }
    } else {
      // 用户未登录
      if (to.path == '/login') {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  },
)

/*
  全局后置守卫: 切换之后调用
 */
router.afterEach(
  (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    to: any,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    from: any,
  ) => {
    nprogress.done()
  },
)
