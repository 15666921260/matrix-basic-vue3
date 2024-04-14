<!-- 角色管理 -->
<template>
  <div>
    <el-card style="height: 75px; margin-top: 20px">
      <el-form :inline="true" class="formClass">
        <el-form-item label="角色名:">
          <el-input
            v-model="queryParam.roleName"
            placeholder="请输入角色名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="queryPageRole">
            搜索
          </el-button>
          <el-button type="info" size="default" @click="resetPageRole">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" @click="addRoleButton">添加角色</el-button>
      <el-table
        :data="roleListData"
        height="500"
        style="width: 100%; margin-top: 15px"
      >
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="roleTypeStr" label="角色类型" width="180" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="300">
          <template v-slot="scope">
            <el-button
              type="success"
              size="small"
              icon="User"
              @click="openAuthDialog(scope.row)"
              plain
            >
              授权
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="editRole(scope.row)"
              plain
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteRoleItem(scope.row)"
              plain
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页器  -->
      <el-pagination
        v-model:current-page="queryParam.pageNum"
        v-model:page-size="queryParam.pageSize"
        layout="prev, pager, next"
        :total="totalRoleNum"
      />
    </el-card>
    <el-dialog
      v-model="dialogShow"
      :title="dialogTitle"
      width="400"
      :before-close="dialogShowClose"
    >
      <el-form :model="roleDetail" :rules="rules" ref="fromRef">
        <el-form-item prop="roleName" label="角色名称" label-width="100px">
          <el-input
            v-model="roleDetail.roleName"
            style="width: 240px"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item prop="roleType" label="角色类型:" label-width="100px">
          <el-select
            v-model="roleDetail.roleTypeStr"
            placeholder="请选择角色类型"
            style="width: 240px"
            value-key="id"
            @change="changRoleType"
          >
            <el-option
              v-for="item in roleTypeList"
              :key="item.id"
              :label="item.dicName"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" label-width="100px">
          <el-input
            type="textarea"
            v-model="roleDetail.remarks"
            placeholder="备注"
            maxlength="75"
            :rows="4"
            style="width: 240px"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogShowClose">取 消</el-button>
          <el-button type="primary" @click="confirmDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="authDialogShow"
      :title="dialogTitle"
      width="400"
      :before-close="closeAuthDialog"
    >
      <el-tree
        ref="treeRef"
        style="max-width: 600px"
        :data="baseTreeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="menuCheckedKeys"
        :props="defaultProps"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeAuthDialog">取 消</el-button>
          <el-button type="primary" @click="confirmAuthDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RoleListVo } from '@/pojo/system/role/RoleListVo.ts'
import {
  addOrEditRole,
  deleteRole,
  pageRoleList,
} from '@/api/system/SysRole.ts'
import { PageRoleParam } from '@/pojo/system/role/PageRoleParam.ts'
import { listItemByDictType } from '@/api/system/SysDict.ts'
import { DictListItem } from '@/pojo/system/dict/DictListItem.ts'
import { DictType } from '@/enum/DictType.ts'
import { DictItemResult } from '@/pojo/system/dict/DictItemResult.ts'
import { getBaseTreeData, getMenuCheckedKeys } from '@/api/system/MenuManage.ts'
import { TreeData } from '@/pojo/system/TreeData.ts'
import { ElTree } from 'element-plus'
import { RoleMenu } from '@/pojo/system/role/RoleMenu.ts'

// 列表页数据
let roleListData = ref<RoleListVo[]>()

let totalRoleNum = ref<number>()
// 授权页面展示
let authDialogShow = ref<boolean>(false)

// 树形菜单选择数据集
let baseTreeData = ref<Array<TreeData>>()

// 树形菜单的默认选择数据id的集合
let menuCheckedKeys = ref<Array<number>>()

const treeRef = ref<InstanceType<typeof ElTree>>()

// 初始化角色菜单关联类
let roleMenu = reactive<RoleMenu>({
  menuIds: [],
  roleId: 0,
})

// 查询参数
let queryParam: PageRoleParam = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: '',
})

onMounted(() => {
  queryPageRole()
  selectRoleType()
  // 获取基础树形数据
  getBaseTreeData().then((r) => {
    baseTreeData.value = r.data
  })
})
// 角色类型
let roleTypeList = ref<DictListItem[]>()
const selectRoleType = () => {
  listItemByDictType(DictType.ROLE_TYPE).then((r) => {
    roleTypeList.value = r.data
  })
}

// 分页查询角色
const queryPageRole = () => {
  pageRoleList(queryParam).then((r) => {
    roleListData.value = r.data
    totalRoleNum.value = r.total
  })
}

// 重置查询角色
const resetPageRole = () => {
  queryParam.roleName = ''
  queryPageRole()
}

// 弹窗的显示状态
let dialogShow = ref<boolean>(false)

let roleDetail = reactive<RoleListVo>({
  createTime: '',
  id: 0,
  remarks: '',
  roleName: '',
  roleType: '',
  roleTypeStr: '',
})

// 清空角色详情方法
const cleanRoleDetail = () => {
  roleDetail.roleName = ''
  roleDetail.roleType = ''
  roleDetail.id = 0
  roleDetail.remarks = ''
  roleDetail.createTime = ''
  roleDetail.roleTypeStr = ''
}

// 弹窗标题
let dialogTitle = ref<string>()

// 添加角色按钮
const addRoleButton = () => {
  dialogShow.value = true
  dialogTitle.value = '添加角色'
}

// 关闭弹窗
const dialogShowClose = () => {
  dialogShow.value = false
  cleanRoleDetail()
}

// 校验规则
const rules = {
  roleName: [{ required: true, message: '角色名不能为空', trigger: 'blur' }],
  roleType: [{ required: true, message: '角色类型不能为空', trigger: 'blur' }],
}
const fromRef = ref()
// 确认弹窗
const confirmDialog = () => {
  fromRef.value.validate().then(() => {
    addOrEditRole(roleDetail).then(() => {
      dialogShowClose()
      queryPageRole()
    })
  })
}

// 编辑角色
const editRole = (row: RoleListVo) => {
  roleDetail.roleName = row.roleName
  roleDetail.roleType = row.roleType
  roleDetail.id = row.id
  roleDetail.remarks = row.remarks
  roleDetail.createTime = row.createTime
  roleDetail.roleTypeStr = row.roleTypeStr
  dialogShow.value = true
  dialogTitle.value = '编辑角色'
}

const changRoleType = (item: DictItemResult) => {
  roleDetail.roleType = item.id
  roleDetail.roleTypeStr = item.dicName
}

// 删除指定的角色数据
const deleteRoleItem = (row: RoleListVo) => {
  deleteRole(row).then(() => {
    queryPageRole()
  })
}

/**
 * 打开授权弹窗
 */
const openAuthDialog = (row: RoleListVo) => {
  authDialogShow.value = true
  dialogTitle.value = '菜单授权'
  getMenuCheckedKeys(row.id).then((r) => {
    menuCheckedKeys.value = r.data
    roleMenu.roleId = row.id
  })
}

// 关闭授权弹窗
const closeAuthDialog = () => {
  authDialogShow.value = false
  menuCheckedKeys.value = []
  // 清空角色菜单关联类
  roleMenu.menuIds = []
  roleMenu.roleId = 0
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

/**
 * 确认
 */
const confirmAuthDialog = () => {
  let checkedKeys = treeRef.value!.getCheckedKeys(false)
  for (const checkedKey of checkedKeys) {
    roleMenu.menuIds.push(Number(checkedKey))
  }
  console.log('选中的菜单id集合:', roleMenu.menuIds)
  console.log('选中的角色id:', roleMenu.roleId)
  closeAuthDialog()
}
</script>
<style scoped lang="scss"></style>
