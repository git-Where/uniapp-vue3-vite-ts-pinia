import { forward } from './router';
import { Decrypt, Encrypt } from './secret';
import { BaseUrl } from '@/config/app';
import {showLoading,hideLoading} from '@/config/serviceLoading'
import { API } from '@/api/login';

function reject(err: { errno: number; errmsg: string }) {
  const { errmsg = '网络不给力，请检查你的网络设置~', errno = -1 } = err;
  switch (errno) {
    case 10000:
      // 特殊异常处理
      forward('login');
      break;

    default:
      uni.showToast({
        icon:'none',
        title: errmsg
      });
      break;
  }
}

// h5环境开启代理
const apiBaseUrl = BaseUrl;
const header = {}

function baseRequest(
  method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    | undefined,
  url: string,
  data: {}
) {
  showLoading(true)
  return new Promise((resolve,reject) => {
    const token = uni.getStorageSync('token') || '';
    console.log('请求的参数数据：',data)
    let _data:any = Object.keys(data).length > 0 ? {
      DataStr: Encrypt(JSON.stringify(data))
    } : {}
    // 数据加密
    if(method == 'GET'){
      _data=data || {}
    }
    const contentType = method === 'GET'
    ? 'application/json; charset=utf-8'
    : 'application/x-www-form-urlencoded'
    header['content-type'] = contentType
    header['Authorization'] = `Basic ${token}`
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: header,
      data:_data,
      success: (res: any) => {
        console.log(`res：`,res)
        if(res?.statusCode === 401){
          uni.reLaunch({
            url:'/pages/login/index'
          })
        }else if(res?.data?.IsSuccess){
          const resData = res?.data?.SuccessData ? JSON.parse(Decrypt(res?.data?.SuccessData)) : ''
          console.log(`${url}请求返回数据：`,resData)
          resolve(resData);
        }else{
          uni.showToast({
            icon:'none',
            title: res?.data?.ErrorMessage || '网络不给力，请检查你的网络设置~',
            duration:2000
          });
          reject({
            errno: res?.statusCode,
            errmsg: res?.data?.ErrorMessage || '网络不给力，请检查你的网络设置~'
          });
        }
      },
      fail: (error) => {
        uni.showToast({
          icon:'none',
          title: '网络不给力，请检查你的网络设置~',
          duration:2000
        });
        reject({
          errno: -1,
          errmsg: '网络不给力，请检查你的网络设置~'
        });
      },
      complete: (data:any) => {
        hideLoading();
        if(data?.statusCode !== 200){
          uni.showToast({
            icon:'none',
            title: data?.data?.Message || '网络不给力，请稍后重试~',
            duration:2000
          });
        }
        // else{
        //   uni.showToast({
        //     icon:'none',
        //     title: data?.data?.Message || '',
        //     duration:2000
        //   });
        // }
        console.log(data, '请求complete');
      }
    });
  });
}

const http = {
  get: <T>(api: string, params: any) =>
    baseRequest('GET', api, {
      // ...getCommonParams(),
      ...params
    }) as Http.Response<T>,
  post: <T>(api: string, params: any) =>
    baseRequest('POST', api, {
      // ...getCommonParams(),
      ...params
    }) as Http.Response<T>
};

export default http;
