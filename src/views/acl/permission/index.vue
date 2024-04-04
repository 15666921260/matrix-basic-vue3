<!-- 菜单管理 -->
<template>
  <el-card>
    <el-button type="primary" size="default" style="margin-bottom: 15px">
      添加
    </el-button>
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{ hasChildren: 'isChild' }"
    >
      <el-table-column prop="title" label="菜单名称" highlight-current-row />
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
        width="200"
        highlight-current-row
      />
      <el-table-column
        prop="componentPath"
        label="组件路径"
        width="250"
        highlight-current-row
      />
      <el-table-column prop="sort" align="center" label="排序" width="80" />
      <el-table-column label="操作" align="center" width="250">
        <template v-slot="scope">
          <el-button type="success" size="small" icon="Plus" plain>
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
</template>
<script setup lang="ts">
import { getMenuListVoByParentId } from '@/api/system/MenuManage.ts'
import { onMounted, ref } from 'vue'
import { SysMenuListVo } from '@/pojo/system/enum/SysMenuListVo.ts'
import { MenuType } from '@/enum/MenuType.ts'

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
</script>
<style scoped lang="scss"></style>
