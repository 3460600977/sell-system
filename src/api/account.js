/**
 * 账号管理接口 --- 接口层
 */

import req from '@/utils/request'

// 1添加账号
export const addAccount = params => req.post('/account/accountadd', params)

// 2获取账号列表
export const getAccountList = params => req.get('/account/accountlist', params)

// 3删除账号
export const delAccount = params => req.get('/account/accountdel', params)

// 4批量删除
export const batchdel = params => req.get('/account/accountbatchdel', params)

// 5修改
export const editAccount = params => req.post('/account/accountedit', params)

// 6登录
export const checkLogin = params => req.post('/account/checklogin', params)

// 7验证旧密码
export const checkOldPwd = params => req.get('/account/checkoldpwd', params)

// 8修改密码
export const editPassword = params => req.post('/account/passwordedit', params)

// 9获取账号信息
export const getAccountInfo = params => req.get('/account/accountinfo', params)

// 10修改头像
export const editAvatarImg = params => req.get('/account/avataredit', params)


