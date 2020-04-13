<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <LeftNav />
      <!-- 右侧 -->
<!-- 右侧 -->
<!-- 右侧 -->
      <RightContent />
    </el-container>
  </div>
</template>

<script>
// 引入组件
import LeftNav from "@/components/Layout/LeftNav.vue";
import RightContent from "@/components/Layout/RightContent.vue";

export default {
  components: {
    LeftNav,
    RightContent
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>