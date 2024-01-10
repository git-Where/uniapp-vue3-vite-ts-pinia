import http from '@/utils/request';

const API = {
  GetRunStatus:'/Laboratory/GetRunStatus', //获取实验室运行状态列表
  LaboratoryEdit:'/Laboratory/Edit', // 实验室开关门
}
export function getRunStatus() {
  return http.post<any>(API.GetRunStatus, {});
}

export function laboratoryEdit(data) {
  return http.post<any>(API.LaboratoryEdit, data);
}
