/**
 * 商品管理接口 --- 接口层
 */

import req from '@/utils/request'

// 添加商品
export const addGoods = params => req.post('/goods/goodsadd', params)

// 获取商品列表
export const getGoodsList = params => req.get('/goods/goodslist', params)