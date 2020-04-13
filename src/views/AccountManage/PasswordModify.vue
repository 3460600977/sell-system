<template>
  <div class="password-modify">
    <el-card class="box-card">
      <!-- 面板头部 -->
      <div slot="header" class="clearfix">
        <span>账号添加</span>
      </div>
      <!-- 表单 -->
      <div>
        <el-form
          style="width: 315px;"
          size="small"
          status-icon
          ref="passwordModifyForm"
          label-width="100px"
          :model="passwordModifyForm"
          :rules="rules"
        >
          <!-- 旧密码 -->
          <el-form-item label="旧的密码" prop="oldPwd">
            <el-input v-model="passwordModifyForm.oldPwd" type="text" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 新密码 -->
          <el-form-item label="新的密码" prop="newPwd">
            <el-input v-model="passwordModifyForm.newPwd" type="text" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input v-model="passwordModifyForm.checkPass" type="text" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入调用接口函数
import { checkOldPwd, editPassword } from "@/api/account";
// 引入工具函数
import { pwdReg } from "@/utils/reg";
import local from "@/utils/local";

export default {
  data() {
    // 旧密码自定义验证
    const validateOldPwd = async (rule, value, callback) => {
      // 发送请求 验证旧密码是否正确
      let { code, msg } = await checkOldPwd({ oldPwd: value });

      if (!value) {
        callback(new Error("请输入原密码"));
      } else if (code === "11") {
        callback(new Error(msg)); // 旧密码错误
      } else {
        callback(); // 成功
      }
    };

    // 新的密码自定义验证
    const validateNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value === this.passwordModifyForm.oldPwd) {
        callback(new Error("不能和原密码相同"));
      } else if (!rule.pattern.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
      } else {
        // 如果确认新密码不为空
        if (this.passwordModifyForm.checkPass !== "") {
          this.$refs.passwordModifyForm.validateField("checkPass"); // 再次触发某个“字段”的验证
        }
        callback();
      }
    };

    // 验证确认新密码
    const validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordModifyForm.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      passwordModifyForm: {
        oldPwd: "",
        newPwd: "",
        checkPass: ""
      },
      // 验证规则
      rules: {
        oldPwd: { required: true, validator: validateOldPwd, trigger: "blur" }, // 旧密码验证
        // 新密码验证
        newPwd: {
          required: true,
          pattern: pwdReg(),
          validator: validateNewPwd,
          trigger: "blur"
        },
        // 验证确认新密码
        checkPass: {
          required: true,
          validator: validateCheckPass,
          trigger: "blur"
        } // 旧密码验证
      }
    };
  },
  methods: {
    // 表单提交
    submitForm() {
      // 选中整个表单 触发所有验证 如果都通过 valid就是true 否则就是false
      this.$refs.passwordModifyForm.validate(async valid => {
        if (valid) {
          let { code } = await editPassword({
            newPwd: this.passwordModifyForm.newPwd
          });

          if (code === 0) {
            // 清除token
            local.remove("token");
            // 跳转到登录页面
            this.$router.push("/login");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>