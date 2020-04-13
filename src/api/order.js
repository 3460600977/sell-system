/**
 * 订单管理接口 --- 接口层
 */

import req from '@/utils/request'

// 获取订单列表
export const getOrderList = params => req.get('/order/orderlist', params)

// 修改订单
export const editOrder = params => req.post('/order/orderedit', params)

// 获取订单统计数据
export const getOrderTotal = params => req.get('/order/ordertotal', params)

// 获取首页统计数据
export const getIndexData = () => req.get('/order/indexcharts')