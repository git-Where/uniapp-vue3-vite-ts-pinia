<template>
  <div class="month-box">
    <u-sticky bgColor="#fff">
      <div class="search-box">
        <div class="search-item" @click="pick('1')">
          <span class="search-item-title">{{ semesterName }}</span
          ><u-icon name="arrow-down"></u-icon>
        </div>
        <div class="search-item" @click="pick('2')">
          <span class="search-item-title">{{ currentMonth }}月</span
          ><u-icon name="arrow-down"></u-icon>
        </div>
        <div class="search-item" v-if="roleId === 0" @click="pick('3')">
          <span class="search-item-title">{{ UserName || '请选择' }}</span
          ><u-icon name="arrow-down"></u-icon>
        </div>
      </div>
    </u-sticky>
    <div class="month-content">
      <div class="month-item">
        <div class="form-title">
          <img
            class="form-title-icon"
            :src="InviteTitleIcon"
            alt=""
          />实验室值班任务
        </div>
        <div class="month-complete-item">
          <div class="month-complete-item-title">完成情况</div>
          <div class="month-complete-item-con">
            <div class="month-complete-item-left">
              <div class="month-item-count">
                <span class="month-item-num">{{ list?.InspectionStat?.OnTime }}</span>次
              </div>
              <div class="month-item-text">巡检按时</div>
            </div>
            <div class="month-complete-item-right">
              <div class="month-item-count">
                <span class="month-item-right-num red">{{ list?.InspectionStat?.Lates  }}</span>次
              </div>
              <div class="month-item-text">巡检迟到</div>
            </div>
          </div>
          <div class="month-complete-total">
            累计完成节次：<span class="month-total-num">{{ list?.InspectionStat?.Totals  }}</span>节次<span
              class="month-total-text"
              >（以巡检按时计算）</span
            >
          </div>
        </div>
      </div>
      <div class="month-item">
        <div class="form-title">
          <img
            class="form-title-icon"
            :src="InviteTitleIcon"
            alt=""
          />办公室值班任务
        </div>
        <div class="month-complete-item">
          <div class="month-complete-item-title">完成情况</div>
          <div class="month-complete-item-con">
            <div class="month-complete-item-left">
              <div class="month-item-count">
                <span class="month-item-num">{{ list?.DutyStat?.AllTimes  }}</span>次
              </div>
              <div class="month-item-text">应签到</div>
            </div>
            <div class="month-complete-item-right">
              <div class="month-item-count">
                <span class="month-item-right-num green">{{ list?.DutyStat?.Signs  }}</span>次
              </div>
              <div class="month-item-text">实际签到</div>
            </div>
          </div>
          <div class="month-complete-total">
            累计完成节次：<span class="month-total-num">{{ list?.DutyStat?.Totals  }}</span>节次<span
              class="month-total-text"
              >（以实际签到计算）</span
            >
          </div>
        </div>
      </div>
      <div class="month-item">
        <div class="form-title">
          <img
            class="form-title-icon"
            :src="InviteTitleIcon"
            alt=""
          />加班任务
        </div>
        <div class="month-complete-item">
          <div class="month-complete-item-title">完成情况</div>
          <div class="month-complete-item-con">
            <div class="month-complete-item-left">
              <div class="month-item-count">
                <span class="month-item-num">{{ list?.OvertimeStat?.AllTimes  }}</span>次
              </div>
              <div class="month-item-text">申请情况</div>
            </div>
            <div class="month-complete-item-right">
              <div class="month-item-count">
                <span class="month-item-right-num green">{{ list?.OvertimeStat?.Signs  }}</span>次
              </div>
              <div class="month-item-text">认定情况</div>
            </div>
          </div>
          <div class="month-complete-total">
            累计完成节次：<span class="month-total-num">{{ list?.OvertimeStat?.Totals  }}</span>节次<span
              class="month-total-text"
              >（以认定情况计算）</span
            >
          </div>
        </div>
      </div>
      <div class="month-complete-add">
        总累计完成节次:{{list?.InspectionStat?.Totals}}+{{list?.DutyStat?.Totals}}+{{list?.OvertimeStat?.Totals}}=<span class="month-total-add-num">{{list?.InspectionStat?.Totals+list?.DutyStat?.Totals+list?.OvertimeStat?.Totals}}</span>节次
      </div>
    </div>
  </div>
  <u-picker
    :show="show"
    :close-on-click-overlay="true"
    :defaultIndex="defaultIndex"
    :columns="columns"
    :key-name="keyName"
    @cancel="show = false"
    @close="show = false"
    @confirm="confirm"
  ></u-picker>

<u-datetime-picker
  :show="dateTimeShow"
  v-model="dataTime"
  mode="year-month"
  :closeOnClickOverlay="true"
  @close="dateTimeShow=false"
  @cancel="dateTimeShow = false"
  @confirm="confirm"
  ></u-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {InviteTitleIcon} from '@/static/icon'
import { getDutyMonthlyReport, getSemesterAll, getStudentList } from "@/api";
import { systemInfos } from "@/utils/utils";
const show = ref(false);
const dateTimeShow = ref(false)
const columns:any = ref([]);
const weeks= ref<any>([])
const semesterId = ref()
const semesterName = ref()
const defaultIndex = ref([0])
const list = ref()
const studentParams = ref<any>([])
const keyName = ref('Name')
const currentMonth = ref()
const UserId = ref()
const UserName = ref()
const isType = ref()

const monthArray = [{
      Name:'1月',
      Id:1
    },{
      Name:'2月',
      Id:2
    },{
      Name:'3月',
      Id:3
    },{
      Name:'4月',
      Id:4
    },{
      Name:'5月',
      Id:5
    },{
      Name:'6月',
      Id:6
    },{
      Name:'7月',
      Id:7
    },{
      Name:'8月',
      Id:8
    },{
      Name:'9月',
      Id:9
    },{
      Name:'10月',
      Id:10
    },{
      Name:'11月',
      Id:11
    },{
      Name:'12月',
      Id:12
    }]

const dataTime = ref()
const roleId = ref(systemInfos.Role_Id);

onLoad(()=>{
  init()
})

const init = async () => {
  // 获取学期
  const res = await getSemesterAll()
  weeks.value =  res
  semesterName.value = res[0].Name
  semesterId.value = res[0].Id

  //学期
  const date = new Date();
  currentMonth.value = date.getMonth() + 1;

  // 学生
  const studentRes = await getStudentList({
    page:1,
    pagesize:1000
  })
  studentParams.value = studentRes.data
  UserId.value = studentRes.data[0].Id
  UserName.value = studentRes.data[0].RealName

  initData()
}

const initData = async () => {
  const resData = await getDutyMonthlyReport({
    semesterId:semesterId.value,
    SearchMonthly:currentMonth.value,
    UserId:UserId.value
  })
  list.value = resData
}

const pick = (type:string) => {
  keyName.value = 'Name'
  isType.value = type
  if(type==='1'){
    columns.value = [weeks.value]
    defaultIndex.value = [weeks.value.findIndex((item)=> item.Id === semesterId.value)]
  }
  if(type==='2'){
    columns.value = [monthArray]
    defaultIndex.value = [monthArray.findIndex((item)=> item.Id === currentMonth.value)]
  }
  if(type==='3'){
    keyName.value = 'RealName'
    columns.value = [studentParams.value]
    defaultIndex.value = [studentParams.value.findIndex((item)=> item.Id === UserId.value)]
  }
  show.value = true;
};
const confirm = (e) => {
  const val = e.value[0]
  if(isType.value === '1'){
    semesterName.value = val.Name
    semesterId.value = val.Id
  }
  if(isType.value === '2'){
    currentMonth.value = val.Id
  }
  if(isType.value === '3'){
    UserId.value = val.Id
    UserName.value = val.RealName
  }
  initData()
  show.value = false;
};
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.month-box {
  padding-bottom: 132rpx;
  .u-icon {
    display: inline-block !important;
    width: 28rpx;
    height: 16rpx;
  }
  .search-box {
    display: flex;
    padding: 10rpx;
    border-bottom: 1rpx solid #ececec;
    background: #fff;
    .search-item {
      flex: auto;
      margin: 10rpx;
      padding: 0 24rpx;
      border-radius: 10rpx;
      height: 66rpx;
      background: #f4f6f7;
      line-height: 66rpx;
      text-align: center;
      .search-item-title {
        display: inline-block;
        padding-right: 10rpx;
        font-weight: 500;
        font-size: 28rpx;
        color: #333;
      }
    }
  }
  .form-title {
    padding: 30rpx 22rpx;
    font-weight: bold;
    font-size: 36rpx;
    color: #666;
    .form-title-icon {
      display: inline-block;
      margin-right: 10rpx;
      width: 30rpx;
      height: 64rpx;
      vertical-align: middle;
    }
  }
  .month-complete-item {
    padding: 0 25rpx;
    border-radius: 30rpx;
    background: #fff;
    .month-complete-item-title {
      padding: 30rpx 0;
      border-bottom: 1rpx solid #ebebeb;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      color: #2b89f3;
    }
    .month-complete-item-con {
      display: flex;
      border-bottom: 1rpx solid #ebebeb;
    }
    .month-complete-item-left {
      border-right: 1rpx solid #ebebeb;
    }
    .month-complete-item-left,
    .month-complete-item-right {
      flex: auto;
      padding: 30rpx 0;
      text-align: center;
    }
    .month-item-count {
      font-size: 24rpx;
      color: #999;
    }
    .month-item-num {
      font-weight: bold;
      font-size: 42rpx;
      color: #2b89f3;
    }
    .month-item-right-num {
      font-weight: bold;
      font-size: 42rpx;
      &.red {
        color: #ff6564;
      }
      &.green {
        color: #55d086;
      }
    }
    .month-item-text {
      font-size: 30rpx;
      color: #333;
    }
    .month-complete-total {
      padding: 40rpx 0;
      text-align: center;
      font-size: 30rpx;
      color: #333;
    }
    .month-total-num {
      color: #3d93ef;
    }
    .month-total-text {
      color: #999;
    }
  }
  .month-complete-add {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 102rpx;
    background-color: #fff;
    line-height: 102rpx;
    text-align: center;
    font-size: 32rpx;
    color: #333;
    .month-total-add-num {
      color: #2b89f3;
    }
  }
}
</style>
