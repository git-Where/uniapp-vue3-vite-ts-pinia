<template>
  <view class="schedule-box">
    <u-sticky bgColor="#fff">
      <Search />
    </u-sticky>
    <Content />
  </view>
</template>

<script setup lang="ts">
import Search from './components/Search/index.vue'
import Content from './components/Content/index.vue'
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.schedule-box .u-icon {
  display: inline-block !important;
  width: 28rpx;
  height: 16rpx;
}
</style>
