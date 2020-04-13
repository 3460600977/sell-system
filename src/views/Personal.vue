<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div>
        <div>
          <span>管理员ID: {{accountInfo.id }}</span>
          <el-divider></el-divider>
          <span>账号： {{accountInfo.account }}</span>
          <el-divider></el-divider>
          <span>用户组： {{accountInfo.userGroup }}</span>
          <el-divider></el-divider>
          <span>创建时间： {{accountInfo.ctime | filterTime }}</span>
          <el-divider></el-divider>
          <div class="avatar-wrap" style="height: 100px;">
            <span>管理员头像：</span>
            <div style="margin-top: 20px;" class="avatar">
              <!-- 管理员头像 -->
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/account/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="accountInfo.imgUrl" :src="serveApi + accountInfo.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

            <el-button
              @click="editAvatar"
              style="margin-left: 30px; margin-top: 15px;"
              size="small"
              type="primary"
            >修改头像</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 获取账号信息
import { getAccountInfo, editAvatarImg } from "@/api/account";
import moment from "moment";

export default {
  data() {
    return {
      serveApi: "http://127.0.0.1:5000/upload/account/",
      accountInfo: {
        id: "", // id
        account: "", // 账号
        userGroup: "", // 用户组
        ctime: "", // 时间
        imgUrl: "" // 图片地址
      }
    };
  },
  methods: {
    // 获取账号信息
    async getAccountInfo() {
      let { accountInfo } = await getAccountInfo();
      this.accountInfo = accountInfo; // 赋值渲染
    },
    // 头像上传成功
    handleAvatarSuccess(res) {
      // 回填头像
      let { code, imgUrl } = res;
      if (code === 0) {
        this.accountInfo.imgUrl = imgUrl;
      }
    },
    // 头像上传之前限制
    beforeAvatarUpload() {},
    // 修改头像
    async editAvatar() {
      // 发送请求 修改头像
      let { code } = await editAvatarImg({ imgUrl: this.accountInfo.imgUrl });

      if (code === 0) {
        // 发出通知（通信 告诉头部 更新头像了）
        this.$bus.$emit("updateAvatar");
      }
    }
  },
  created() {
    // 获取用户信息
    this.getAccountInfo();
  },

  filters: {
    // 过滤时间
    filterTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less">
.personal {
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 4px;
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>