import http from '@/utils/request';

const API = {
  GetDictionarys:'/Dictionary/GetDictionarys', // 获取字典
}
export function getDict(data:any) {
  return http.post<any>(API.GetDictionarys, data);
}
