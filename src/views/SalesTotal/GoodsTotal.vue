<template>
  <div class="goods-total">
    <div class="sales-data">
      <el-form :inline="true">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="sales-charts" class="sales-charts" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    var salesCharts = echarts.init(document.getElementById("sales-charts"));

    var option = {
      title: {
        text: "堆叠区域图"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {}
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {}
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {}
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {}
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          areaStyle: {
            normal: {}
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };

    salesCharts.setOption(option);
  }
};
</script>

<style lang="less" scoped>
.goods-total {
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