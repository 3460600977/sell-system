<template>
  <div class="goods-add">
    <el-card class="box-card">
      <div slot="header">
        <h1>店铺管理</h1>
      </div>
      <div>
        <el-form
          :disabled="isDisabled"
          style="width: 560px;"
          ref="form"
          :shopForm="shopForm"
          label-width="80px"
        >
          <el-form-item label="商品名称">
            <el-input v-model="shopForm.shopname"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="shopForm.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="shopForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介">
            <el-input v-model="shopForm.shopdesc"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语">
            <el-input v-model="shopForm.slogan"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-select v-model="shopForm.category" placeholder="请选择店铺分类">
              <el-option label="热销" value="热销"></el-option>
              <el-option label="咖啡" value="咖啡"></el-option>
              <el-option label="热菜" value="热菜"></el-option>
              <el-option label="凉菜" value="凉菜"></el-option>
              <el-option label="饮品" value="饮品"></el-option>
              <el-option label="火锅" value="火锅"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="店铺特点">
            <el-checkbox-group v-model="shopForm.feature">
              <el-checkbox label="品牌保证" name="feature"></el-checkbox>
              <el-checkbox label="蜂鸟专送" name="feature"></el-checkbox>
              <el-checkbox label="新店开铺" name="feature"></el-checkbox>
              <el-checkbox label="外卖保" name="feature"></el-checkbox>
              <el-checkbox label="准时达" name="feature"></el-checkbox>
              <el-checkbox label="开发票" name="feature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="配送费">
            <el-input-number v-model="shopForm.packingexpense" :min="0" :max="10" label="包装费"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价">
            <el-input-number v-model="shopForm.minprice" :min="20" label="价格"></el-input-number>
          </el-form-item>

          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="shopForm.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            ></el-time-picker>
          </el-form-item>
          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopForm.shopAvatar" :src="serveApi + shopForm.shopAvatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 营业执照 -->
          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.businessLicenseImg"
                :src="serveApi + shopForm.businessLicenseImg "
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 餐饮服务许可 -->
          <el-form-item label="餐饮服务许可证">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.cateringServiceLicenseImg"
                :src="serveApi + shopForm.cateringServiceLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="优惠活动">
            <el-select
              @change="handleChange"
              v-model="shopForm.specialOffer "
              placeholder="请选择活动分类"
            >
              <el-option label="满减优惠" value="满减优惠"></el-option>
              <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
              <el-option label="新用户立减" value="新用户立减"></el-option>
              <el-option label="进店领券" value="进店领券"></el-option>
            </el-select>
          </el-form-item>

          <!-- 优惠活动表格 -->
          <div style="margin-bottom: 30px;">
            <el-table :data="shopForm.tableData" style="width: 100%">
              <el-table-column prop="title" label="活动标题" width="120"></el-table-column>
              <el-table-column prop="name" label="活动名称" width="120"></el-table-column>
              <el-table-column prop="detail" label="活动详情"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>

        <!-- 修改按钮 -->
        <el-button type="primary" @click="edit">修改</el-button>
        <el-button type="success" @click="save">保存</el-button>

        <!-- 模态框 -->
        <el-dialog width="400px" title="提示" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="请输入活动详情">
              <el-input size="small" v-model="form.detail" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { editShop, getShop } from "@/api/shop";

export default {
  data() {
    return {
      serveApi: "http://127.0.0.1:5000/upload/shop/",
      uploadImgApi: "http://127.0.0.1:5000/shop/upload",
      shopForm: {
        shopname: "", // 名称
        address: "", // 地址
        phone: "", // 电话
        shopdesc: "", // 描述
        slogan: "", // 标语
        category: "", // 分类
        feature: [], // 特色
        packingexpense: 0, // 配送费
        minprice: 20, // 起送价
        date: [], // 营业时间
        shopAvatar: "", // 店铺头像
        businessLicenseImg: "", // 营业执照
        cateringServiceLicenseImg: "", // 餐饮服务许可证
        specialOffer: "",
        // 优惠活动表格
        tableData: []
      },
      // 活动详情提示框
      form: {
        detail: ""
      },
      isDisabled: true, // 是否禁用
      dialogFormVisible: false // 模态框
    };
  },
  methods: {
    // 提交
    handleDelete(index) {
      this.shopForm.tableData.splice(index, 1);
    },
    // 选项改变
    handleChange() {
      this.dialogFormVisible = true; // 弹出模态框
    },
    // 确认
    confirm() {
      this.dialogFormVisible = false; // 关闭模态框

      let title;
      switch (this.shopForm.specialOffer) {
        case "满减优惠":
          title = "减";
          break;
        case "特惠大酬宾":
          title = "特";
          break;
        case "新用户立减":
          title = "新";
          break;
        case "进店领券":
          title = "领";
          break;
      }

      // 获取用户输入的值
      let newObj = {
        title,
        name: this.shopForm.specialOffer,
        detail: this.form.detail
      };

      // 加入表格
      this.shopForm.tableData.unshift(newObj);
    },
    async save() {
      this.isDisabled = true;

      // 获取表格中的参数
      let {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature,
        packingexpense,
        minprice,
        date,
        shopAvatar,
        businessLicenseImg,
        cateringServiceLicenseImg,
        tableData
      } = this.shopForm;

      // 收集参数（处理一哈）
      let params = {
        shopname, // 名称
        address, // 地址
        phone, // 电话
        shopdesc, // 简介
        slogan, // 标语
        category, // 分类
        feature: JSON.stringify(feature), // 特色
        packingexpense, // 包装费
        minprice, // 价格
        date: JSON.stringify(date), // 营业时间
        shopAvatar, // 店铺头像
        businessLicenseImg, // 营业执照
        cateringServiceLicenseImg, // 餐饮服务许可证
        tableData: JSON.stringify(tableData) // 优惠活动
      };

      // 保存修改
      await editShop(params);
    },
    edit() {
      // 启用
      this.isDisabled = false;
    },
    // 获取店铺信息
    async getShopInfo() {
      let { data } = await getShop();

      for (let key in data) {
        if (key === "date" || key === "feature" || key === "tableData") {
          data[key] = JSON.parse(data[key]);
        }
      }

      // 赋值渲染
      this.shopForm = { ...data };
    },
    // 店铺头像
    handleAvatarSuccess1(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopForm.shopAvatar = imgUrl;
      }
    },
    // 营业执照
    handleAvatarSuccess2(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopForm.businessLicenseImg = imgUrl;
      }
    },
    // 餐饮服务许可证
    handleAvatarSuccess3(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopForm.cateringServiceLicenseImg = imgUrl;
      }
    },
    // 上传之前限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.getShopInfo();
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