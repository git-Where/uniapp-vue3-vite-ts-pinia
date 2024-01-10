import http from '@/utils/request';

const API = {
  GetAll:'/Semester/GetAll', // 获取所有学期列表
  GetMyCourses:'/BusinessCourse/GetMyCourses', // 获取我的课程
  SetStudentName:'/BusinessCourse/SetStudentName', // 设置实验课学生签名
}
export function getSemesterAll() {
  return http.get<any>(API.GetAll, {});
}

export function getMyCourses(data) {
  return http.post<any>(API.GetMyCourses, data);
}

export function setStudentName(data) {
  return http.post<any>(API.SetStudentName, data);
}
