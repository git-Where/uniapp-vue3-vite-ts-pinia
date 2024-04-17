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
      <div class="date-time">
        <div class="start-time" @click="startDateShow = true" :style="{color:startTime?'#333':'#999'}">{{ startTime || '开始时间' }}</div>
        <div class="start-time" @click="endDateShow = true" :style="{color:endTime?'#333':'#999'}">{{ endTime || '结束时间' }}</div>
      </div>
    </u-sticky>
    <scroll-view scroll-y="true" @scrolltolower="loadMore" :style="{ height: scrollH + 'rpx' }">
      <OverTimeContent :info="list"/>
      <div class="no-more" v-if="total == list.length">
        没有更多了~
      </div>
    </scroll-view>
  </div>
  <u-datetime-picker
    hasInput
    :show="startDateShow"
    v-model="startDate"
    mode="date"
    :maxDate="endDate"
    closeOnClickOverlay
    @cancel="startDateShow=false"
    @close="startDateShow=false"
    @confirm="startConfirm"
  ></u-datetime-picker>
  <u-datetime-picker
    hasInput
    :show="endDateShow"
    v-model="endDate"
    mode="date"
    :minDate="startDate"
    closeOnClickOverlay
    @cancel="endDateShow=false"
    @close="endDateShow=false"
    @confirm="endConfirm"
  ></u-datetime-picker>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import {AddTask} from '@/static/icon'
import OverTimeContent from './components/OverTimeContent/index.vue'
import { getOvertimeList } from '@/api'
import { getCurrentDate, getCurrentDateToMonth, timestampToTime } from '@/utils/utils'

let page = 1
const pagesize = 10
const status = ref(0)
const scrollH = ref(0)
const total = ref(0)
const tabs = ref([
  {
    name: "待审核",
    id:0,
    badge: {
      value: 0,
    }
  },
  {
    name: "已通过",
    id:1,
    badge: {
      value: 0,
    }
  },
  {
    name: "已拒绝",
    id:2,
    badge: {
      value: 0,
    }
  }
]);

const startDateShow = ref(false)
const endDateShow = ref(false)
const startDate = ref(getCurrentDate())
const endDate = ref(getCurrentDateToMonth())
const startTime = ref(getCurrentDate())
const endTime = ref(getCurrentDateToMonth())

const list = ref<any>([])

onLoad(()=>{
  uni.$on('getName', function(data) {
    if(data.current === '1'){
      list.value = []
      total.value = 0
      init()
    }
	})
  list.value = []
  total.value = 0
  init()
  scrollHs()
})
const init = async () => {
  const res = await getOvertimeList({
    page,
    pagesize,
    status:status.value || 0,
    startDate:startTime.value,
    endDate:endTime.value
  }) as any
  list.value = list.value.concat(res.data)
  total.value = res.totalCount
  tabs.value.find((item)=>item.id === status.value).badge.value = res.totalCount
}
const startConfirm = (val) => {
  startTime.value=timestampToTime(val.value,'2')
  startDateShow.value = false
  page = 1
  list.value = []
  total.value = 0
  init()
}
const endConfirm = (val) => {
  endTime.value=timestampToTime(val.value,'2')
  endDateShow.value = false
  page = 1
  list.value = []
  total.value = 0
  init()
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
  startDate.value = getCurrentDate()
  endDate.value = getCurrentDateToMonth()
  startTime.value = getCurrentDate()
  endTime.value = getCurrentDateToMonth()
  page = 1
  status.value = item.id
  list.value = []
  total.value = 0
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
.date-time {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20rpx;
  height: 60rpx;
  .start-time {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0 20rpx;
    font-size: 28rpx;
    color: #999;
    &:first-child {
      &::before {
        position: absolute;
        right: 0;
        top: 0;
        width: 2rpx;
        height: 35rpx;
        background-color: #b5b5b5;
        content: '';
      }
    }
  }
}
</style>
