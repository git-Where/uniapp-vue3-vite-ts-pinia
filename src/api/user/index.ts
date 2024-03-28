import http from '@/utils/request';

const API = {
  UserInfo:'/Account/QueryUserInfo', // 获取用户信息
  GetTeacherList:'/User/GetTeacherList', // 获取教师列表
  GetUnReadNum:'/Message/GetUnReadNum', // 获取未读消息
  GetAdminList:'/User/GetAdminList', // 获取未读消息

}
export function getUserInfo() {
  return http.get<any>(API.UserInfo, {});
}

export function getTeacherList() {
  return http.get<any>(API.GetTeacherList, {});
}

export function getUnReadNum() {
  return http.post<any>(API.GetUnReadNum, {});
}


export function getAdminList() {
  return http.get<any>(API.GetAdminList, {});
}
