            
<template>
  <div class="goods-manage">
    <el-table :data="tableData" style="width: 100%">
      <!-- 下拉框 可以展开 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>
                <img
                  width="100"
                  height="100"
                  style="border-radius: 4px"
                  :src="serveApi + props.row.imgUrl"
                />
              </span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>
            <el-form-item label="商品特色">
              <span>{{ props.row.goodsfeature | filterFeature}}</span>
            </el-form-item>
            <el-form-item label="是否促销">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>
            <el-form-item label="商品规格">
              <span>{{ props.row.standard | filterStandard }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 其他显示的选项 -->
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="goodsname"></el-table-column>
      <el-table-column label="描述" prop="goodsdesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div style="margin-top: 20px; padding: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoodsList } from "@/api/goods";

export default {
  data() {
    return {
      serveApi: "http://127.0.0.1:5000/upload/goods/",
      // 表格数据
      tableData: [
        // {
        //   id: 1,
        //   imgUrl: "2",
        //   goodsname: "3",
        //   goodscategory: "4",
        //   goodsfeature: "5",
        //   isPromotion: "6",
        //   standard: "7",
        //   goodsdesc: "8"
        // }
      ],
      currentPage: 1,
      total: 0,
      pageSize: 3,
      dialogFormVisible: true
    };
  },
  methods: {
    // 当前页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    // 获取商品列表
    async getGoods() {
      // 发送获取商品列表的请求
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },
    // 编辑商品
    handleEdit(row) {
      // 把要编辑的商品出存入会话存储
      window.sessionStorage.setItem("goods", JSON.stringify(row));
      // 跳转到商品编辑页面
      this.$router.push("/home/goodsedit");
    }
  },
  created() {
    this.getGoods();
  },
  filters: {
    filterFeature(f) {
      return JSON.parse(f).join(" / ");
    },
    filterStandard(s) {
      let arr = JSON.parse(s);
      return arr
        .map(v => `${v.goodsstandard} ${v.goodsPrice} ${v.packingexpense}`)
        .join(" | ");
    }
  }
};
</script>

<style lang="less" scoped>
.goods-manage {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>