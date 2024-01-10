import http from '@/utils/request';
import { LoginItem } from './type';

export const API = {
  LOGIN:'/Account/FixInfo'
}
export function setSkuTrack(params: LoginItem) {
  return http.post<any>(API.LOGIN, params);
}
