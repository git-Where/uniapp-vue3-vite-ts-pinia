<template>
  <div class="details-box">
    <div class="details-title">
      {{info.Title}}
    </div>
    <div class="details-time">{{info.AddTime}}</div>
    <div class="details-content">{{info.Content}}</div>
  </div>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import { ref } from "vue";
const info = ref<any>({})
onLoad(()=>{
  info.value = uni.getStorageSync('newData')
})
</script>

<style lang="scss">
page {
  height: auto;
  background-color: $uni-bg-color-grey;
}
.details-box {
  margin: 24rpx;
  padding: 60rpx 40rpx;
  border-radius: 20rpx;
  background: #fff;
  .details-title {
    line-height: 48rpx;
    font-weight: 500;
    font-size: 36rpx;
    color: #333;
  }
  .details-time {
    margin: 40rpx 0;
    font-size: 28rpx;
    color: #999;
  }
  .details-content {
    line-height: 48rpx;
    text-indent: 2em;
    font-size: 30rpx;
    color: #333;
  }
}
</style>
