<template>
  <div class="order-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-weight: 700; font-size: 18px;">订单详情</span>
        <el-button
          @click="handleClick"
          style="float: right;"
          size="small"
          :type="isEdit ? 'success' : 'primary'"
        >{{ btnText }}</el-button>
      </div>
      <div>
        <!-- 具体的详情内容 -->
        <span>
          订单号:
          <span v-if="!isEdit">{{ orderDetail.orderNo }}</span>
          <input v-else v-model="orderDetail.orderNo" />
        </span>
        <el-divider></el-divider>
        <span>
          下单时间:
          <span v-if="!isEdit">{{ orderDetail.orderTime }}</span>
          <input v-else v-model="orderDetail.orderTime" />
        </span>
        <el-divider></el-divider>
        <span>
          手机号:
          <span v-if="!isEdit">{{ orderDetail.phone }}</span>
          <input v-else v-model="orderDetail.phone" />
        </span>
        <el-divider></el-divider>
        <span>
          收货人:
          <span v-if="!isEdit">{{ orderDetail.consignee }}</span>
          <input v-else v-model="orderDetail.consignee" />
        </span>
        <el-divider></el-divider>
        <span>
          配送地址:
          <span v-if="!isEdit">{{ orderDetail.deliverAddress }}</span>
          <input v-else v-model="orderDetail.deliverAddress" />
        </span>
        <el-divider></el-divider>
        <span>
          送达时间:
          <span v-if="!isEdit">{{ orderDetail.deliveryTime }}</span>
          <input v-else v-model="orderDetail.deliveryTime" />
        </span>
        <el-divider></el-divider>
        <span>
          用户备注:
          <span v-if="!isEdit">{{ orderDetail.remarks }}</span>
          <input v-else v-model="orderDetail.remarks" />
        </span>
        <el-divider></el-divider>
        <span>
          订单金额:
          <span v-if="!isEdit">{{ orderDetail.orderAmount }}</span>
          <input v-else v-model="orderDetail.orderAmount" />
        </span>
        <el-divider></el-divider>
        <span>
          订单状态:
          <span v-if="!isEdit">{{ orderDetail.orderState }}</span>
          <input v-else v-model="orderDetail.orderState" />
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { editOrder } from "@/api/order";

export default {
  data() {
    return {
      // 订单详情
      orderDetail: {},
      // 是否可以编辑
      isEdit: false
    };
  },
  created() {
    // console.log("获取到的数据:", this.$route.query);
    // console.log("获取到的数据:", this.$route.params);

    // 获取本地数据
    this.orderDetail = JSON.parse(window.sessionStorage.getItem("orderdetail"));
  },
  methods: {
    async handleClick() {
      this.isEdit = !this.isEdit;

      // 如果点击的是保存 就要发送请求
      if (!this.isEdit) {
        let { code } = await editOrder(this.orderDetail);
        if (code === 0) {
          this.$router.push("/home/ordermanage");
        }
      }
    }
  },
  computed: {
    btnText() {
      return this.isEdit === false ? "编辑" : "保存";
    }
  }
};
</script>

<style lang="less" scoped>
.order-detail {
  font-size: 14px;
}
</style>