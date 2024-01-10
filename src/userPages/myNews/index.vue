<template>
  <div class="news-box">
    <div class="news-item">
      <div class="news-title clearfix">
        <div class="news-title-time">2023-11-21 09:23</div>
        <div class="news-title-content">
          <span class="news-note"/>
          <span class="news-status waring">审核</span>
          <span class="news-title-name">预约审核</span>
        </div>
      </div>
      <div class="news-content h-line-1">
        飒飒婚纱和莎莎婚纱婚纱就阿萨是啥接受飒飒婚纱和莎莎婚纱婚纱就阿萨是啥接受飒飒婚纱和莎莎婚纱婚纱就阿萨是啥接受飒飒婚纱和莎莎婚纱婚纱就阿萨是啥接受
      </div>
      <div class="news-details clearfix">
        <div class="news-details-icon">></div>
        查看详情
      </div>
    </div>
  </div>
  <!-- <div class="news-no">
    <img class="no-img" :src="NoIcon" alt="" />
    <img class="no-name-img" :src="NoName" alt="" />
  </div> -->
</template>

<script setup lang="ts">
// import {NoIcon,NoName} from '@/static/icon'
import NoIcon from '@/static/images/user/no.png';
import NoName from '@/static/images/user/no-name.png';
import { ref } from 'vue';

const list=ref([])
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.news-box {
  padding: 0 30rpx;
  .news-item {
    margin-top: 25rpx;
    padding: 0 25rpx;
    border-radius: 14rpx;
    background: #fff;
    .news-title {
      padding: 20rpx 0;
      border-bottom: 1rpx solid #e3e3e3;
    }
    .news-title-time {
      float: right;
      margin-top: 10rpx;
      font-weight: 500;
      font-size: 22rpx;
      color: #999;
    }
    .news-note {
      display: inline-block;
      margin-right: 10rpx;
      border-radius: 50%;
      width: 13rpx;
      height: 13rpx;
      background: #f00;
    }
    .news-status {
      margin-right: 10rpx;
      padding: 2rpx 5rpx;
      border-radius: 3rpx;
      height: 31rpx;
      background: #fd9a30;
      line-height: 31rpx;
      font-weight: 500;
      font-size: 22rpx;
      color: #fff;
      &.waring {
        background: #ff3e3d;
      }
      &.inform {
        background: #3c9df3;
      }
      &.approve {
        background: #fd9a30;
      }
    }
    .news-title-name {
      font-weight: bold;
      font-size: 30rpx;
      color: #0b0b0b;
    }
    .news-content {
      padding: 20rpx 0;
      border-bottom: 1rpx solid #e3e3e3;
      font-weight: 500;
      font-size: 28rpx;
      color: #003;
    }
    .news-details {
      padding: 20rpx 0;
      font-weight: 500;
      font-size: 22rpx;
      color: #666;
    }
    .news-details-icon {
      float: right;
    }
  }
}
.news-no {
  padding: 160rpx 20rpx;
  .no-img {
    display: block;
    margin: 0 auto;
    width: 717rpx;
    height: 564rpx;
  }
  .no-name-img {
    display: block;
    margin: 110rpx auto 0;
    width: 176rpx;
    height: 30rpx;
  }
}
</style>
