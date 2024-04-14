<template>
  <div>
    <el-row>
      <!-- 左侧数据 -->
      <el-col :span="8" class="leftDictType">
        <el-card class="leftCard" shadow="always">
          <!-- 查询条件模块 -->
          <div class="queryPiece">
            <el-form
              :inline="true"
              label-width="auto"
              :model="queryDictTypeParam"
            >
              <el-form-item label="字典类型">
                <el-input
                  placeholder="请输入字典类型"
                  style="width: 150px"
                  v-model="queryDictTypeParam.typeName"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="small"
                  @click="queryDictType(queryDictTypeParam)"
                >
                  搜索
                </el-button>
                <el-button type="info" size="small" @click="resetDictType">
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 按钮模块 -->
          <div>
            <el-button type="primary" size="small" @click="addDictType()">
              添加字典类型
            </el-button>
          </div>
          <!-- 数据展示模块 -->
          <div class="dataDisplay">
            <el-table
              v-loading="typeTableLoading"
              :data="tableDictType"
              style="width: 100%"
              highlight-current-row
              @row-click="changeDictType"
              row-key="id"
            >
              <el-table-column
                prop="typeName"
                label="字典类型"
                show-overflow-tooltip
              />
              <el-table-column label="操作" width="240">
                <template v-slot="scope">
                  <el-button
                    type="primary"
                    size="small"
                    icon="Edit"
                    @click="dictTypeDetail('edit', scope.row)"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Tickets"
                    @click="dictTypeDetail('detail', scope.row)"
                    plain
                  >
                    详情
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    @click="deleteDictType(scope.row)"
                    plain
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            v-model:current-page="queryDictTypeParam.pageNum"
            v-model:page-size="queryDictTypeParam.pageSize"
            :page-sizes="[10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, total"
            :total="dictTypeTotal"
            @current-change="queryDictType(queryDictTypeParam)"
          />
        </el-card>
      </el-col>
      <!-- 右侧数据 -->
      <el-col :span="16" class="rightDict">
        <el-card class="rightCard" shadow="always">
          <div class="dict-item-button">
            <el-button type="primary" size="small" @click="addDictItem">
              添加字典项
            </el-button>
          </div>
          <div class="dict-table">
            <el-table
              :data="tableDictItem"
              stripe
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column
                prop="dicName"
                label="字典项"
                show-overflow-tooltip
              />
              <el-table-column
                prop="dicValue"
                label="字典值"
                align="center"
                width="100"
              />
              <el-table-column
                prop="sortNum"
                label="排序号"
                align="center"
                width="100"
              />
              <el-table-column
                prop="disable"
                label="是否禁用"
                align="center"
                width="90"
              >
                <template #default="scope">
                  <el-tag
                    :type="scope.row.disable === false ? 'primary' : 'danger'"
                    disable-transitions
                  >
                    {{ scope.row.disable ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="250">
                <template v-slot="scope">
                  <el-button
                    type="primary"
                    size="small"
                    icon="Edit"
                    @click="dictItemDetail('edit', scope.row)"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Tickets"
                    @click="dictItemDetail('detail', scope.row)"
                    plain
                  >
                    详情
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    @click="deleteDictItem(scope.row)"
                    plain
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            v-model:current-page="queryDictItemParam.pageNum"
            v-model:page-size="queryDictItemParam.pageSize"
            :page-sizes="[10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="dictItemTotal"
          />
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加详情修改字典类型弹窗 -->
    <el-dialog
      v-model="dictTypeShow"
      :title="dictTypeTitle"
      width="650"
      :before-close="dictTypeClose"
    >
      <el-form :model="dictTypeVo" :rules="dictTypeRules" ref="dictTypeRef">
        <el-form-item label="类型名:" prop="typeName" label-width="140px">
          <el-input
            v-model="dictTypeVo.typeName"
            placeholder="请输入字典类型名"
            maxlength="30"
            style="width: 400px"
            :readonly="dictTypeReadonly"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="是否需要枚举类" label-width="140px">
          <el-switch
            v-model="dictTypeVo.needEnum"
            active-text="需要"
            inactive-text="不需要"
            :disabled="dictTypeReadonly"
          />
        </el-form-item>
        <el-form-item label="是否禁用" label-width="140px">
          <el-switch
            v-model="dictTypeVo.disable"
            active-text="禁用"
            inactive-text="不禁用"
            :disabled="dictTypeReadonly"
          />
        </el-form-item>
        <el-form-item label="备注:" label-width="140px">
          <el-input
            type="textarea"
            v-model="dictTypeVo.remarks"
            placeholder="备注"
            maxlength="75"
            :rows="4"
            style="width: 400px"
            :readonly="dictTypeReadonly"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dictTypeClose">取 消</el-button>
          <el-button type="primary" @click="confirmDictType">
            {{ !dictTypeReadonly ? '提 交' : '确 定' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加详情修改字典项弹窗 -->
    <el-dialog
      v-model="dictItemShow"
      :title="dictItemTitle"
      width="650"
      :before-close="dictItemClose"
    >
      <el-form :model="dictItemVo" :rules="dictItemRules" ref="dictItemRef">
        <el-form-item label="字典类型:" label-width="140px">
          <el-input
            v-model="dictItemVo.typeName"
            style="width: 400px"
            :readonly="true"
          />
        </el-form-item>
        <el-form-item label="字典名" prop="dicName" label-width="140px">
          <el-input
            v-model="dictItemVo.dicName"
            placeholder="请输入字典名"
            style="width: 400px"
            :readonly="dictItemReadonly"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="字典值" prop="dicValue" label-width="140px">
          <el-input
            v-model="dictItemVo.dicValue"
            placeholder="请输入字典值"
            style="width: 400px"
            :readonly="dictItemReadonly"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="排序字段" label-width="140px">
          <el-input-number
            v-model="dictItemVo.sortNum"
            style="width: 150px"
            :min="1"
            :readonly="dictItemReadonly"
          />
        </el-form-item>
        <el-form-item label="是否禁用" label-width="140px">
          <el-switch
            v-model="dictItemVo.disable"
            active-text="禁用"
            inactive-text="不禁用"
            :disabled="dictItemReadonly"
          />
        </el-form-item>
        <el-form-item label="备注:" label-width="140px">
          <el-input
            type="textarea"
            v-model="dictItemVo.remarks"
            placeholder="备注"
            maxlength="75"
            :rows="4"
            style="width: 400px"
            :readonly="dictItemReadonly"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dictItemClose">取 消</el-button>
          <el-button type="primary" @click="confirmDictItem">
            {{ !dictItemReadonly ? '提 交' : '确 定' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { PageDictTypeParam } from '@/pojo/system/dict/PageDictTypeParam.ts'
import {
  addOrEditDictItem,
  addOrEditDictType,
  deleteDictItemById,
  deleteDictTypeById,
  getDictItemDetail,
  getDictTypeDetail,
  pageDictItem,
  pageDictType,
} from '@/api/system/SysDict.ts'
import { DictType } from '@/pojo/system/dict/DictType.ts'
import { ElMessage, ElMessageBox, FormRules } from 'element-plus'
import { DictItem } from '@/pojo/system/dict/DictItem.ts'
import { PageDictItemParam } from '@/pojo/system/dict/PageDictItemParam.ts'

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 字典类型弹窗显示标识
let dictTypeShow = ref<boolean>(false)
let dictTypeTitle = ref<string>('添加字典类型')
// 字典类型表的加载状态
let typeTableLoading = ref<boolean>(false)
// 字典类型是否读写
let dictTypeReadonly = ref<boolean>(false)
// 字典项表单是否可以读写
let dictItemReadonly = ref<boolean>(false)
// 打开字典类型弹窗
const addDictType = () => {
  dictTypeShow.value = true
  dictTypeTitle.value = '添加字典类型'
}
// 关闭字典类型弹窗
const dictTypeClose = () => {
  dictTypeShow.value = false
  cleanDictTypeData()
  dictTypeReadonly.value = false
}
const queryDictTypeParam: PageDictTypeParam = reactive({
  pageSize: 10,
  pageNum: 1,
  typeName: '',
})
let tableDictType = ref<DictType[]>()
let dictTypeTotal = ref<number>()
// 查询字典类型
const queryDictType = (query: PageDictTypeParam) => {
  typeTableLoading.value = true
  pageDictType(query).then((r) => {
    tableDictType.value = r.data
    dictTypeTotal.value = r.total
    typeTableLoading.value = false
  })
}

const resetDictType = () => {
  queryDictTypeParam.typeName = ''
  queryDictType(queryDictTypeParam)
}
// 字典类型详情展示类
let dictTypeVo = ref<DictType>({
  typeName: '',
  needEnum: false,
  remarks: '',
  disable: false,
})

// 清空字典类型数据
const cleanDictTypeData = () => {
  dictTypeVo.value = {
    id: undefined,
    typeName: '',
    needEnum: false,
    remarks: '',
    disable: false,
  }
}

// 获取表单el组件
let dictTypeRef = ref()
// 确认提交字典类型
const confirmDictType = () => {
  if (!dictTypeReadonly.value) {
    // 先校验
    dictTypeRef.value.validate().then(() => {
      addOrEditDictType(dictTypeVo.value).then((r) => {
        if (r.code == 200) {
          dictTypeClose()
          ElMessage({
            message: '操作成功',
            type: 'success',
          })
          // 设置字典项数据为空
          tableDictItem.value = []
          queryDictType(queryDictTypeParam)
        } else {
          ElMessage.error(r.message)
        }
      })
    })
  } else {
    dictTypeClose()
  }
}
// 字典项初始化
let dictItemVo = ref<DictItem>({
  typeName: '',
  type: undefined,
  dicName: '',
  dicValue: '',
  sortNum: 1,
  remarks: '',
  disable: false,
})
// 清空字典项数据
const cleanDictItemData = () => {
  dictItemVo.value = {
    id: undefined,
    typeName: '',
    type: undefined,
    dicName: '',
    dicValue: '',
    sortNum: 1,
    remarks: '',
    disable: false,
  }
}
// 字典项列表数据
let tableDictItem = ref<DictItem[]>()
// 字典项总数据
let dictItemTotal = ref<number>(0)
let queryDictItemParam: PageDictItemParam = reactive({
  pageSize: 10,
  pageNum: 1,
  typeId: 0,
})
// 字典项表的加载状态
let itemTableLoading = ref<boolean>(false)
// 存储选中字典类型的id和类型名
let changeTypeId: number | undefined = undefined
let changeTypeName: string = ''
// 选中某个字典类型后做如下动作
const changeDictType = (row: DictType) => {
  // 记录选中的字典类型id
  if (row.id != null) {
    changeTypeId = row.id
    changeTypeName = row.typeName
    queryDictItemParam.typeId = row.id
    dictItemVo.value.type = row.id
    dictItemVo.value.typeName = row.typeName
  }
  // 查询对应的字典项数据
  queryDictItem()
}

const queryDictItem = () => {
  itemTableLoading.value = true
  pageDictItem(queryDictItemParam).then((r) => {
    tableDictItem.value = r.data
    dictItemTotal.value = r.total
    itemTableLoading.value = false
  })
}

// 编辑或者详情
const dictTypeDetail = (type: string, param: DictType) => {
  getDictTypeDetail(String(param.id)).then((r) => {
    dictTypeVo.value = r.data
    if (type == 'edit') {
      dictTypeTitle.value = '编辑字典类型'
    } else if (type == 'detail') {
      dictTypeTitle.value = '字典类型详情'
      dictTypeReadonly.value = true
    }
    dictTypeShow.value = true
  })
}

onMounted(() => {
  queryDictType(queryDictTypeParam)
})

// 删除字典类型的操作
const deleteDictType = (row: DictType) => {
  ElMessageBox.confirm('确定删除该字典类型？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (row.id != null) {
        deleteDictTypeById(row.id).then(() => {
          queryDictType(queryDictTypeParam)
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          tableDictItem.value = []
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

// 表单校验
const dictTypeRules = reactive<FormRules<DictType>>({
  typeName: [
    { required: true, message: '字典类型名不能为空', trigger: 'blur' },
  ],
})

// 字典项显示弹窗字段
let dictItemShow = ref<boolean>(false)
// 字典项显示标题
let dictItemTitle = ref<string>('')
// 添加字典项弹窗
const addDictItem = () => {
  if (changeTypeId && changeTypeName != '') {
    queryDictItemParam.typeId = changeTypeId
    dictItemVo.value.type = changeTypeId
    dictItemVo.value.typeName = changeTypeName
    dictItemShow.value = true
    dictItemTitle.value = '添加字典项'
  } else {
    ElMessage.error('请在左侧点击选择一个字典类型')
  }
}
// 关闭字典项弹窗
const dictItemClose = () => {
  dictItemShow.value = false
  cleanDictItemData()
  dictItemReadonly.value = false
}

// 字典项表单校验
const dictItemRules = reactive<FormRules<DictItem>>({
  dicName: [{ required: true, message: '字典名不能为空', trigger: 'blur' }],
  dicValue: [{ required: true, message: '字典值不能为空', trigger: 'blur' }],
})

// 获取表单el组件
let dictItemRef = ref()

const confirmDictItem = () => {
  if (!dictItemReadonly.value) {
    console.log('确认时的数据为：', dictItemVo.value)
    // 先校验
    dictItemRef.value.validate().then(() => {
      addOrEditDictItem(dictItemVo.value).then((r) => {
        if (r.code == 200) {
          dictItemClose()
          ElMessage({
            message: r.message,
            type: 'success',
          })
          queryDictItem()
        } else {
          ElMessage.error(r.message)
        }
      })
    })
  } else {
    dictItemClose()
  }
}

//
const dictItemDetail = (type: string, param: DictItem) => {
  if (param.id != null) {
    getDictItemDetail(param.id).then((r) => {
      dictItemVo.value = r.data
      if (type == 'edit') {
        dictItemTitle.value = '编辑字典项'
      } else if (type == 'detail') {
        dictItemTitle.value = '字典项详情'
        dictItemReadonly.value = true
      }
      dictItemShow.value = true
    })
  } else {
    ElMessage.error('当前行字典项id为空')
  }
}

const deleteDictItem = (row: DictItem) => {
  ElMessageBox.confirm('确定删除该字典类型？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (row.id != null) {
        deleteDictItemById(row.id).then(() => {
          queryDictItem()
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
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
.leftDictType {
  width: 100%;
  height: 600px;
  .leftCard {
    width: 95%;

    .queryPiece {
      height: 50px;
      // 一左一右
      justify-content: space-between;
      // 上下居中
      align-items: center;
    }
  }

  .dataDisplay {
    height: 70vh;
    // 添加滚动条
    overflow: auto;

    .dataTest {
      background-color: gold;
      width: 100%;
      height: 50px;
    }
  }
}

.rightDict {
  width: 100%;
  height: 500px;

  .rightCard {
    .dict-table {
      height: 70vh;
    }
    .dict-item-button {
      margin-top: 5.5vh;
    }
  }
}
</style>
