import request from '@/utils/request';

/**
 * 彩票类型
*/
export const lotteryTypelistApi = (params) => {
    return request({
      url: '/macaoapi/system/lottery/type/list',
      method: 'get',
      params
    })
  }

/**
 * 最新开奖
*/
export const getNewDataApi = (params) => {
  return request({
    url: '/macaoapi/system/data/get/new/data',
    method: 'get',
    params
  })
}

/**
 * 历史开奖
*/
export const datalistApi = (params) => {
  return request({
    url: '/macaoapi/system/data/list',
    method: 'get',
    params
  })
}

/**
 * 开奖视频详情
*/
export const getVideodataApi = (id) => {
  return request({
    url: `/macaoapi/system/data/${id}`,
    method: 'get',
  })
}


/**
 * tw开奖
*/
export const getKajiangApi = () => {
  return request({
    url: `/api/tw/get_kajiang`,
    method: 'get',
  })
}

/**
 * 取tw开奖list
*/
export const getKajiangListApi = (params) => {
  return request({
    url: `/api/tw/get_kjlist`,
    method: 'get',
    params
  })
}

