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
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="queryDictType(queryDictTypeParam)"
                >
                  搜索
                </el-button>
                <el-button type="info">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 按钮模块 -->
          <div>
            <el-button type="primary" @click="addDictType('add')">
              添加字典类型
            </el-button>
          </div>
          <!-- 数据展示模块 -->
          <div class="dataDisplay">
            <el-table :data="tableDictType" style="width: 100%">
              <el-table-column
                prop="typeName"
                label="字典类型"
                width="200"
                show-overflow-tooltip
              />
              <el-table-column label="操作">
                <template #default>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Edit"
                    @click="addDictType('edit')"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Tickets"
                    @click="addDictType('detail')"
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
          </div>
          <el-pagination
            v-model:current-page="queryDictTypeParam.pageNum"
            v-model:page-size="queryDictTypeParam.pageSize"
            :page-sizes="[10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next"
            :total="dictTypeTotal"
          />
        </el-card>
      </el-col>
      <!-- 右侧数据 -->
      <el-col :span="16" class="rightDict">
        <el-card class="rightCard" shadow="always">
          <div class="dict-item-button">
            <el-button type="primary" @click="addDictType('add')">
              添加字典项
            </el-button>
          </div>
          <div class="dict-table">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column
                prop="date"
                label="字典项"
                show-overflow-tooltip
              />
              <el-table-column
                prop="name"
                label="字典值"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="排序号"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="是否禁用"
                align="center"
                width="80"
              />
              <el-table-column label="操作" width="250">
                <template #default>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Edit"
                    @click="addDictType('edit')"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Tickets"
                    @click="addDictType('detail')"
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
          </div>
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="400"
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
      <el-form :model="dictTypeVo" :rules="rules" ref="dictTypeRef">
        <el-form-item label="类型名:" prop="typeName" label-width="140px">
          <el-input
            v-model="dictTypeVo.typeName"
            placeholder="请输入字典类型名"
            maxlength="30"
            style="width: 400px"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="是否需要枚举类" label-width="140px">
          <el-switch
            v-model="dictTypeVo.needEnum"
            active-text="需要"
            inactive-text="不需要"
          />
        </el-form-item>
        <el-form-item label="是否禁用" label-width="140px">
          <el-switch
            v-model="dictTypeVo.disable"
            active-text="禁用"
            inactive-text="不禁用"
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
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dictTypeClose">取 消</el-button>
          <el-button type="primary" @click="confirmDictType">提 交</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加详情修改字典项弹窗 -->
    <el-dialog v-model="dictItemShow" :title="dictTypeTitle" width="500">
      <el-form :model="form">
        <el-form-item label="Promotion name" label-width="140px">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" label-width="140px">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dictTypeClose">Cancel</el-button>
          <el-button type="primary" @click="dictTypeClose">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PageDictTypeParam } from '@/pojo/system/dict/PageDictTypeParam.ts'
import { addOrEditDictType, pageDictType } from '@/api/system/SysDict.ts'
import { DictType } from '@/pojo/system/dict/DictType.ts'
import { ElMessage, FormRules } from 'element-plus'

const currentPage4 = ref(4)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. ',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No.',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. ',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. ',
  },
]
// 字典类型弹窗显示标识
let dictTypeShow = ref(false)
let dictTypeTitle = ref('添加字典类型')
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
// 打开字典类型弹窗
const addDictType = (clickType: string) => {
  dictTypeShow.value = true
  if (clickType == 'add') {
    dictTypeTitle.value = '添加字典类型'
  } else if (clickType == 'edit') {
    dictTypeTitle.value = '编辑字典类型'
  } else if (clickType == 'detail') {
    dictTypeTitle.value = '字典类型详情'
  }
}
// 关闭字典类型弹窗
const dictTypeClose = () => {
  dictTypeShow.value = false
  cleanDictTypeData()
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
  pageDictType(query).then((r) => {
    tableDictType.value = r.data
    dictTypeTotal.value = r.total
  })
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
  // 先校验
  dictTypeRef.value.validate().then(() => {
    addOrEditDictType(dictTypeVo.value).then((r) => {
      if (r.code == 200) {
        cleanDictTypeData()
        dictTypeClose()
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      } else {
        ElMessage.error('添加失败')
      }
    })
  })
}

// 表单校验
const rules = reactive<FormRules<DictType>>({
  typeName: [
    { required: true, message: '字典类型名不能为空', trigger: 'blur' },
  ],
})

const dictItemShow = ref<boolean>(false)
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
