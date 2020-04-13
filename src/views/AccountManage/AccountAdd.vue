<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 面包头部 -->
      <div slot="header" class="clearfix">
        <span>账号添加</span>
      </div>
      <!-- 表单 -->
      <div>
        <el-form
          style="width: 315px;"
          size="small"
          status-icon
          ref="accountAddForm"
          label-width="100px"
          :model="accountAddForm"
          :rules="rules"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input v-model="accountAddForm.account" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="accountAddForm.password" type="password" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 用户组 -->
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入工具函数
import { pwdReg } from "@/utils/reg";

// 引入接口请求方法
import { addAccount } from "@/api/account";

export default {
  data() {
    // 自定义验证密码
    const validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码")); // 错误情况 要给提示
      } else if (!rule.pattern.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位")); // 错误情况 要给提示
      } else {
        callback(); // 成功
      }
    };

    return {
      // 添加账号表单
      accountAddForm: {
        account: "",
        password: "",
        userGroup: ""
      },
      // 验证规则
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "账号长度在 3 ~ 12 位", trigger: "blur" }
        ],
        // 密码自定义验证
        password: [
          {
            required: true,
            pattern: pwdReg(),
            validator: validatePwd,
            trigger: "blur"
          }
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      // 获取整个表单 调用内置方法验证所有表单
      this.$refs.accountAddForm.validate(async valid => {
        if (valid) {
          // 发送添加账号的请求
          let { code } = await addAccount(this.accountAddForm);
          if (code === 0) {
            // 路由跳转
            this.$router.push("/home/accountlist");
          }
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      // 获取整个表单 调用重置方法
      this.$refs.accountAddForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>

