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
      <div class="labs-content-item" v-for="(item,index) in formData" :key="index">
        <div class="labs-content-item-content">
          <div class="labs-content-title clearfix">
            <div class="labs-already-ins" v-if="item.TaskStatus === 1">已巡检</div>
            <div>
              <img class="labs-icon" :src="labTitleIcon" />
              {{item.Name}}
            </div>
          </div>
          <div class="labs-content-con">
            <img class="labs-status-img" :src="item.DeviceStatus === 0 ? RunSuccess : RunError" alt=""/>
            <!-- <img :src="RunError" alt=""/> -->
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">开课信息</span>
              <span class="labs-content-con-span"
                >{{item.Begins}}</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">设备状态</span>
              <span class="labs-content-con-span">
                <u-icon name="checkmark-circle-fill" v-if="item.DeviceStatus === 0" color="#54CB2F"/>
                <u-icon name="error-circle-fill" v-else color="#FF3E3D"/>
                {{ item.DeviceStatus === 0 ? '正常' : '异常' }}
              </span>
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">门禁状态</span>
              <span class="labs-content-con-span">
                <u-icon name="close-circle-fill" v-if="item.IsOpen === 0" color="#999999"/>
                <u-icon name="checkmark-circle-fill" v-else color="#54CB2F"/>
                {{ item.IsOpen === 0 ? '关闭' : '开启' }}
              </span>
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">巡检任务</span>
              <span class="labs-content-con-span">
                {{item.TaskMsg}}
              </span>
            </div>
          </div>
          <div class="labs-duty-result">
            <div class="labs-duty-result-title">
              巡检结果
            </div>
            <div class="labs-duty-status" v-if="item.TaskResult === 0">
              <img class="labs-duty-status-img" :src="LabStatus" alt="" />
              <span>正常</span>
            </div>
            <div class="labs-duty-status" v-else>
              <span class="lab-duty-status-icon"></span>
              <span>异常</span>
              <span class="lab-detail">{{ item.ErrMsg }}</span>
            </div>
          </div>
          <div class="labs-no-ins" v-if="item.TaskStatus === 0">
            <span class="labs-ins-btn" @click="handleAwaitClick(item)">待巡检</span>
          </div>
        </div>
      </div>
      <!-- <div class="labs-content-item">
        <div class="labs-content-item-content">
          <div class="labs-content-title clearfix">
            <div class="labs-already-ins">待巡检</div>
            <div>
              <img class="labs-icon" :src="labTitleIcon" />
              第一节
            </div>
          </div>
          <div class="labs-content-con">
            <img class="labs-status-img" :src="RunError" alt=""/>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">开课信息</span>
              <span class="labs-content-con-span"
                >第1节</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">设备状态</span>
              <span class="labs-content-con-span"
                ><u-icon name="checkmark-circle-fill" color="#54CB2F"></u-icon>开启</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">门禁状态</span>
              <span class="labs-content-con-span">
                <u-icon name="close-circle-fill" color="#999999"></u-icon>关闭
              </span>
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">电闸状态</span>
              <span class="labs-content-con-span">
                <u-icon name="error-circle-fill" color="#FF3E3D"></u-icon>异常
              </span>
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">巡检任务</span>
              <span class="labs-content-con-span">
                请在上午第1节课前进行课前巡检 开启并确认设备状态
              </span>
            </div>
          </div>
          <div class="labs-duty-result">
            <div class="labs-duty-result-title">
              巡检结果
            </div>
            <div class="labs-duty-status">
              <img class="labs-duty-status-img" :src="LabStatus" alt="" />
              <span>正常</span>
            </div>
            <div class="labs-duty-status">
              <span class="lab-duty-status-icon"></span>
              <span>异常</span>
              <span class="lab-detail">简要描述填写异常信息</span>
            </div>
          </div>
        </div>
      </div>
      <div class="labs-content-item">
        <div class="labs-content-item-content">
          <div class="labs-content-title clearfix">
            <div>
              <img class="labs-icon" :src="labTitleIcon" />
              第一节
            </div>
          </div>
          <div class="labs-content-con">
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">开课信息</span>
              <span class="labs-content-con-span"
                >第1节</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">设备状态</span>
              <span class="labs-content-con-span"
                ><u-icon name="checkmark-circle-fill" color="#54CB2F"></u-icon>开启</span
              >
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">门禁状态</span>
              <span class="labs-content-con-span">
                <u-icon name="close-circle-fill" color="#999999"></u-icon>关闭
              </span>
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">电闸状态</span>
              <span class="labs-content-con-span">
                <u-icon name="error-circle-fill" color="#FF3E3D"></u-icon>异常
              </span>
            </div>
            <div class="labs-content-con-item">
              <span class="labs-content-con-label">巡检任务</span>
              <span class="labs-content-con-span">
                请在上午第1节课前进行课前巡检 开启并确认设备状态
              </span>
            </div>
          </div>
          <div class="labs-no-ins">
            <span class="labs-ins-btn" @click="handleAwaitClick">待巡检</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
  <u-modal :show="show" title="请选择" @cancel="show = false" @confirm="confirm" ref="uModal" showCancelButton>
   <div class="lab-modal-radio">
      <u-radio-group
        v-model="radioValue"
        placement="column"
      >
        <u-radio
          :customStyle="{marginBottom: '8px'}"
          activeColor="#2D9EFE"
          v-for="(item, index) in radioList"
          :key="index"
          :label="item.name"
          :name="item.id"
        >
        </u-radio>
      </u-radio-group>
      <div class="lab-modal-text" v-if="radioValue === '2'">
        <u--textarea v-model="textVal" placeholder="请输入异常信息"></u--textarea>
      </div>
    </div>
  </u-modal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import {labTitleIcon} from '@/static/icon'
import {RunSuccess,RunError,LabStatus} from '@/static/icon'
import { calculateDistance } from '@/utils/utils'
import {getInspectionTask, submitInspection} from '@/api'
import {timestampToTime} from '@/utils/utils'

onShow(()=>{
  init();
  getList()
})

const init = () => {
  uni.getLocation({
    type: 'gcj02',
    success: function(res) {
      console.log('经度：' + res.longitude);
      console.log('纬度：' + res.latitude);
      console.log('精度：' + res.accuracy);
      const ress = Math.round(calculateDistance([res.longitude, res.latitude],['119.31855', '26.03931']))
      console.log('两个经纬度之间的距离',ress)
    },
    fail: function(err) {
      console.log('获取定位信息失败：' + err.errMsg);
    }
  })
}
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

const getList = async () => {
  const res = await getInspectionTask({
    InspectionType:InspectionType.value,
    SearchDate:timestampToTime(dataTime.value,'2')
  })
  formData.value = res
}

const tabClick = (item) => {
  InspectionType.value = item.id
  getList()
}

const show = ref(false)
const radioList = reactive([
  {
    name: '正常',
    id: '1',
  },
  {
    name: '异常',
    id: '2',
  }
]);
const radioValue = ref('1')
const textVal = ref('')
const Id = ref()
const confirm = async () => {
  if(radioValue.value === '2' && !textVal.value){
    uni.showToast({
      title: '请先输入异常信息' ,
      icon: 'none'
    })
    return
  }
  uni.getLocation({
    type: 'gcj02',
    success: async function(res) {
      const {longitude,latitude} = res
      await submitInspection({
        Id:Id.value,
        CheckStatus:radioValue.value,
        CheckErrorLog:textVal.value,
        latitude,
        longitude
      })
      show.value=false
      getList()
    },
    fail: function(err) {
    }
  })
}
const handleAwaitClick = (item) => {
  show.value = true
  Id.value = item.Id
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
  padding: 0 20rpx 25rpx;
}
.u-tabs__wrapper__nav__line {
  bottom: 0 !important;
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
    .labs-already-ins {
      float: right;
      border: 1px solid #38b5b9;
      border-radius: 10rpx;
      width: 140rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      font-size: 28rpx;
      color: #38b5b9;
      &.no-ins {
        border: 1px solid #ff9600;
        color: #ff9600;
      }
    }
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
    position: relative;
    .labs-status-img {
      display: block;
      position: absolute;
      right: 75rpx;
      top: 100rpx;
      width: 160rpx;
      height: 160rpx;
    }
    .labs-content-con-item {
      display: flex;
      padding: 30rpx 0;
      span {
        font-weight: 500;
        font-size: 29rpx;
      }
    }
    .labs-content-con-label {
      margin-right: 70rpx;
      width: 140rpx;
      color: #666;
    }
    .u-icon {
      display: inline-block !important;
      margin-right: 10rpx !important;
      margin-bottom: 6rpx;
      vertical-align: middle;
    }
    .labs-content-con-span {
      flex: 1;
      line-height: 40rpx;
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
  .labs-duty-result {
    padding: 30rpx 0;
    border-top: 1rpx solid #e3e3e3;
    .labs-duty-result-title {
      padding-bottom: 10rpx;
      font-weight: 500;
      font-size: 32rpx;
      color: #333;
    }
    .labs-duty-status {
      margin: 20rpx 0 0;
      font-size: 30rpx;
      color: #333;
      .lab-duty-status-icon {
        display: inline-block;
        margin-right: 10rpx;
        border: 1px solid #d2d2d2;
        border-radius: 2rpx;
        width: 29rpx;
        height: 29rpx;
        vertical-align: bottom;
      }
      .labs-duty-status-img {
        display: inline-block;
        margin-right: 10rpx;
        margin-bottom: 9rpx;
        width: 30rpx;
        height: 30rpx;
        vertical-align: middle;
      }
    }
    .lab-detail {
      display: inline-block;
      margin: 0 0 0 20rpx;
      padding-top: 4rpx;
      font-size: 30rpx;
      color: #ff3e3d;
    }
  }
  .labs-no-ins {
    padding-bottom: 30rpx;
    text-align: right;
    .labs-ins-btn {
      display: inline-block;
      border: 1px solid #3d94ef;
      border-radius: 10rpx;
      width: 140rpx;
      height: 52rpx;
      background-color: #3d94ef;
      line-height: 52rpx;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
    }
  }
}
.lab-modal-radio,
.lab-modal-text {
  display: block;
  width: 100%;
}
</style>
