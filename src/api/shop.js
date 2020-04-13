/**
 * 店铺管理接口 --- 接口层
 */

import req from '@/utils/request'


// 修改订单
export const editShop = params => req.post('/shop/shopedit', params)

// 获取店铺信息
export const getShop = () => req.get('/shop/shopinfo')
