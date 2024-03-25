<!-- 用户管理 -->
<template>
  <div>
    <el-card style="height: 75px">
      <el-form :inline="true" class="formClass">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="pageUserList">
            搜索
          </el-button>
          <el-button type="info" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-box" style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button type="primary" size="default">批量删除</el-button>
      <!-- 表格 -->
      <el-table
        class="card-table"
        :data="tableData"
        highlight-current-row
        style="width: 100%; margin: 10px 0"
        border
      >
        <el-table-column type="selection" align="center" />
        <el-table-column type="index" width="60" align="center" label="序号" />
        <el-table-column
          property="username"
          prop="username"
          label="用户名"
          align="center"
          width="120"
        />
        <el-table-column
          property="realName"
          prop="realName"
          label="真实姓名"
          align="center"
          width="120"
        />
        <el-table-column
          property="nickName"
          prop="nickName"
          label="昵称"
          align="center"
          width="120"
        />
        <el-table-column
          property="userType"
          prop="userType"
          label="用户类型"
          align="center"
          width="120"
        />
        <el-table-column
          property="phone"
          prop="phone"
          label="电话"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          property="createTime"
          prop="createTime"
          align="center"
          label="创建时间"
          show-overflow-tooltip
        />
        <el-table-column
          property="updateTime"
          prop="updateTime"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="400px" align="center">
          <template v-slot="scope">
            <el-button
              type="success"
              size="small"
              icon="User"
              @click="handleClick(scope.row)"
              plain
            >
              分配角色
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="editUserInfo(scope.row)"
              plain
            >
              修改信息
            </el-button>
            <el-button type="danger" size="small" icon="Delete" plain>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页器  -->
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="pageUserList"
        @current-change="pageUserList"
      />
    </el-card>
    <!-- 抽屉结构完成添加和修改 -->
    <el-drawer v-model="drawer" size="30%">
      <template #header>
        <h4>{{ drawerTitle }}</h4>
      </template>
      <template #default>
        <el-form label-width="auto" :inline="true">
          <el-form-item label="用户名:">
            <el-input
              placeholder="请输入用户名"
              style="width: 150px"
              maxlength="12"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:">
            <el-input
              placeholder="请输入用户昵称"
              style="width: 150px"
              maxlength="12"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码:">
            <el-input placeholder="请输入用户密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:">
            <el-input placeholder="请输入用户确认密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input placeholder="请输入用户手机号"></el-input>
          </el-form-item>
          <el-form-item label="用户类型:">
            <el-input placeholder="请选择用户类型"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElTable } from 'element-plus'
import { UserList } from '@/pojo/system/user/UserList.ts'
import { queryUserList } from '@/api/user'
import { QueryUserParam } from '@/pojo/system/user/QueryUserParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'

let tableData = ref<UserList[]>()
// 默认页码
let pageNum = ref<number>(1)
// 默认每页个数
let pageSize = ref<number>(10)
let total = ref<number>()
// 定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 抽屉的标题
let drawerTitle = ref<string>('添加用户数据')
onMounted(() => {
  pageUserList()
})

const pageUserList = async () => {
  let queryUserParam: QueryUserParam = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }
  queryUserList(queryUserParam).then((r: PageResponse<UserList>) => {
    tableData.value = r.data
    total.value = r.total
  })
}

const handleClick = (row: UserList) => {
  console.log('此行是', row)
}

// 添加用户的功能
const addUser = () => {
  // 展开抽屉
  drawer.value = true
  drawerTitle.value = '添加用户数据'
}

// 开启修改
const editUserInfo = (row: UserList) => {
  // 展开抽屉
  drawer.value = true
  drawerTitle.value = '修改用户数据'
  console.log(row)
}
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
