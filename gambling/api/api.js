

import request from "@/utils/request.js";


/**
 * 最新开奖
*/
export function getNewDataApi(data){
  return request.get(`/macaoapi/system/data/get/new/data`,data);
}

/**
 * 历史开奖
*/
export function datalistApi(data){
  return request.get(`/macaoapi/system/data/list`,data);
}

/**
 * 公告列表
*/
export function announcementlistApi(){
  return request.get(`/macaoapi/system/announcement/list`);
}


/**
 * 彩票类型
*/
export function lotteryTypelistApi(data){
  return request.get(`/macaoapi/system/lottery/type/list`,data);
}

/**
 * 历史开奖视频
*/
export function getVideolistApi(data){
  return request.get(`/macaoapi/system/data/get/video`,data);
}

/**
 * 开奖视频详情
*/
export function getVideodataApi(id){
  return request.get(`/macaoapi/system/data/${id}`);
}

/**
 * 开奖日期日历
*/
export function getDrawWinApi(data){
  return request.get(`/macaoapi/system/data/get/draw/winning`,data);
}


/**
 * 号码统计
 * type(hm=号码统计；sx=生肖；bs=波色；ws=尾数)
*/
export function getFilteredDataApi(data){
  return request.get(`/api/filtered-data`,data);
}

/**
 * 特码图表
 * type(tmls=特码历史；txlr=特肖冷热；tmbd=特码波段；twlr=特尾冷热；bslr=特码波色冷热)
 * tb(0=热门；1=遗漏 （正码历史走势,生肖正码冷热 ）有效)
*/
export function getTemaDataApi(data){
  return request.get(`/api/tema-data`,data);
}

/**
 * 更多图表 
 * type(lszs=正码历史走势；wsdx=尾数大小；sxzm=生肖正码冷热；lmzs=连码走势；lxzs=联肖走势)
 * tb(0=热门；1=遗漏 （正码历史走势,生肖正码冷热 ）有效)
*/
export function getMoreDataApi(data){
  return request.get(`/api/more-data`,data);
}

/**
 * 参考号码 
 * dataType 1=生肖五行波色号码；2=家禽野兽其他号码，默认为1
*/
export function getCankaoDataApi(data){
  return request.get(`/api/cankao-data`,data);
}


// /**
//  * 核销
// */
// export function verificationApi(verifyCode){
//   return request.post(`/api/admin/merchant/order/verification`,{verifyCode});
// }


