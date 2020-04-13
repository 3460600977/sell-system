<template>
  <div class="order-manage">
    <el-card class="box-card">
      <div>
        <!-- 查询表格 -->
        <el-form
          style="margin-bottom: 20px;"
          size="small"
          :inline="true"
          :model="searchForm"
          class="demo-form-inline"
        >
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo" placeholder="订单号"></el-input>
          </el-form-item>

          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="searchForm.consignee" placeholder="收货人"></el-input>
          </el-form-item>

          <!-- 手机号 -->
          <el-form-item label="手机号">
            <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
          </el-form-item>

          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.orderState" placeholder="订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>

          <!-- 时间范围 -->
          <el-date-picker
            size="small"
            v-model="searchForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>

          <!-- 清除按钮和查询按钮 -->
          <el-form-item style="margin-left: 30px;">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="clear">清除</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <!-- 订单号 -->
          <el-table-column prop="orderNo" label="订单号" width="120"></el-table-column>
          <!-- 下单时间 -->
          <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
          <!-- 手机号 -->
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <!-- 收货人 -->
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <!-- 配送地址 -->
          <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
          <!-- 送达时间 -->
          <el-table-column prop="deliveryTime" label="送达时间" width="160"></el-table-column>
          <!-- 用户备注 -->
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <!-- 订单金额 -->
          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
          <!-- 订单状态 -->
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
          <!-- 操作 -->
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <div style="margin-top: 30px;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrderList } from "@/api/order";
import moment from "moment";

export default {
  data() {
    return {
      // 订单表格数据
      tableData: [],
      // 搜索表单数据
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      },
      currentPage: 1, // 当前页
      pageSize: 3, // 每页条数
      total: 12 // 总条数
    };
  },
  methods: {
    // 查询
    search() {
      this.currentPage = 1;
      this.getOrders(); // 调用获取列表函数
    },
    // 清除
    clear() {
      // 清空整个搜索表单
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
      // 请求所有数据
      this.getOrders();
    },
    // 获取订单
    async getOrders() {
      // 收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: JSON.stringify(this.searchForm.date)
      };

      // 发送请求 获取订单列表
      let { total, data } = await getOrderList(params);
      this.total = total;

      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss");
      });

      this.tableData = data;
    },
    // 当前页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrders();
    },
    // 查看详情
    handleDetail(row) {
      // console.log(row);
      // 把数据存入本地
      window.sessionStorage.setItem("orderdetail", JSON.stringify(row));
      // // 跳转页面
      this.$router.push("/home/orderdetail");

      // 跳转到订单详情
      // this.$router.push({
      //   path: "/home/orderdetail",
      //   query: {
      //     id: row.id
      //   }
      //   // name: "orderdetail", // 通过路由的名字跳转
      //   // params: {
      //   //   row
      //   // }
      // });
    }
  },
  created() {
    this.getOrders(); // 进入页面 就调用获取订单数据的函数
  }
};
</script>

<style lang="less" scoped>
</style>