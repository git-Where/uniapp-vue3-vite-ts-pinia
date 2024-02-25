<template>
  <view class="content">
    <img class="login-banner" :src="Logo" />
    <div class="login-form">
      <div class="login-title">登录</div>
      <u--form labelPosition="left" :model="form" ref="formRef">
        <u-form-item label="" prop="username"  :leftIcon="User">
          <u--input v-model="form.username" border="none" placeholder="请输入账号"/>
        </u-form-item>
        <u-form-item label="" prop="password"  :leftIcon="Pwd">
          <u--input v-model="form.password" password border="none" placeholder="请输入密码"/>
        </u-form-item>
      </u--form>
    </div>
    <div class="login-btn">
      <img :src="Login" @click="login" alt="">
    </div>
  </view>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { setSkuTrack,getUserInfo } from '@/api';
import {Logo,User,Pwd,Login} from '@/static/icon'

const formRef = ref()
const form = ref({
  username: '',
  password: '',
})
console.log('login')

const login = async () => {
  if(!form.value.username || !form.value.password){
    return uni.$u.toast('请输入账号密码')
  }
  uni.login({
    "provider": "weixin",
    success: (resData) => {
      const { code } = resData
      uni.getUserInfo({ //获取到用户信息
        "provider": "weixin",
        success: async (res) => {
          const { encryptedData, iv } = res
          const token= await getToken(encryptedData,iv,code)
          uni.setStorageSync('token', token);
          uni.switchTab({
            url:'../index/index'
          })
          const userInfo = await getUserInfo()
          uni.setStorageSync('userInfo', userInfo);
        },
        fail: (err) => {
          console.log('err',err)
        }
      })
    },
    fail: (err) => {
      console.log('err',err)
    }
  })
}

const getToken = async (encryptedData,iv,code) => {
  return await setSkuTrack({
    encryptedData: encryptedData,
    iv: iv,
    code: code,
    username: form.value.username,
    password: form.value.password
  })
}

</script>

<style  lang="scss">
.content {
  .login-banner {
    display: block;
    width: 100%;
    height: 620rpx;
  }
  .login-form {
    margin-top: -20rpx;
  }
  .login-title {
    margin-bottom: 46rpx;
    text-align: center;
    font-weight: bold;
    font-size: 36rpx;
    color: #4ca8fe;
  }
  .u-form {
    padding: 0 62rpx;
    .u-form-item {
      border: 1rpx solid #83b5ff;
      border-radius: 100rpx;
      height: 104rpx;
      background: rgba(132, 183, 255, 0.1);
      line-height: 104rpx;
      &:first-child {
        margin-bottom: 35rpx;
      }
    }
    .u-form-item__body {
      padding: 0;
      padding-left: 40rpx;
      height: 104rpx;
    }
    .u-form-item__body__left {
      width: 50rpx !important;
    }
  }
  .login-btn {
    display: block;
    margin: 77rpx auto 0;
    width: 653rpx;
    height: 133rpx;
    image,
    button {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
