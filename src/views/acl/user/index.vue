<!-- 用户管理 -->
<template>
  <el-card style="height: 75px">
    <el-form :inline="true" class="formClass">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="info" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="card-box">
    <el-button type="primary" size="default">添加用户</el-button>
    <el-button type="primary" size="default">批量删除</el-button>
    <!-- 表格 -->
    <el-table
      class="card-table"
      ref="singleTableRef"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      border
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column
        property="username"
        prop="username"
        label="用户名"
        width="120"
      />
      <el-table-column
        property="realName"
        prop="realName"
        label="真实姓名"
        width="120"
      />
      <el-table-column
        property="nickName"
        prop="nickName"
        label="昵称"
        width="120"
      />
      <el-table-column
        property="userType"
        prop="userType"
        label="用户类型"
        width="120"
      />
      <el-table-column property="phone" prop="phone" label="电话" width="150" />
      <el-table-column
        property="createTime"
        prop="createTime"
        label="创建时间"
        width="150"
      />
      <el-table-column
        property="updateTime"
        prop="updateTime"
        label="更新时间"
        width="150"
      />
      <el-table-column label="操作">
        <!-- 分配角色 -->
        <!-- 修改信息 -->
        <!-- 重置密码(仅超级管理员) -->
        <!-- 删除 -->
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
      <el-button @click="setCurrent()">Clear selection</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { UserList } from '@/pojo/system/user/UserList.ts'

const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

const setCurrent = (row?: UserList) => {
  singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val: UserList | undefined) => {
  currentRow.value = val
}
const tableData: UserList[] = [
  {
    realName: '2016-05-03',
    username: 'Tom',
    userType: 'No. 189',
  },
  {
    realName: '2016-05-02',
    username: 'Tom',
    userType: 'No. 189',
  },
  {
    realName: '2016-05-04',
    username: 'Tom',
    userType: 'No. 189',
  },
  {
    realName: '2016-05-01',
    username: 'Tom',
    userType: 'No. 189',
  },
]
</script>
<style scoped lang="scss">
.formClass {
  display: flex;
  // 一左一右
  justify-content: space-between;
  // 上下居中
  align-items: center;
}

.card-box {
  margin-top: 10px;
  font-family: 'Microsoft Yahei';
  color: black;

  .card-table {
    margin-top: 10px;
  }
}
</style>
