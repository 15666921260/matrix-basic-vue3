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
      lazy
      size="small"
      :load="load"
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
      <el-table-column label="操作" align="center" width="250">
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
          <el-button type="primary" size="small" icon="Edit" plain>
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="Delete" plain>
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
    <el-form :model="menuDetail" :inline="true">
      <el-form-item label="菜单名称" label-width="120px">
        <el-input
          v-model="menuDetail.title"
          placeholder="请输入菜单名称"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item prop="roleType" label="角色类型:" label-width="120px">
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
      <el-form-item label="菜单编码" label-width="120px">
        <el-input
          v-model="menuDetail.code"
          placeholder="请输入菜单编码"
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
          active-text="是"
          inactive-text="否"
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
      <el-form-item label="前端路由地址" label-width="120px">
        <el-input
          v-model="menuDetail.routeUrl"
          placeholder="请输入前端路由地址"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="重定向路由地址" label-width="120px">
        <el-input
          v-model="menuDetail.routeRedirect"
          placeholder="请输入重定向路由地址"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="组件位置路径" label-width="120px">
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
        <el-button type="primary" @click="enumDialogClose">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { getMenuListVoByParentId } from '@/api/system/MenuManage.ts'
import { onMounted, reactive, ref } from 'vue'
import { SysMenuListVo } from '@/pojo/system/enum/SysMenuListVo.ts'
import { MenuType } from '@/enum/MenuType.ts'
import { SysMenuDetail } from '@/pojo/system/enum/SysMenuDetail.ts'
import { listItemByDictType } from '@/api/system/SysDict.ts'
import { DictType } from '@/enum/DictType.ts'
import { DictListItem } from '@/pojo/system/dict/DictListItem.ts'
import optionalIconList from '@/utils/optionalIconList.ts'

// 菜单编辑添加弹窗是否显示
let menuDialogShow = ref<boolean>(false)
// 菜单弹窗标题
let menuDialogTitle = ref<string>()
// 弹窗详情
let menuDetail = reactive<SysMenuDetail>({
  id: null,
  // 菜单名
  title: '',
  // 状态,是否禁用
  status: false,
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
  // 是否显示
  hidden: true,
  remarks: '',
  sort: 1,
  type: null,
  typeStr: '',
})
// 菜单类型
let menuTypeList = ref<DictListItem[]>()

const load = async (
  row: SysMenuListVo,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  treeNode: unknown,
  resolve: (date: SysMenuListVo[]) => void,
) => {
  let menuLists = await getMenuListVoByParentId(row.id)
  resolve(menuLists.data)
}
let menuList = ref<SysMenuListVo[]>()
const getMenuListVo = (parentId: number) => {
  getMenuListVoByParentId(parentId).then((r) => {
    menuList.value = r.data
  })
}

onMounted(() => {
  getMenuListVo(0)
  selectMenuType()
})

// 清空详情数据
const cleanMenuDetail = () => {
  menuDetail.id = null
  menuDetail.title = ''
  menuDetail.status = false
  menuDetail.code = ''
  menuDetail.icon = ''
  menuDetail.routeUrl = ''
  menuDetail.routeRedirect = null
  menuDetail.componentPath = ''
  menuDetail.hidden = true
  menuDetail.remarks = ''
  menuDetail.sort = 1
  menuDetail.type = null
  menuDetail.typeStr = ''
}

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
</script>
<style scoped lang="scss">
.icon-item {
  el-icon {
    margin-top: 2px;
    margin-right: 5px;
  }

  span {
    font-family: ARIAL;
  }
}
</style>
