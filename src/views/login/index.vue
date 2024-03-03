<template>
  <div class="login_container">
    <el-row>
      <!-- :xs当设备宽度小于768的时候右侧无 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_from"
          :model="loginFrom"
          :rules="rules"
          ref="loginRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到 matrix software!</h2>
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
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
// 收集账号和密码的数据
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTimeMsg } from '@/utils/time.ts'

let userStore = useUserStore()
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
// 定义变量控制按钮加载的效果
let loading = ref(false)

let loginFrom = reactive({ username: 'admin', password: '123456' })

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
    $router.push({ path: redirect || '/' })
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

const validatorPassword = (rule: any, value: any, callback: any) => {
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
.login_container {
  width: 100%;
  // vh 视孔高度撑开
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_from {
    // 定位
    position: relative;
    width: 60%;
    // vh 视孔高度的30%
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    // 设置半透明
    //opacity: 0.6;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 24px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
