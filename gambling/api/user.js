

import request from "@/utils/request.js";


/**
 * 注册
*/
export function registerApi(data){
  return request.post(`/macaoapi/user/register`,data);
}

/**
 * 登录
*/
export function loginApi(data){
  return request.post(`/macaoapi/login`,data);
}


/**
 * 获取用户信息
*/
export function getuserinfoApi(){
  return request.get(`/macaoapi/system/user/profile`);
}


