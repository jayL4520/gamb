import request from '@/utils/request';
import axios from 'axios';
import SettingMer from '@/utils/settingMer';
const service = axios.create({
  baseURL: SettingMer.apiBaseURL,
  timeout: 60000, // 过期时间
});

// 创建七星彩专用的axios实例，返回原始响应
const qxcService = axios.create({
  baseURL: '/qxcv1',
  timeout: 60000,
});


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
export const getNewDataApiG = (params) => {
    let lotCode = params.lotteryType.toLowerCase()
    let  res1 =  service({
      //  api/IssueOpenInfo?issue=2026143&lotteryId=2032
      baseURL: lotCode=='mo'?'https://api.00853lhc.com/'+'api':'https://apiam.ad771.cn',//'/'+(lotCode+"Api"),
      url:  lotCode=='mo'?`IssueOpenInfo?issue=${params.issue}&lotteryId=2032`:'/Lot_34/Draw/NextDrawingTime',
      method: 'get',
    
    })
    return res1

}  


export const getNewDataApi = (params) => {

//     if(lotCode.indexOf('mo')>-1){
//  return new Promise( async (resolve, reject) => {
//   // lotCode=tl&ltype=2&date=&page=1

//     let  res1 =  service({
//         //  api/IssueOpenInfo?issue=2026143&lotteryId=2032
//         baseURL: lotCode=='mo'?'/api':'https://apiam.ad771.cn',//'/'+(lotCode+"Api"),
//         url:  lotCode=='mo'?`IssueOpenInfo?issue=${params.issue}&lotteryId=2032`:'/Lot_34/Draw/NextDrawingTime',
//         method: 'get',
      
//       }).catch(err => {
//         reject(err);
//       });
//       return resolve(res1)
//     })


//   }
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

/**
 * 获取七星彩最新开奖数据 (Flask后端)
*/
export const getSevenStarCurrentApi = () => {
  return qxcService({
    url: '/lottery/current',
    method: 'get',
    timeout: 10000
  })
}

/**
 * 获取七星彩历史开奖数据 (Flask后端)
*/
export const getSevenStarHistoryApi = (params) => {
  return qxcService({
    url: '/lottery/results',
    method: 'get',
    params,
    timeout: 10000
  })
}

/**
 * 手动触发七星彩开奖 (Flask后端)
*/
export const triggerSevenStarDrawApi = () => {
  return qxcService({
    url: '/lottery/draw',
    method: 'post',
    data: {},
    timeout: 10000
  })
}

/**
 * 获取后台开奖配置
*/
export const getScheduleConfigApi = () => {
  return qxcService({
    url: '/schedule',
    method: 'get',
    timeout: 10000
  })
}

