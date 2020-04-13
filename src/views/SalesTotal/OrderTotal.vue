<template>
  <div class="order-total">
    <div class="sales-data">
      <!-- 查询表单 -->
      <el-form :inline="true">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 1. 准备一个具备宽和高的容器 -->
    <div id="sales-charts" class="sales-charts" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
import moment from "moment";

import { getOrderTotal } from "@/api/order";

export default {
  data() {
    return {
      date: ""
    };
  },
  methods: {
    drawCharts(xArr, yArr) {
      // 1. 初始化dom
      let myChart = echarts.init(document.getElementById("sales-charts"));

      // 2. 准备配置
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArr
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 元"
          }
        },
        series: [
          {
            data: yArr,
            type: "line",
            areaStyle: {}
          }
        ]
      };

      // 3. 生成报表
      myChart.setOption(option);
    },
    // 获取数据 渲染echarts
    async getData() {
      // 获取到报表数据
      let { data } = await getOrderTotal({ date: JSON.stringify(this.date) });

      // 循环 时间格式化
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YY/MM/DD");
      });

      // 日期相同的数据归类
      let obj = {};

      // 数据处理
      data.forEach(v => {
        if (!obj[v.orderTime]) {
          obj[v.orderTime] = v.orderAmount;
        } else {
          obj[v.orderTime] += v.orderAmount;
        }
      });

      let xArr = [];
      let yArr = [];

      for (let key in obj) {
        xArr.push(key);
        yArr.push(obj[key]);
      }
      // 画图
      this.drawCharts(xArr, yArr);
    },
    // 查询数据
    search() {
      this.getData();
    }
  },
  // dom渲染已经完成
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.order-total {
  height: 100%;
  .sales-data {
  }

  .sales-charts {
    margin-top: 10px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>