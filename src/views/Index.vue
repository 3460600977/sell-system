<template>
  <div class="index">
    <div class="sales-data">
      <el-row :gutter="20">

        <el-col :span="6">
          <div class="grid-content">
            <div class="content">
              <div class="icon">
                <img src="http://localhost:8080/imgs/order1.svg" alt />
              </div>
              <div class="text">
                <ul>
                  <li class="title">总订单</li>
                  <li class="num">102,400</li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="content">
              <div class="icon">
                <img src="http://localhost:8080/imgs/money1.svg" alt />
              </div>
              <div class="text">
                <ul>

                  <li class="title">总销售额</li>
                  <li class="num">102,400</li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="content">
              <div class="icon">
                <img src="http://localhost:8080/imgs/order2.svg" alt />
              </div>
              <div class="text">
                <ul>
                  <li class="title">今日订单数</li>
                  <li class="num">102,400</li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="content">
              <div class="icon">
                <img src="http://localhost:8080/imgs/money2.svg" alt />
              </div>
              <div class="text">
                <ul>
                  <li class="title">今日销售额</li>


                  <li class="num">102,400</li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="sales-charts" class="sales-charts" style="width: 100%; height: 360px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getIndexData } from "@/api/order";

export default {


  methods: {
    // 画线
    drawLine(xArr, data) {
      // 初始化dom
      var salesCharts = echarts.init(document.getElementById("sales-charts"));
      // 准备配置
      var option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数", "销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArr
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数",
            type: "line",
            data: data.orderNum
          },
          {
            name: "销售额",
            type: "line",
            data: data.amount
          }
        ]
      };
      // 生成报表
      salesCharts.setOption(option);
    },
    // 获取数据画图
    async getData() {
      // 这是后端处理好的数据 直接渲染
      let { date, data } = await getIndexData();
      // 画线
      this.drawLine(date, data);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  .sales-data {
    height: 100px;
    .grid-content {
      height: 100px;
      background-color: #ffffff;
      text-align: center;
      // padding: 20px;
      .content {
        height: 100px;
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .text {
          flex: 1;
          color: #333;
          text-align: center;
          li {
            line-height: 30px;
            &.title {
              font-size: 20px;
              color: #ccc;
              font-weight: 500;
            }
            &.num {
              font-size: 18px;
              font-weight: 700;
            }
          }
        }
      }
    }
  }

  .sales-charts {
    margin-top: 50px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>