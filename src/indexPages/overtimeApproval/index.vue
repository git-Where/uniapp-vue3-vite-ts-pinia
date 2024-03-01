<template>
  <div>
    <u-sticky bgColor="#fff">
      <div  class="over-time-box">
        <img class="invite-header-btn" :src="AddTask" alt="" @click="handleAddTask"/>
      </div>
      <div class="overtime-tab">
        <Tabs :tab-list="tabs"
          :line-width="136"
          :line-height="2"
          :scrollable="false"
          :item-style="{
            flex: '1',
            height: '94rpx'
          }"
          @tab-change="tabClick" />
      </div>
    </u-sticky>
    <scroll-view scroll-y="true" @scrolltolower="loadMore" :style="{ height: scrollH + 'rpx' }">
      <OverTimeContent :info="list"/>
      <div class="no-more" v-if="total == list.length">
        没有更多了~
      </div>
    </scroll-view>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import {AddTask} from '@/static/icon'
import OverTimeContent from './components/OverTimeContent/index.vue'
import { getOvertimeList } from '@/api'

let page = 1
const pagesize = 10
const status = ref(0)
const scrollH = ref(0)
const total = ref(0)
const tabs = ref([
  {
    name: "待审核",
    id:0
  },
  {
    name: "已通过",
    id:1
  },
  {
    name: "已拒绝",
    id:2
  }
]);

const list = ref<any>([])

onShow(()=>{
  init()
  scrollHs()
})
const init = async () => {
  const res = await getOvertimeList({
    page,
    pagesize,
    status:status.value || 0
  }) as any
  list.value = list.value.concat(res.data)
  total.value = res.totalCount
}
const loadMore = () => {
  if(total.value == list.value.length)return
  page+=1
  init()
}
const scrollHs = () => {
  let sys = uni.getSystemInfoSync()
  let winWidth = sys.windowWidth
  let winrate = 750 / winWidth
  let winHeight = parseInt(sys.windowHeight * winrate as any)
  scrollH.value =  winHeight - 280
}
const tabClick = (item) => {
  status.value = item.id
  init()
}

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
.no-more {
  display: block;
  padding: 24rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #999;
}
.over-time-box {
  padding: 20rpx 0;
}
.invite-header-btn {
  display: block;
  margin: 0 auto;
  width: 680rpx;
  height: 100rpx;
}
</style>
