import http from '@/utils/request';

const API = {
  GetList:'/BusinessCourseArrangement/GetList', // 获取预约列表
  SetStatus:'/BusinessCourseArrangement/SetStatus', // 预约审核
  GetMyList:'/BusinessCourseArrangement/GetMyList', // 获取我的预约
  BusinessActivityAdd:'/BusinessActivity/Add', // 添加活动
  BusinessBatchAdd:'/BusinessCourseArrangement/BatchAdd', // 添加活动预约时间
}
export function getBusinessList(data:any) {
  return http.post<any>(API.GetList, data);
}
export function setBusinessStatus(data:any) {
  return http.post<any>(API.SetStatus, data);
}

export function getBusinessMyList(data:any) {
  return http.post<any>(API.GetMyList, data);
}

export function addBusinessActivity(data:any) {
  return http.post<any>(API.BusinessActivityAdd, data);
}
export function addBusinessBatch(data:any) {
  return http.post<any>(API.BusinessBatchAdd, data);
}
