import http from '@/utils/request';

const API = {
  InspectionTask:'/Task/GetInspectionList', // 获取实验室巡检任务
  GetOfficeDutyList:'/Task/GetOfficeDutyList', // 获取办公室签到记录列表
}

export function getInspectionTask(data:any) {
  return http.post<any>(API.InspectionTask, data);
}

export function getDutyList(data:any={}) {
  return http.post<any>(API.GetOfficeDutyList, data);
}
