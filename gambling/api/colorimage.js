

import request from "@/utils/request.js";


/**
 * 个人彩图分组列表
*/
export function mylistApi(data){
  return request.get(`/macaoapi/system/main/my/list`,data);
}

/**
 * 申请彩图分组
*/
export function addApi(data){
  return request.post(`/macaoapi/system/main/add`,data);
}


/**
 * 彩图内容列表
*/
export function infolistApi(data){
  return request.get(`/macaoapi/system/main/info/list`,data);
}

/**
 * 新增彩图内容
*/
export function addinfoApi(data){
  return request.post(`/macaoapi/system/main/info/add`,data);
}


/**
 * 彩图内容列表
*/
export function getinfolistApi(){
  return request.get(`/macaoapi/system/main/info/list`);
}


/**
 * 彩图分组列表
*/
export function getmainlistApi(){
  return request.get(`/macaoapi/system/main/get/list`);
}

/**
 * 彩图详情
*/
export function getmaininfoApi(data){
  return request.get(`/macaoapi/system/main/info/get/main_info`,data);
}

/**
 * 根据年份和分组查询期号
*/
export function getIssueNoApi(data){
  return request.get(`/macaoapi/system/main/info/get/issue_no`,data);
}
