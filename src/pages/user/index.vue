
<template>
  <view class="content">
    <img class="index-bg" :src="IndexBg" alt="">
    <div class="index-box" :style="{marginTop:-(370-statusHeight)+'rpx'}">
      <div class="index-title" :style="{height:navigationBarHeight*2+'rpx',lineHeight:navigationBarHeight*2+'rpx'}">我的</div>
    </div>
    <div class="my-content">
      <div class="my-info">
        <div class="my-avatar">
          <img :src="systemInfoMap?.Portrait" alt=""/>
        </div>
        <div class="my-info-item">
          <div class="my-info-name">
            {{systemInfoMap?.NickName}}
          </div>
          <div class="my-info-phone">手机号：{{systemInfoMap?.Phone}}</div>
        </div>
      </div>
      <div class="my-content-box">
        <div class="my-content-item" @click="goMyNews('../../userPages/myNews/index')">
          <img class="my-content-item-icon" :src="InfoIcon" alt="" />
          <div class="my-content-item-title">
            消息
          </div>
        </div>
        <div class="my-content-item" @click="handleSignOut">
          <img class="my-content-item-icon" :src="SignOutIcon" alt=""/>
          <div class="my-content-item-title">
            注销
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { getMessageList, setWxLogOut } from '@/api';
import {IndexBg,InfoIcon,SignOutIcon} from '@/static/icon'
import { navBarHeight } from '@/utils/navBarUtils';
import { systemInfos } from '@/utils/utils';

const statusHeight = ref(0)
const navigationBarHeight = ref(0)
const systemInfoMap = ref(systemInfos)

onShow(async () => {
  const token = uni.getStorageSync('token') || '';
  if(!token){
    return uni.reLaunch({
      url:'/pages/login/index'
    })
  }else{
    const res = await getMessageList({
      page:1,pagesize:10000
    }) as any
    console.log(res.length)
    const len =
    uni.setTabBarBadge({ //显示数字
      index: 2, //tabbar下标
      text:res.length.toString()
    })
    init()
  }
});

const init = async () => {
  const res = await navBarHeight() as any
  statusHeight.value = res.statusHeight*2
  navigationBarHeight.value = res.navigationBarHeight
}
const goMyNews = (url) => {
  uni.navigateTo({
    url:url
  });
}
const handleSignOut = async () => {
  await setWxLogOut()
  uni.clearStorage()
  uni.reLaunch({
    url:'/pages/login/index'
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.content {
  .index-bg {
    display: block;
    width: 100%;
    height: 365rpx;
  }
  .index-title {
    text-align: center;
    font-size: 26rpx;
    color: #fff;
  }
  .my-content {
    margin: 30rpx 25rpx;
  }
  .my-info {
    display: flex;
    margin-bottom: 20rpx;
    padding: 40rpx;
    border-radius: 15rpx;
    background: #fff;
    .my-avatar {
      display: block;
      margin-right: 40rpx;
      width: 130rpx;
      height: 130rpx;
      image {
        display: block;
        border: 1rpx solid #e7e7e7;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .my-info-item {
      flex: 1;
      .my-info-name {
        padding-top: 10rpx;
        font-weight: 500;
        font-size: 36rpx;
        color: #333;
      }
      .my-info-phone {
        padding-top: 20rpx;
        line-height: 48rpx;
        font-size: 30rpx;
        color: #999;
      }
    }
  }
  .my-content-box {
    padding: 0 25rpx;
    border-radius: 15rpx;
    background: #fff;
    .my-content-item {
      display: flex;
      padding: 40rpx 10rpx;
      border-bottom: 1rpx solid #e7e7e7;
      &:last-child {
        border-bottom: none;
      }
    }
    .my-content-item-icon {
      display: block;
      margin-right: 22rpx;
      width: 56rpx;
      height: 56rpx;
    }
    .my-content-item-title {
      flex: 1;
      font-weight: 500;
      font-size: 33rpx;
      color: #333;
    }
  }
}
</style>
