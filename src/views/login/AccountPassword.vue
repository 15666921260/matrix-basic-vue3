<template>
  <el-form :model="loginFrom" :rules="rules" ref="loginRef">
    <h1 class="hello">Hello</h1>
    <h2 class="title">Matrix Software</h2>
    <el-form-item prop="username">
      <el-input
        placeholder="请输入用户名"
        :prefix-icon="User"
        v-model="loginFrom.username"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        placeholder="请输入密码"
        type="password"
        :prefix-icon="Lock"
        v-model="loginFrom.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        class="login_btn"
        type="primary"
        size="default"
        @click="login"
      >
        登 录
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { LoginFrom } from '@/pojo/system/LoginFrom.ts'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { getTimeMsg } from '@/utils/time.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'

let userStore = useUserStore()
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
let loginFrom: LoginFrom = reactive({ username: '', password: '' })

// 获取表单el组件
let loginRef = ref()
const login = async () => {
  // 此行校验表单，防止数据为校验通过但起作用
  await loginRef.value.validate()

  /**
   * 通知仓库发登录请求
   * 请求成功 -> 到首页
   * 请求失败 -> 弹出登录失败的信息
   */
  loading.value = true // 开始加载
  try {
    // 可以书写 .then语法, 登录成功
    await userStore.userLogin(loginFrom)
    // 成功跳转首页
    // 判断路径当中有没有记录query参数, 如果有则往query中的跳转
    let redirect: any = $route.query.redirect
    // todo 可以在此处加逻辑获取用户信息，如果该用户含有某个特性，则让他跳转另一个主页面(非后台管理页面)(之后记得在那个页面的onMounted中重新调用初始化路由的方法)
    await $router.push({ path: redirect || '/' })
    // 先执行一下刷新不然会不能正常路由(动态路由的原因)，下下边直接调用加载路由不太行，导致不能添加进去
    // location.reload()
    ElNotification({
      type: 'success',
      message: '登录成功！',
      title: 'Hi' + getTimeMsg() + '好',
    })
    loading.value = false
  } catch (e) {
    ElNotification({
      type: 'error',
      message: (e as Error).message,
    })
    loading.value = false
  }
}

// 定义变量控制按钮加载的效果
let loading = ref(false)

const validatorPassword = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  rule: any,
  value: any,
  callback: any,
) => {
  // rule: 校验规则对象。value: 表单元素的文本内容。callback:检验通过与错误调用的函数
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少是6位'))
  }
}

// 表单校验
const rules = {
  /**
   * required: true代表这个字段必须校验
   * min  文本长度至少多少位
   * max  文本长度最多多少位
   * message 错误的提示信息
   * trigger 触发校验表单的时机 change:文本发生变化时，blur:失去鼠标焦点时触发
   */
  username: [
    // {required: true, message: '用户名不能为空', trigger: 'blur'},
    { required: true, message: '用户名长度太短', min: 5, trigger: 'change' },
  ],
  password: [
    // 自定义校验规则, validatorPassword函数要在上方
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.hello {
  color: white;
  font-size: 40px;
  font-family: SimHei;
}
.title {
  color: white;
  font-size: 24px;
  font-family: SimHei;
  margin: 20px 0;
}

.login_btn {
  width: 100%;
}
</style>
