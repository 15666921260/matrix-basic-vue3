<!-- 菜单管理 -->
<template>
  <el-card>
    <el-button
      type="primary"
      size="default"
      style="margin-bottom: 15px"
      @click="openEnumDialog"
    >
      添加
    </el-button>
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      ref="menuTableTreeRef"
      size="small"
      :tree-props="{ hasChildren: 'isChild' }"
    >
      <el-table-column
        prop="title"
        label="菜单名称"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="type" label="菜单类型" align="center" width="80">
        <template #default="scope">
          <el-tag :type="setMenuTypeStyle(scope.row)" disable-transitions>
            {{ scope.row.typeStr }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否禁用" align="center" width="80">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === false ? 'danger' : 'primary'"
            disable-transitions
          >
            {{ scope.row.status ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="hidden"
        label="是否显示在菜单栏"
        align="center"
        width="80"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.hidden === false ? 'primary' : 'danger'"
            disable-transitions
          >
            {{ scope.row.hidden ? '否' : '是' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="routeUrl"
        label="前端路由地址"
        min-width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="componentPath"
        label="组件路径"
        min-width="150"
        show-overflow-tooltip
      />
      <el-table-column prop="sort" align="center" label="排序" width="80" />
      <el-table-column
        prop="updateTime"
        align="center"
        label="更新时间"
        width="180"
      />
      <el-table-column label="操作" align="center" width="260">
        <template v-slot="scope">
          <el-button
            type="success"
            size="small"
            icon="Plus"
            @click="addItemMenu(scope.row)"
            plain
          >
            添加
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editMenuDetail(scope.row)"
            plain
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="deleteMenuItem(scope.row)"
            plain
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="menuDialogShow"
    :title="menuDialogTitle"
    width="800"
    :before-close="enumDialogClose"
  >
    <el-form
      :model="menuDetail"
      :inline="true"
      :rules="menuRules"
      ref="menuRef"
      size="small"
    >
      <el-form-item label="菜单名称" prop="title" label-width="120px">
        <el-input
          v-model="menuDetail.title"
          placeholder="请输入菜单名称"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item prop="type" label="菜单类型" label-width="120px">
        <el-select
          v-model="menuDetail.typeStr"
          placeholder="请选择菜单类型"
          style="width: 200px"
          value-key="id"
          @change="changMenuType"
        >
          <el-option
            v-for="item in menuTypeList"
            :key="item.id"
            :label="item.dicName"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="父组件" prop="patentId" label-width="120px">
        <el-tree-select
          v-model="menuDetail.parentId"
          :data="menuTreeSelect"
          style="width: 200px"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="菜单编码" prop="code" label-width="120px">
        <el-input
          v-model="menuDetail.code"
          placeholder="请输入编码"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item prop="roleType" label="菜单图标:" label-width="120px">
        <el-select
          v-model="menuDetail.icon"
          placeholder="请选择菜单图标"
          style="width: 200px"
          filterable
        >
          <el-option
            v-for="item in optionalIconList"
            :key="item"
            :label="item"
            :value="item"
          >
            <div class="icon-item">
              <el-icon style="position: relative; top: 2px">
                <component :is="item"></component>
              </el-icon>
              <span>&nbsp;{{ item }}</span>
            </div>
          </el-option>
          <template #prefix>
            <el-icon>
              <component :is="menuDetail.icon"></component>
            </el-icon>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用" label-width="120px">
        <el-switch
          v-model="menuDetail.status"
          active-text="启用"
          inactive-text="禁用"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="是否显示" label-width="120px">
        <el-switch
          v-model="menuDetail.hidden"
          active-text="否"
          inactive-text="是"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="排序字段" label-width="120px">
        <el-input-number
          v-model="menuDetail.sort"
          style="width: 200px"
          :min="1"
        />
      </el-form-item>
      <el-form-item
        v-if="menuDetail.type === 2"
        label="前端路由地址"
        label-width="120px"
      >
        <el-input
          v-model="menuDetail.routeUrl"
          placeholder="请输入前端路由地址"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item
        v-if="menuDetail.type === 2"
        label="重定向路由地址"
        label-width="120px"
      >
        <el-input
          v-model="menuDetail.routeRedirect"
          placeholder="请输入重定向路由地址"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item
        v-if="menuDetail.type === 2"
        label="组件位置路径"
        label-width="120px"
      >
        <el-input
          v-model="menuDetail.componentPath"
          placeholder="请输入组件位置路径"
          style="width: 350px"
        />
      </el-form-item>
      <el-form-item label="备注:" label-width="120px">
        <el-input
          type="textarea"
          v-model="menuDetail.remarks"
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
        <el-button @click="enumDialogClose">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  andOrEditMenu,
  deleteMenuById,
  detailById,
  getAllMenuListVo,
  queryMenuTreeSelect,
} from '@/api/system/MenuManage.ts'
import { onMounted, reactive, ref } from 'vue'
import { SysMenuListVo } from '@/pojo/system/enum/SysMenuListVo.ts'
import { MenuType } from '@/enum/MenuType.ts'
import { SysMenuDetail } from '@/pojo/system/enum/SysMenuDetail.ts'
import { listItemByDictType } from '@/api/system/SysDict.ts'
import { DictType } from '@/enum/DictType.ts'
import { DictListItem } from '@/pojo/system/dict/DictListItem.ts'
import optionalIconList from '@/utils/optionalIconList.ts'
import { ElMessage, ElMessageBox, FormRules } from 'element-plus'
import { MenuTreeSelect } from '@/pojo/system/enum/MenuTreeSelect.ts'

// 菜单编辑添加弹窗是否显示
let menuDialogShow = ref<boolean>(false)
// 菜单弹窗标题
let menuDialogTitle = ref<string>()
// 弹窗详情
let menuDetail = reactive<SysMenuDetail>({
  parentStr: '',
  id: null,
  parentId: 0,
  // 菜单名
  title: '',
  // 状态,是否禁用 true 启用
  status: true,
  // 菜单编码
  code: '',
  // 菜单图标
  icon: '',
  // 前端路由地址
  routeUrl: '',
  // 重定向路由地址
  routeRedirect: null,
  // 组件位置路径
  componentPath: '',
  // 是否显示 false是显示
  hidden: false,
  remarks: '',
  sort: 1,
  type: 1,
  typeStr: '目录',
})
// 菜单类型
let menuTypeList = ref<DictListItem[]>()
let menuList = ref<SysMenuListVo[]>()

// 树形可选项
let menuTreeSelect = ref<MenuTreeSelect[]>()
const getMenuListVo = () => {
  getAllMenuListVo().then((r) => {
    menuList.value = r.data
  })
}

onMounted(() => {
  getMenuListVo()
  selectMenuType()
  getMenuTreeSelect()
})

const getMenuTreeSelect = () => {
  queryMenuTreeSelect().then((r) => {
    menuTreeSelect.value = r.data
  })
}

// 清空详情数据
const cleanMenuDetail = () => {
  menuDetail.id = null
  menuDetail.parentId = 0
  menuDetail.parentStr = ''
  menuDetail.title = ''
  menuDetail.status = true
  menuDetail.code = ''
  menuDetail.icon = ''
  menuDetail.routeUrl = ''
  menuDetail.routeRedirect = null
  menuDetail.componentPath = ''
  menuDetail.hidden = false
  menuDetail.remarks = ''
  menuDetail.sort = 1
  menuDetail.type = 1
  menuDetail.typeStr = '目录'
}

/**
 * 提交权限。权限提示，如果是菜单不建议前端路由和组件路径为空，如果是权限不建议编码为空
 */
const menuRules = reactive<FormRules<SysMenuDetail>>({
  title: [{ required: true, message: '名不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
})

/**
 * 判断菜单类型样式
 * @param row
 */
const setMenuTypeStyle = (row: SysMenuListVo) => {
  if (MenuType.DIRECTORY === row.type) {
    return 'primary'
  } else if (MenuType.MENU === row.type) {
    return 'success'
  } else {
    return 'info'
  }
}

// 父级添加菜单弹窗
const openEnumDialog = () => {
  menuDialogShow.value = true
  menuDialogTitle.value = '添加菜单'
  // 设置父节点
  menuDetail.parentId = 0
  menuDetail.parentStr = '根节点'
}

// 菜单弹窗关闭前执行的函数
const enumDialogClose = () => {
  menuDialogShow.value = false
  cleanMenuDetail()
}

// 菜单项上添加菜单弹窗
const addItemMenu = (row: SysMenuListVo) => {
  console.log(JSON.stringify(row))
  menuDialogShow.value = true
  menuDialogTitle.value = '添加菜单'
  // 设置父节点
  menuDetail.parentId = row.id
  menuDetail.parentStr = row.title
}

const selectMenuType = () => {
  listItemByDictType(DictType.MENU_TYPE).then((r) => {
    menuTypeList.value = r.data
  })
}

const changMenuType = (item: DictListItem) => {
  menuDetail.typeStr = item.dicName
  menuDetail.type = Number(item.dicValue)
}

// 获取表单el组件
let menuRef = ref()

const confirmSubmit = () => {
  // 先校验
  menuRef.value.validate().then(() => {
    andOrEditMenu(menuDetail).then(() => {
      enumDialogClose()
      cleanMenuDetail()
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
      getMenuListVo()
    })
  })
}

/**
 * 编辑
 */
const editMenuDetail = (row: SysMenuListVo) => {
  detailById(row.id).then((r) => {
    menuDialogShow.value = true
    menuDialogTitle.value = '编辑菜单'
    menuDetail.id = r.data.id
    menuDetail.parentId = r.data.parentId
    menuDetail.title = r.data.title
    menuDetail.status = r.data.status
    menuDetail.code = r.data.code
    menuDetail.icon = r.data.icon
    menuDetail.routeUrl = r.data.routeUrl
    menuDetail.routeRedirect = r.data.routeRedirect
    menuDetail.componentPath = r.data.componentPath
    menuDetail.hidden = r.data.hidden
    menuDetail.remarks = r.data.remarks
    menuDetail.sort = r.data.sort
    menuDetail.type = r.data.type
    menuDetail.typeStr = r.data.typeStr
  })
}

// 删除菜单项
const deleteMenuItem = (row: SysMenuListVo) => {
  ElMessageBox.confirm('确定进行删除？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (row.id != null) {
        deleteMenuById(row.id).then(() => {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          getMenuListVo()
        })
      } else {
        ElMessage({
          message: '所选数据发生错误，缺少id字段',
          type: 'error',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已经取消',
      })
    })
}
</script>
<style scoped lang="scss">
.icon-item {
  el-icon {
    margin-top: 2px;
    margin-right: 5px;
  }
}
</style>
