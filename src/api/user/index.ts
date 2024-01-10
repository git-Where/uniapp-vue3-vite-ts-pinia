import http from '@/utils/request';

const API = {
  UserInfo:'/Account/QueryUserInfo', // 获取用户信息
  GetTeacherList:'/User/GetTeacherList', // 获取教师列表

}
export function getUserInfo() {
  return http.get<any>(API.UserInfo, {});
}

export function getTeacherList() {
  return http.get<any>(API.GetTeacherList, {});
}
