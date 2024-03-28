<template>
  <div class="condition-box">
    <div class="condition-header">
      <div class="condition-title">实时统计</div>
      <div class="condition-grid">
        <u-grid :border="true" col="2">
          <u-grid-item>
            <div class="condition-item">
              <div class="condition-item-icon condition-item-class">{{formData?.totalCourseNum}}</div>
            </div>
            <text class="grid-text">当日课程数量</text>
          </u-grid-item>
          <u-grid-item>
            <div class="condition-item">
              <div class="condition-item-icon condition-item-time">{{formData?.totalHours}}</div>
            </div>
            <text class="grid-text">当日实验时数</text>
          </u-grid-item>
          <u-grid-item>
            <div class="condition-item">
              <div class="condition-item-icon condition-item-people">{{formData?.totalNumber}}</div>
            </div>
            <text class="grid-text">当日实验人数</text>
          </u-grid-item>
          <u-grid-item>
            <div class="condition-item">
              <div class="condition-item-num">{{formData?.dutyMember }}</div>
            </div>
            <text class="grid-text">开关门值班学生</text>
          </u-grid-item>
        </u-grid>
      </div>
    </div>
    <div class="condition-content">
      <div class="condition-content-item" v-for="(item,index) in formData?.laboratoryStatus" :key="item.Id">
        <div class="condition-item-title clearfix">
          <div class="condition-open-door" @click="handleOpen(item)">{{IsOpenMap[item.IsOpen]}}</div>
          <div class="condition-item-classroom">
            <img class="condition-classroom-img" :src="imgBaseUrl+item.Img" alt=""/>
            <span class="condition-classroom-name u-line-1" >[{{item.RoomCode}}]{{item.Name}}</span>
          </div>
        </div>
        <div class="condition-item-status">
          <div class="condition-item-status-text clearfix">
            <span class="condition-status" :class="{'waring':item.IsAbnormal === 1}" @click="handleStatus(item)">运行{{ IsAbnormalMap[item.IsAbnormal]}}</span>
            <span class="condition-status-label">开关门状态</span>
            <span class="condition-status-value">{{IsOpenMap[item.IsOpen]}}</span>
          </div>
          <div class="condition-item-status-text">
            <span class="condition-status-label">上课状态</span>
            <span class="condition-status-value">{{StatusMap[item.Status]}}</span>
          </div>
          <div class="condition-item-status-text">
            <span class="condition-status-label">温度</span>
            <span class="condition-status-value">{{item.temperature}}</span>
          </div>
          <div class="condition-item-status-text">
            <span class="condition-status-label">湿度</span>
            <span class="condition-status-value">{{item.humidity}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <u-modal :show="show" title="提醒" @confirm="show=false">
    <view class="slot-content">
      {{showContent}}
    </view>
  </u-modal>
  <u-modal :show="openShow" title="提醒" showCancelButton @confirm="openConfirm" @cancel="openShow=false" @close="openShow=false" ref="uModal" content="是否确认进行该操作？" :asyncClose="true"></u-modal>
</template>

<script setup lang="ts">
import {ref} from "vue"
import { getRunStatus,laboratoryEdit } from '@/api/labrary';
import { onShow } from '@dcloudio/uni-app';
import { imgBaseUrl } from "@/config/app"
const formData = ref()
const IsOpenMap=ref({
  'false':'开门',
  'true':'关门'
})
const StatusMap = ref({
  0:'空闲',
  1:'上课中'
})
const IsAbnormalMap = ref({
  'false':'正常',
  'true':'异常'
})
const show=ref(false)
const showContent=ref('')

onShow(() => {
  init()
});
const init = async () => {
  const res = await getRunStatus()
  formData.value = res
}
const openShow = ref(false)
let rowData = null
const handleOpen = async (row) => {
  rowData = row
  openShow.value = true
}
const openConfirm = async () => {
  await laboratoryEdit({
    Id:rowData.Id,
    IsOpen:!rowData.IsOpen
  })
  uni.showToast({
    title: IsOpenMap.value[rowData.IsOpen]+'成功',
    icon: 'none'
  })
  openShow.value = false
  init()
}
const handleStatus = (row) => {
  if(!row.IsAbnormal)return
  show.value = true
  showContent.value = row.abnormalCause
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.condition-header {
  padding: 0 20rpx;
  border-radius: 0rpx 0rpx 30rpx 30rpx;
  background-color: #fff;
  .condition-title {
    padding: 30rpx 0;
    text-align: center;
    font-weight: bold;
    font-size: 36rpx;
    color: #2b89f3;
  }
  .condition-grid {
    .u-grid {
      border-top: 1rpx solid #efefef;
    }
  }
  .u-border-bottom,
  .u-border-right {
    border-color: #efefef !important;
  }
  .u-grid-item {
    padding: 20rpx 0 30rpx;
  }
  .condition-item-icon {
    margin-bottom: 15rpx;
    width: 102rpx;
    height: 102rpx;
    line-height: 102rpx;
    text-align: center;
    font-weight: bold;
    font-size: 36rpx;
  }
  .condition-item-class {
    background: url('https://jgsyxcx.fzu.edu.cn/images/index/class-icon.png') no-repeat;
    background-size: cover;
    color: #2b89f3;
  }
  .condition-item-time {
    background: url('https://jgsyxcx.fzu.edu.cn/images/index/lab-icon.png') no-repeat;
    background-size: cover;
    color: #37ce86;
  }
  .condition-item-people {
    background: url('https://jgsyxcx.fzu.edu.cn/images/index/lan-people-icon.png') no-repeat;
    background-size: cover;
    color: #fe6753;
  }
  .grid-text {
    font-weight: 400;
    font-size: 30rpx;
    color: #333;
  }
  .condition-item-num {
    margin-bottom: 15rpx;
    height: 102rpx;
    line-height: 102rpx;
    font-weight: 500;
    font-size: 36rpx;
    color: #2b89f3;
  }
}
.condition-content {
  padding-bottom: 20rpx;
  .condition-content-item {
    margin-top: 20rpx;
    padding: 20rpx;
    border-radius: 30rpx;
    background: #fff;
  }
  .condition-item-title {
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #efefef;
    .condition-item-classroom {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 200rpx;
    }
  }
  .condition-open-door {
    float: right;
    margin-top: 20rpx;
    border-radius: 10rpx;
    width: 180rpx;
    height: 68rpx;
    background: #3d94ef;
    line-height: 68rpx;
    text-align: center;
    font-weight: bold;
    font-size: 30rpx;
    color: #fff;
  }
  .condition-classroom-img {
    margin-right: 30rpx;
    border-radius: 10rpx;
    width: 126rpx;
    height: 95rpx;
    vertical-align: middle;
  }
  .condition-classroom-name {
    flex: 1;
    vertical-align: middle;
    font-weight: 500;
    font-size: 42rpx;
    color: #333;
  }
  .condition-item-status {
    padding: 0 10rpx;
  }
  .condition-item-status-text {
    padding: 30rpx 0;
  }
  .condition-status-label {
    display: inline-block;
    padding-right: 75rpx;
    width: 150rpx;
    font-size: 30rpx;
    color: #666;
  }
  .condition-status-value {
    font-size: 30rpx;
    color: #333;
  }
  .condition-status {
    float: right;
    position: relative;
    font-size: 30rpx;
    color: #3dbb64;
    &::before {
      position: absolute;
      left: -15rpx;
      top: 15rpx;
      border-radius: 50%;
      width: 12rpx;
      height: 12rpx;
      background: #3dbb64;
      content: '';
    }
    &.waring {
      color: #ff6564;
      &::before {
        background: #ff6564;
      }
    }
  }
}
.slot-content {
  font-size: 26rpx;
  color: #fe6753;
}
</style>
