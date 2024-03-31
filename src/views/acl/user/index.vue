<!-- 用户管理 -->
<template>
  <div>
    <el-card style="height: 75px">
      <el-form :inline="true" class="formClass">
        <el-form-item label="用户名:">
          <el-input
            v-model="quseryParam.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="pageUserList">
            搜索
          </el-button>
          <el-button type="info" size="default" @click="resetQuery">
            重置
          </el-button>
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
              @click="editOrDetailUser('edit', scope.row)"
              plain
            >
              修改信息
            </el-button>
            <el-button
              type="success"
              size="small"
              icon="Edit"
              @click="editOrDetailUser('detail', scope.row)"
              plain
            >
              详情
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
    <el-dialog
      v-model="userDialogShow"
      :title="userDialogTitle"
      width="650"
      :before-close="userDialogClose"
    >
      <!-- 不指定 :model 校验时报错 -->
      <el-form
        label-width="auto"
        :inline="true"
        :model="userVoData"
        :rules="rules"
        ref="fromRef"
      >
        <el-form-item prop="username" label="用户名:" label-width="100px">
          <el-input
            v-model="userVoData.username"
            placeholder="请输入用户名"
            style="width: 180px"
            :readonly="userReadonly"
            maxlength="12"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称:">
          <el-input
            v-model="userVoData.nickName"
            placeholder="请输入用户昵称"
            style="width: 180px"
            :readonly="userReadonly"
            maxlength="12"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" label-width="100px">
          <el-input
            v-model="userVoData.realName"
            placeholder="请输入真实姓名"
            style="width: 180px"
            :readonly="userReadonly"
            maxlength="12"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="password" label="用户密码:" label-width="100px">
          <el-input
            v-model="userVoData.password"
            type="password"
            placeholder="请输入用户密码"
            style="width: 180px"
            show-password
            :readonly="userReadonly"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码:">
          <el-input
            v-model="userVoData.confirmPassword"
            type="password"
            placeholder="请输入用户确认密码"
            style="width: 180px"
            :readonly="userReadonly"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号:" label-width="100px">
          <el-input
            v-model="userVoData.phone"
            placeholder="请输入用户手机号"
            :readonly="userReadonly"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userType" label="用户类型:">
          <el-select
            v-model="userVoData.userType"
            placeholder="请选择用户类型"
            style="width: 180px"
            value-key="id"
            @change="chengeUserType"
            :disabled="userReadonly"
          >
            <el-option
              v-for="item in userTypeList"
              :key="item.id"
              :label="item.dicName"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" label-width="100px">
          <el-input
            type="textarea"
            v-model="userVoData.remarks"
            :readonly="userReadonly"
            placeholder="备注"
            maxlength="75"
            :rows="4"
            style="width: 400px"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="userDialogClose">取 消</el-button>
          <el-button type="primary" @click="addOrEditUser">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { UserList } from '@/pojo/system/user/UserList.ts'
import {
  addUserData,
  editUserData,
  getUserDetailById,
  queryUserList,
} from '@/api/user'
import { QueryUserParam } from '@/pojo/system/user/QueryUserParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'
import { listItemByDictType } from '@/api/system/SysDict.ts'
import { DictUser } from '@/enum/DictUser.ts'
import { DictListItem } from '@/pojo/system/dict/DictListItem.ts'
import { UserDetail } from '@/pojo/system/user/UserDetail.ts'
import { DictItemResult } from '@/pojo/system/dict/DictItemResult.ts'

let userTypeList = ref<DictListItem[]>()
let tableData = ref<UserList[]>()
// 默认页码
let pageNum = ref<number>(1)
// 默认每页个数
let pageSize = ref<number>(10)
let total = ref<number>()
// 定义响应式数据控制弹窗的显示与隐藏
let userDialogShow = ref<boolean>(false)
// 弹窗标题
let userDialogTitle = ref<string>('添加用户数据')
// 是否只读
let userReadonly = ref<boolean>(false)

let userVoData: UserDetail = reactive({
  confirmPassword: '',
  password: '',
  userTypeId: '',
  username: '',
  // 真实姓名
  realName: '',
  // 用户类型
  userType: '',
  // 电话号
  phone: '',
  // 用户昵称
  nickName: '',
  id: '',
  remarks: '',
})
onMounted(() => {
  pageUserList()
  selectUserType()
})

const chengeUserType = (item: DictItemResult) => {
  console.log('选中的数据', JSON.stringify(item))
  userVoData.userType = item.dicName
  userVoData.userTypeId = item.id
}

const selectUserType = () => {
  listItemByDictType(DictUser.USER_TYPE).then((r) => {
    userTypeList.value = r.data
  })
}

let quseryParam: QueryUserParam = reactive({
  username: '',
  pageNum: 1,
  pageSize: 10,
})

const pageUserList = () => {
  quseryParam.pageSize = pageSize.value
  quseryParam.pageNum = pageNum.value
  queryUserList(quseryParam).then((r: PageResponse<UserList>) => {
    tableData.value = r.data
    total.value = r.total
  })
}

/**
 * 重置查询条件
 */
const resetQuery = () => {
  quseryParam.username = ''
  pageUserList()
}

const handleClick = (row: UserList) => {
  console.log('此行是', row)
}

// 添加用户的功能
const addUser = () => {
  // 展开抽屉
  userDialogShow.value = true
  userDialogTitle.value = '添加用户数据'
}

// 开启修改
const editOrDetailUser = (type: string, row: UserList) => {
  // 展开抽屉
  userDialogShow.value = true
  if (type === 'edit') {
    userDialogTitle.value = '修改用户数据'
    userReadonly.value = false
  } else {
    userDialogTitle.value = '用户数据详情'
    userReadonly.value = true
  }
  getUserDetailById(row).then((r) => {
    userVoData.id = r.data.id
    userVoData.userType = r.data.userType
    userVoData.username = r.data.username
    userVoData.nickName = r.data.nickName
    userVoData.realName = r.data.realName
    userVoData.phone = r.data.phone
    userVoData.remarks = r.data.remarks
  })
}

/**
 * 清理表单数据
 * 注意看清理方式，如果直接采用等值 对象的方式可能导致校验时bug导致无法输入数据
 */
const cleanFromData = () => {
  userVoData.confirmPassword = ''
  userVoData.password = ''
  userVoData.userTypeId = ''
  userVoData.userType = ''
  userVoData.username = ''
  userVoData.realName = ''
  userVoData.phone = ''
  userVoData.nickName = ''
  userVoData.id = ''
  userVoData.remarks = ''
}

// 关闭用户弹窗
const userDialogClose = () => {
  userDialogShow.value = false
  cleanFromData()
  userReadonly.value = false
}

/**
 * 确认密码判断
 * @param rule
 * @param value
 * @param callback
 */
const validatorConfirmPassword = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  rule: any,
  value: any,
  callback: any,
) => {
  if (value == userVoData.password) {
    callback()
  } else {
    callback(new Error('与密码不一致'))
  }
}

const validatorUsername = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  rule: any,
  value: string,
  callback: any,
) => {
  const regExp: RegExp = /^[A-Za-z0-9]+$/
  if (regExp.test(value)) {
    if (value.length >= 5) {
      callback()
    } else {
      callback(new Error('用户名过短'))
    }
  } else {
    callback(new Error('用户名只能是字母或数字的组合'))
  }
}

const validatorPhone = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  rule: any,
  value: string,
  callback: any,
) => {
  const regExp: RegExp =
    /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  if (regExp.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号'))
  }
}

const rules = {
  confirmPassword: [{ trigger: 'blur', validator: validatorConfirmPassword }],
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { trigger: 'blur', validator: validatorUsername },
  ],
  userType: [{ required: true, message: '用户类型不能为空', trigger: 'blur' }],
  phone: [{ trigger: 'blur', validator: validatorPhone }],
}

const fromRef = ref()

const addOrEditUser = async () => {
  // 此行校验表单，防止数据为校验通过但起作用
  await fromRef.value.validate()
  if (userVoData.id) {
    if (userReadonly.value) {
      userDialogClose()
    } else {
      editUserData(userVoData).then((r) => {
        if (r.data === 'success') {
          ElMessage.success('修改成功!')
          userDialogClose()
          pageUserList()
        } else {
          ElMessage.error(r.data)
        }
      })
    }
  } else {
    addUserData(userVoData).then((r) => {
      if (r.data === 'success') {
        ElMessage.success('添加成功!')
        userDialogClose()
        pageUserList()
      } else {
        ElMessage.error(r.data)
      }
    })
  }
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
