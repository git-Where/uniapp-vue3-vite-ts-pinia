<template>
  <div class="approve-content">
    <div class="approve-content-item">
      <div class="approve-content-item-title">[417]自贸区实验室</div>
      <div class="approve-content-item-content">
        <div class="approve-content-title">
          <img class="approve-icon" :src="ApproveIcon" />
          整理档案
        </div>
        <div class="approve-content-con">
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">时间</span>
            <span class="approve-content-con-span"
              >2023学年14周3-4节</span
            >
          </div>
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">状态</span>
            <span class="approve-content-con-span status-color"
              >待审核</span
            >
          </div>
          <div class="approve-content-con-item">
            <div class="view-details">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {ApproveIcon} from '@/static/icon'


</script>

<style lang="scss">
.approve-content {
  padding: 0 30rpx;
}
.approve-content-item {
  .approve-content-item-title {
    padding: 30rpx 0;
    font-weight: bold;
    font-size: 36rpx;
    color: #999;
  }
  .approve-content-item-content {
    padding: 0 25rpx;
    border-radius: 21rpx;
    background: #fff;
  }
  .approve-content-title {
    padding: 25rpx 0;
    border-bottom: 1rpx solid #e3e3e3;
  }
  .approve-icon {
    display: inline-block;
    margin-right: 15rpx;
    width: 52rpx;
    height: 52rpx;
    vertical-align: middle;
    font-weight: bold;
    font-size: 36rpx;
    color: #333;
  }
  .approve-content-con {
    .approve-content-con-item {
      padding: 30rpx 0;
      span {
        font-weight: 500;
        font-size: 29rpx;
      }
    }
    .approve-content-con-label {
      display: inline-block;
      margin-right: 70rpx;
      width: 120rpx;
      color: #666;
    }
    .approve-content-con-span {
      display: inline-block;
      text-align: center;
      font-weight: 500;
      font-size: 30rpx;
      color: #333;
      &.status-color {
        border: 1px solid #fe705c;
        border-radius: 5rpx;
        width: 128rpx;
        height: 48rpx;
        line-height: 48rpx;
        color: #fe705c;
      }
    }
  }
  .view-details {
    text-align: right;
    font-weight: 500;
    font-size: 32rpx;
    color: #999;
  }
}
</style>
