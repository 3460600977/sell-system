<template>
  <el-container>
    <!-- 头部 -->
    <right-header />

    <!-- 主体 -->
    <el-main>
      <!-- 路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// 引入组件
import RightHeader from "./RightHeader.vue";

export default {
  components: {
    RightHeader
  }
};
</script>

<style lang="less" scoped>
.el-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>