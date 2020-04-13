<template>
  <el-aside width="200px">
    <el-menu
      :default-active="path"
      router
      unique-opened
      background-color="#304156"
      text-color="#fff"
    >
      <!-- 循环渲染菜单 -->
      <template v-for="(item, index) in menus">
        <!-- 1级 -->
        <el-menu-item v-if="!item.children" :index="item.path" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>

        <!-- 2级 -->
        <el-submenu v-else :index="item.path" :key="index">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(v,index) in item.children"
            :key="index"
            :index="v.path"
          >{{ v.title }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import local from "@/utils/local";

export default {
  data() {
    return {
      // 导航菜单数据
      menus: []
    };
  },
  computed: {
    path() {
      // 只要路径包含order 就返回"/home/ordermanage"，让订单管理一直高亮
      if (this.$route.path === "/home/orderdetail") {
        return "/home/ordermanage";
      }

      // 如果是商品编辑 也是商品列表高亮
      if (this.$route.path === "/home/goodsedit") {
        return "/home/goodslist";
      }

      return this.$route.path;
    }
  },
  created() {
    // 后端返回的菜单 (后端可能返回一个角色给你 )
    // let role = "super"; // general
    let role = local.get("role");

    // 完整菜单
    let asyncMenus = [
      {
        path: "/home",
        icon: "icon-shouye",
        title: "后台首页",
        meta: {
          roles: ["super", "general"]
        }
      }, // 首页
      {
        path: "/home/ordermanage",
        icon: "icon-dingdan",
        title: "订单管理",
        meta: {
          roles: ["super", "general"]
        }
      }, // 订单
      // 商品管理
      {
        meta: {
          roles: ["super", "general"]
        },
        path: "/home/goodsmanage",
        icon: "icon-shangpin",
        title: "商品管理",
        children: [
          { path: "/home/goodslist", title: "商品列表" },
          { path: "/home/goodsadd", title: "商品添加" }
        ]
      },
      {
        path: "/home/shopmanage",
        icon: "icon-dianpu",
        title: "店铺管理",
        meta: {
          roles: ["super", "general"]
        }
      }, // 店铺
      // 账号管理
      {
        meta: {
          roles: ["super"]
        },
        path: "/home/accountmanage",
        icon: "icon-zhanghao2",
        title: "账号管理",
        children: [
          { path: "/home/accountlist", title: "账号列表" },
          { path: "/home/accountadd", title: "添加账号" },
          { path: "/home/passwordmodify", title: "修改密码" }
        ]
      },
      // 统计
      {
        meta: {
          roles: ["super"]
        },
        path: "/home/salestotal",
        icon: "icon-tongji",
        title: "销售统计",
        children: [
          { path: "/home/goodstotal", title: "商品统计" },
          { path: "/home/ordertotal", title: "订单统计" }
        ]
      }
    ];

    // 根据后端返回的角色 计算出权限菜单
    let accessMenu = asyncMenus.filter(
      item => item.meta && item.meta.roles.includes(role)
    );

    // 赋值
    this.menus = accessMenu;
  }
};
</script>

<style lang="less">
.el-aside {
  background-color: #304156;
  .el-menu {
    border: none;
    .el-menu-item {
      .iconfont {
        color: #eee;
        margin: 10px;
      }
    }

    .el-submenu {
      .iconfont {
        color: #eee;
        margin: 10px;
      }
      .el-menu-item {
        background-color: #202f3f !important;
      }
    }
  }
}
</style>