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
        <el-table-column prop="date" label="角色名称" width="180" />
        <el-table-column prop="name" label="角色类型" width="180" />
        <el-table-column prop="date" label="创建时间" width="180" />
        <el-table-column prop="date" label="备注" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="300">
          <template v-slot="scope">
            <el-button type="success" size="small" icon="User" plain>
              授权
            </el-button>
            <el-button type="warning" size="small" icon="Edit" plain>
              编辑
            </el-button>
            <el-button type="danger" size="small" icon="Delete" plain>
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
      width="500"
      :before-close="dialogShowClose"
    >
      <el-form :model="roleDetail">
        <el-form-item label="Promotion name" label-width="100px">
          <el-input v-model="roleDetail.roleName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="roleType" label="角色类型:">
          <el-select
            v-model="roleDetail.roleType"
            placeholder="请选择用户类型"
            style="width: 180px"
            value-key="id"
          >
            <el-option
              v-for="item in roleTypeList"
              :key="item.id"
              :label="item.dicName"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogShowClose">Cancel</el-button>
          <el-button type="primary" @click="dialogShowClose">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RoleListVo } from '@/pojo/system/role/RoleListVo.ts'
import { pageRoleList } from '@/api/system/SysRole.ts'
import { PageRoleParam } from '@/pojo/system/role/PageRoleParam.ts'
import { listItemByDictType } from '@/api/system/SysDict.ts'
import { DictListItem } from '@/pojo/system/dict/DictListItem.ts'
import { DictType } from '@/enum/DictType.ts'

// 列表页数据
let roleListData = ref<RoleListVo[]>()

let totalRoleNum = ref<number>()

// 查询参数
let queryParam: PageRoleParam = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: '',
})

onMounted(() => {
  queryPageRole()
  selectRoleType()
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
  id: '',
  remarks: '',
  roleName: '',
  roleType: '',
})

// 清空角色详情方法
const cleanRoleDetail = () => {
  roleDetail.roleName = ''
  roleDetail.roleType = ''
  roleDetail.id = ''
  roleDetail.remarks = ''
  roleDetail.createTime = ''
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
</script>
<style scoped lang="scss"></style>
