import http from '@/utils/request';

const API = {
  InspectionTask:'/Task/GetInspectionList', // 获取实验室巡检任务
  GetOfficeDutyList:'/Task/GetOfficeDutyList', // 获取办公室签到记录列表
  SubmitInspection:'/Task/SubmitInspection', // 实验室巡检记录提交
  GetList:'/Message/GetList', // 消息列表
  DutyMonthlyReport:'/Task/DutyMonthlyReport', // 值班月报表
  DutyCheckIn:'/Task/DutyCheckIn', // 办公室值班签到
  BindPhone:'/Account/BindPhone', // 绑定手机
  GetStudentList:'/User/GetStudentList', // 获取值班学生列表
  GetOvertimeList:'/Task/GetOvertimeList', // 加班任务审批列表
  AddOvertimeTasks:'/Task/AddOvertimeTasks', // 新建加班任务
  UserEdit:'/User/Edit', // 完善个人信息
}

export function getInspectionTask(data:any) {
  return http.post<any>(API.InspectionTask, data);
}

export function getDutyList(data:any={}) {
  return http.post<any>(API.GetOfficeDutyList, data);
}

export function submitInspection(data:any={}) {
  return http.post<any>(API.SubmitInspection, data);
}


export function getMessageList(data:any={}) {
  return http.post<any>(API.GetList, data);
}

export function getDutyMonthlyReport(data:any={}) {
  return http.post<any>(API.DutyMonthlyReport, data);
}

export function getDutyCheckIn(data:any={}) {
  return http.post<any>(API.DutyCheckIn, data);
}

export function getStudentList(data:any={}) {
  return http.post<any>(API.GetStudentList, data);
}

export function getOvertimeList(data:any={}) {
  return http.post<any>(API.GetOvertimeList, data);
}

export function addOvertimeTasks(data:any={}) {
  return http.post<any>(API.AddOvertimeTasks, data);
}


export function setUserInfo(data:any={}) {
  return http.post<any>(API.UserEdit, data);
}
