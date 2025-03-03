<template>
  <div class="login_container">
    <el-row>
      <!-- :xs当设备宽度小于768的时候右侧无 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-tabs class="login_from" v-model="activeName" type="border-card">
          <el-tab-pane label="账户密码登录" name="first">
            <AccountPassword />
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <PhoneLogin />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import AccountPassword from '@/views/login/AccountPassword.vue'
import { ref } from 'vue'
import PhoneLogin from '@/views/login/PhoneLogin.vue'
let activeName = ref('first')
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
    width: 50%;
    // vh 视孔高度的30%
    top: 25vh;
    background-size: cover;
    background-color: black;
    margin-left: 25%;
    // 设置半透明
    opacity: 0.6;
    // 内边距
    padding: 40px;
  }
}
</style>
