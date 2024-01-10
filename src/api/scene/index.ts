import http from '@/utils/request';

const API = {
  GETSCENELIST:'/Scene/GetSceneList', // 获取场景列表
  SETSENCELABREP:'/Scene/SetSenceLabRep', //设置场景策略实验室
  SETSENCEEDIT:'/Scene/Edit', //设置场景启用状态
  GETALL:'/Laboratory/GetAll', //获取所有实验室列表
}
export function getScene() {
  return http.post<any>(API.GETSCENELIST, {});
}
export function setSenceLabRep(params: any) {
  return http.post<any>(API.SETSENCELABREP, params);
}

export function setSenceEdit(params: any) {
  return http.post<any>(API.SETSENCEEDIT, params);
}

export function getLabAll() {
  return http.get<any>(API.GETALL, {});
}
