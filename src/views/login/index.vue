<template>
  <div class="login_container">
    <el-row>
      <!-- :xs当设备宽度小于768的时候右侧无 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_from">
          <h1>Hello</h1>
          <h2>欢迎来到 matrix software!</h2>
          <el-form-item>
            <el-input
              placeholder="请输入用户名"
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
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
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

let userStore = useUserStore()
// 获取路由器
let $router = useRouter()

// 定义变量控制按钮加载的效果
let loading = ref(false)

let loginFrom = reactive({ username: 'admin', password: '111111' })

const login = async () => {
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
    $router.push('/')
    ElNotification.success('登录成功！')
    loading.value = false
  } catch (e) {
    ElNotification.error(e.message)
    loading.value = false
  }
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
