<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="12" class="left-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- 这个面包屑 应该是循环出来的

              想象一下，要的数据结构：
                [
                  {path: '/home', title: '首页'},
                  {path: '/home/accountlist', title: '账号管理'},
                  {path: '/home/accountlist', title: '账号列表'},
                ]
          -->
          <el-breadcrumb-item
            :key="i"
            v-for="(item, i) in breadArr"
            :to="{ path: item.path }"
          >{{item.title}}</el-breadcrumb-item>

          <!-- <el-breadcrumb-item :to="{ path: '/home/accountlist' }">账号管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/accountlist' }">账号列表</el-breadcrumb-item>-->
        </el-breadcrumb>
      </el-col>

      <el-col :span="12" class="right-box">
        <div class="welcome">欢迎你, {{ account }}</div>
        <div class="avatar-wrap">
          <!-- 下拉框 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img v-if="imgUrl" :src="serApi + imgUrl" alt />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
// 引入本地存储工具函数
import local from "@/utils/local";

// 获取账号信息
import { getAccountInfo } from "@/api/account";

export default {
  data() {
    return {
      serApi: "http://127.0.0.1:5000/upload/account/",
      account: "",
      imgUrl: "",
      breadArr: []
    };
  },
  methods: {
    // 下拉菜单点击事件
    handleCommand(command) {
      if (command === "logout") {
        // 退出系统
        // 1. 清除本地token
        local.remove("token");

        // 2. 跳转到登录页面
        this.$router.push({ path: "/login" });
        // 3. 给一些友好的提示
        this.$message({
          type: "success",
          message: "退出成功，欢迎下次再来，哥哥"
        });
      } else if (command === "personal") {
        this.$router.push("/home/personal");
      }
    },
    // 获取账号信息
    async getInfo() {
      let { accountInfo } = await getAccountInfo();
      let { account, imgUrl } = accountInfo;

      this.account = account;
      this.imgUrl = imgUrl;
    },
    // 计算面包屑
    calcBreadArr() {
      // 取出meta中的数组
      this.breadArr = this.$route.meta.breadArr;
    }
  },
  created() {
    this.getInfo(); // 获取数据

    // 监听事件 接收数据
    this.$bus.$on("updateAvatar", () => {
      this.getInfo(); // 重新获取一次数据
    });

    // 进入页面 加载 调用一次计算面包屑的函数
    this.calcBreadArr();
  },
  // 观察数据变化 执行相关的操作
  watch: {
    "$route.path"() {
      this.calcBreadArr(); // 计算面包屑
    }
  }
};
</script>

<style lang="less">
.el-header {
  background-color: #fff;
  line-height: 60px;
  .el-row {
    width: 100%;
    .left-breadcrumb {
      line-height: 60px;
      height: 60px;
      display: flex;
      align-items: center;
    }
    .right-box {
      display: flex;
      .welcome {
        flex: 1;
        text-align: right;
        margin-right: 10px;
        font-size: 14px;
        color: #333;
      }
      .avatar-wrap {
        flex: 0 0 50px;
        text-align: center;

        .el-dropdown {
          width: 100%;
          height: 100%;
          .el-dropdown-link {
            display: inline-block;
            width: 100%;
            height: 50px;
            line-height: 50px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>