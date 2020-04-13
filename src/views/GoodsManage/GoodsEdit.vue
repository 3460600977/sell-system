<template>
  <div class="goods-add">
    <el-card class="box-card">
      <div slot="header">
        <h1>编辑商品</h1>
      </div>
      <div>
        <!-- 添加商品表单 -->
        <el-form
          size="small"
          :model="goodsAddForm"
          style="width: 560px;"
          ref="goodsAddForm"
          label-width="80px"
        >
          <!-- 名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="goodsAddForm.goodsname"></el-input>
          </el-form-item>

          <!-- 分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="goodsAddForm.goodscategory" placeholder="请选择商品分类">
              <el-option label="热销" value="热销"></el-option>
              <el-option label="咖啡" value="咖啡"></el-option>
              <el-option label="热菜" value="热菜"></el-option>
              <el-option label="凉菜" value="凉菜"></el-option>
              <el-option label="饮品" value="饮品"></el-option>
              <el-option label="火锅" value="火锅"></el-option>
            </el-select>
          </el-form-item>

          <!-- 特色 -->
          <el-form-item label="商品特色">
            <el-checkbox-group v-model="goodsAddForm.goodsfeature">
              <el-checkbox label="新品上市" name="goodsfeature"></el-checkbox>
              <el-checkbox label="第二单半价" name="goodsfeature"></el-checkbox>
              <el-checkbox label="主打产品" name="goodsfeature"></el-checkbox>
              <el-checkbox label="火爆产品" name="goodsfeature"></el-checkbox>
              <el-checkbox label="祖传手艺" name="goodsfeature"></el-checkbox>
              <el-checkbox label="源自四川" name="goodsfeature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 商品图片 -->
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="goodsAddForm.imgUrl" :src="serverApi + goodsAddForm.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 是否促销 -->
          <el-form-item label="是否促销">
            <el-radio-group v-model="goodsAddForm.isPromotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 商品规格 -->
          <el-form-item label="食品规格">
            <el-radio-group v-model="goodsAddForm.goodsstandard">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 单规格:   的 包装费 和 价格 -->
          <!-- 单规格的包装费 -->
          <el-form-item v-show="flag" label="包装费">
            <el-input-number v-model="goodsAddForm.packingexpense" :min="0" :max="20" label="包装费"></el-input-number>
          </el-form-item>
          <!-- 单规格的价格 -->
          <el-form-item v-show="flag" label="价格">
            <el-input-number v-model="goodsAddForm.goodsPrice" :min="20" label="价格"></el-input-number>
          </el-form-item>

          <!-- 多规格: 表格-->
          <div v-show="!flag" style="text-align: center; margin-bottom: 30px;">
            <el-button size="small" type="primary" @click="dialogFormVisible = true">添加规格</el-button>
            <!-- 表格 -->
            <el-table :data="goodsAddForm.tableData" style="width: 100%">
              <el-table-column prop="goodsstandard" label="规格" width="120"></el-table-column>
              <el-table-column prop="packingexpense" label="包装费" width="120"></el-table-column>
              <el-table-column prop="goodsPrice" label="价格"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="delStandard(scope.$index)" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="goodsAddForm.goodsdesc"></el-input>
          </el-form-item>

          <!-- 添加按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即添加</el-button>
          </el-form-item>
        </el-form>

        <!-- 添加规格模态框 -->
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
          <el-form :model="addStandardForm">
            <!-- 规格 -->
            <el-form-item label="规格" :label-width="formLabelWidth">
              <el-input v-model="addStandardForm.goodsstandard" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 包装费 -->
            <el-form-item :label-width="formLabelWidth" label="包装费">
              <el-input-number
                v-model="addStandardForm.packingexpense"
                :min="0"
                :max="10"
                label="包装费"
              ></el-input-number>
            </el-form-item>

            <!-- 价格 -->
            <el-form-item :label-width="formLabelWidth" label="价格">
              <el-input-number v-model="addStandardForm.goodsPrice" :min="20" label="价格"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addStandard">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addGoods } from "@/api/goods";

export default {
  data() {
    return {
      serverApi: "http://127.0.0.1:5000/upload/goods/", // 商品图片服务器地址
      // 商品表格
      goodsAddForm: {
        goodsname: "", // 商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], // 商品特色
        imgUrl: "", // 商品图片地址
        isPromotion: "不促销", // 是否促销
        goodsstandard: "单规格", // 单规格
        packingexpense: "", // 包装费
        goodsPrice: "", // 价格
        goodsdesc: "", // 商品描述
        // 多规格表格
        tableData: [
          {
            goodsstandard: "默认", // 规格
            packingexpense: "0", // 包装费
            goodsPrice: "20" // 价格
          }
        ]
      },
      // 添加规格表单
      addStandardForm: {
        goodsstandard: "", // 规格
        packingexpense: "", // 包装费
        goodsPrice: "" // 价格
      },
      dialogFormVisible: false, // 模态框显示，
      formLabelWidth: "120px" // 标签宽度
    };
  },
  methods: {
    // 提交添加表单
    async submitForm() {
      // 获取值
      let {
        goodsname,
        goodscategory,
        goodsfeature,
        imgUrl,
        isPromotion,
        goodsstandard,
        packingexpense,
        goodsPrice,
        goodsdesc,
        tableData
      } = this.goodsAddForm;

      // 准备参数对象
      let params = {
        goodsname,
        goodscategory,
        goodsfeature: JSON.stringify(goodsfeature),
        imgUrl,
        isPromotion,
        standard:
          goodsstandard === "单规格"
            ? JSON.stringify([{ goodsstandard, packingexpense, goodsPrice }])
            : JSON.stringify(tableData),
        goodsdesc
      };
      let { code } = await addGoods(params); // 发送添加商品的请求
      if (code === 0) {
        this.$router.push("/home/goodslist");
      }
    },
    // 添加规格
    addStandard() {
      this.dialogFormVisible = false; // 隐藏模态框
      this.goodsAddForm.tableData.unshift(this.addStandardForm); // 把表单对象添加进入数组
      this.addStandardForm = {
        // 清空表单
        goodsstandard: "", // 规格
        packingexpense: "", // 包装费
        goodsPrice: "" // 价格
      };
    },
    // 删除
    delStandard(index) {
      this.goodsAddForm.tableData.splice(index, 1);
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.goodsAddForm.imgUrl = imgUrl;
      }
    },
    // 图片上传之前的处理函数
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isPNG || isJPG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isPNG || isJPG) && isLt2M;
    }
  },
  computed: {
    // 计算规格的显示和隐藏
    flag() {
      return this.goodsAddForm.goodsstandard === "单规格" ? true : false;
    }
  },
  created() {
    // 获取本地存储的数据
    let goods = JSON.parse(window.sessionStorage.getItem("goods"));
    this.goodsAddForm.goodsname = goods.goodsname;
    this.goodsAddForm.goodscategory = goods.goodscategory;
    this.goodsAddForm.goodsfeature = JSON.parse(goods.goodsfeature);
    this.goodsAddForm.imgUrl = goods.imgUrl;
    this.goodsAddForm.goodsdesc = goods.goodsdesc;

    // 判断是单规格还是多规格
    let standard = JSON.parse(goods.standard);

    // 如果规格中只有一个对象 就是单规格
    if (standard[0].goodsstandard === "单规格") {
      // 单规格
      this.goodsAddForm.goodsstandard = "单规格";
      this.goodsAddForm.packingexpense = standard[0].packingexpense; // 包装费
      this.goodsAddForm.goodsPrice = standard[0].goodsPrice; // 价格
    } else {
      // 多规格
      this.goodsAddForm.goodsstandard = "多规格";
      this.goodsAddForm.tableData = standard; // 直接给表单赋值
    }
  }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>