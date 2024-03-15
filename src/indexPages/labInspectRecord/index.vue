<template>
  <div class="lab-inspect-box">
    <u-sticky bgColor="#fff">
      <div class="lab-tab">
        <Tabs :tab-list="list"
          :line-width="205"
          :line-height="2"
          :scrollable="false"
          :item-style="{
            flex: '1',
            height: '94rpx'
          }"
          @tab-change="tabClick" />
      </div>
    </u-sticky>
    <div class="lab-content">
      <div class="lab-content-item" @click="handleTime">
        <img class="lab-time-icon" :src="labTimeIcon" alt="" srcset="" />
        <span class="lab-time-span">{{ timestampToTime(dataTime,'1') }}</span>
        <u-icon class="lab-time-down" name="arrow-down"></u-icon>
      </div>
      <div class="labs-content-item" v-for="(item,index) in formData" :key="index">
        <div class="labs-content-item-content">
          <div class="labs-content-title">
            <img class="labs-icon" :src="labTitleIcon" />
            {{item.Name}}
          </div>
          <div class="labs-content-con">
            <div class="labs-content-con-item">
              <span class="labs-content-con-label"> 巡检教室</span>
              <span class="labs-content-con-span"
                >{{item.Begins}}</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">巡检人员</span>
              <span class="labs-content-con-span"
                >{{item.Executive}}</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">巡检状态</span>
              <span class="labs-content-con-span">
                {{item.ExecutionTime}}
                <span class="labs-con-span-status">{{ item.TaskStatus === 0 ? '待巡检' : '已巡检' }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<u-datetime-picker
  :show="show"
  v-model="dataTime"
  mode="date"
  :closeOnClickOverlay="true"
  @close="show=false"
  @cancel="show = false"
  @confirm="confirm"

></u-datetime-picker>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {labTitleIcon,labTimeIcon} from '@/static/icon'
import {timestampToTime} from '@/utils/utils'
import {getInspectionTask} from '@/api'
const list = ref([
  {
    name: "课程开门巡检",
    id:1
  },
  {
    name: "课后关门巡检",
    id:2
  }
]);
const formData = ref<any>({})
const dataTime = ref(Date.now());
const InspectionType = ref(1)
onShow(()=>{
  getList()
})
const getList = async () => {
  const res = await getInspectionTask({
    InspectionType:InspectionType.value,
    SearchDate:timestampToTime(dataTime.value,'2')
  })
  formData.value = res
}
const show = ref(false);
const tabClick = (item) => {
  InspectionType.value = item.id
  getList()
}
const handleTime = () => {
  show.value = true
}
const confirm = (val) => {
  dataTime.value = val.value
  getList()
  show.value = false
}

</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.lab-tab {
  border-bottom: 1rpx solid #dcdcdc;
  background-color: #fff;
}
.lab-content {
  padding: 0 20rpx;
}
.u-tabs__wrapper__nav__line {
  bottom: 0 !important;
}
.lab-content-item {
  margin-top: 20rpx;
  border-radius: 10rpx;
  width: 420rpx;
  height: 88rpx;
  background: #fff;
  line-height: 88rpx;
  text-align: center;
  .lab-time-icon {
    display: inline-block;
    width: 28rpx;
    height: 28rpx;
  }
  .lab-time-span {
    display: inline-block;
    padding: 0 20rpx 0 30rpx;
    font-size: 30rpx;
    color: #333;
  }
  .u-icon {
    display: inline-block !important;
    width: 28rpx;
    height: 16rpx;
  }
}
.labs-content-item {
  margin-top: 20rpx;
  .labs-content-item-content {
    padding: 0 25rpx;
    border-radius: 21rpx;
    background: #fff;
  }
  .labs-content-title {
    padding: 25rpx 0;
    border-bottom: 1rpx solid #e3e3e3;
  }
  .labs-icon {
    display: inline-block;
    margin-right: 15rpx;
    width: 52rpx;
    height: 52rpx;
    vertical-align: middle;
    font-weight: bold;
    font-size: 36rpx;
    color: #333;
  }
  .labs-content-con {
    .labs-content-con-item {
      padding: 30rpx 0;
      span {
        font-weight: 500;
        font-size: 29rpx;
      }
    }
    .labs-content-con-label {
      margin-right: 70rpx;
      color: #666;
    }
    .labs-content-con-span {
      color: #333;
    }
    .labs-con-span-status {
      padding-left: 30rpx;
      font-size: 30rpx;
      color: #43bbbe;
    }
    .labs-btn-box {
      padding-bottom: 30rpx;
      text-align: right;
      .labs-btn-ope,
      .labs-btn-cancel {
        display: inline-block;
        padding: 0rpx 70rpx;
        border-radius: 10rpx;
        height: 68rpx;
        line-height: 68rpx;
        font-weight: bold;
        font-size: 30rpx;
      }
      .labs-btn-ope {
        background: #3d94ef;
        color: #fff;
      }
      .labs-btn-cancel {
        border: 1px solid #fe6466;
        color: #fe6466;
      }
    }
  }
}
</style>
