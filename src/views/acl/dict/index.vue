<template>
  <el-row>
    <!-- 左侧数据 -->
    <el-col :span="8" class="leftDictType">
      <el-card class="leftCard" shadow="always">
        <!-- 查询条件模块 -->
        <div class="queryPiece">
          <el-form :inline="true" label-width="auto">
            <el-form-item label="字典类型">
              <el-input
                placeholder="请输入字典类型"
                style="width: 150px"
                maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">搜索</el-button>
              <el-button type="info">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 数据展示模块 -->
        <div class="dataDisplay">
          <div class="dataTest"></div>
        </div>
      </el-card>
    </el-col>
    <!-- 右侧数据 -->
    <el-col :span="16" class="rightDict">
      <el-card class="rightCard" shadow="always"></el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts"></script>
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
}
</style>
