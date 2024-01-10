<template>
  <div>
    <img class="invite-header-btn" :src="AddTask" alt="" @click="handleAddTask"/>
    <div class="overtime-tab">
      <Tabs :tab-list="list"
        :line-width="136"
        :line-height="2"
        :scrollable="false"
        :item-style="{
          flex: '1',
          height: '94rpx'
        }"
        @tab-change="tabClick" />
    </div>
    <OverTimeContent />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import {AddTask} from '@/static/icon'
import OverTimeContent from './components/OverTimeContent/index.vue'


const list = ref([
  {
    name: "待审核",
  },
  {
    name: "已通过",
  },
  {
    name: "已拒绝",
  }
]);
const tabClick = (index,item) => {
  console.log(index,item)
}
onShow(() => {
});

const handleAddTask = () => {
  uni.navigateTo({
    url:'../addTask/index'
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.overtime-tab {
  border-bottom: 1rpx solid #dcdcdc;
  background-color: #fff;
}
.u-tabs__wrapper__nav__line {
  bottom: 0 !important;
}
.invite-header-btn {
  display: block;
  margin: 20rpx auto;
  width: 680rpx;
  height: 100rpx;
}
</style>
