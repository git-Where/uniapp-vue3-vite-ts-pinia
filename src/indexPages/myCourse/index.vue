<template>
  <div class="lab-inspect-box">
    <div class="lab-content">
      <u-sticky bgColor="#f5f5f5">
        <div class="lab-content-item" @click="handleTime">
          <img class="lab-time-icon" :src="labTimeIcon" alt="" />
          <span class="lab-time-span">{{ semesterName }}</span>
          <u-icon class="lab-time-down" name="arrow-down"></u-icon>
        </div>
      </u-sticky>
      <div v-if="formData.length > 0">
        <div class="labs-content-item" v-for="item in formData" :key="item.Id">
          <div class="labs-content-item-content">
            <div class="labs-content-title">
              <img class="labs-icon" :src="ApproveIcon" />
              {{item.Name}}
            </div>
            <div class="labs-content-con">
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">指导老师</span>
                <span class="labs-content-con-span"
                  >{{item.TeacherName}}</span
                >
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">授课年级</span>
                <span class="labs-content-con-span"
                  >{{item.GradeNames}}</span
                >
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">学期</span>
                <span class="labs-content-con-span">
                  {{semesterName}}
                </span>
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">总学时</span>
                <span class="labs-content-con-span">
                  {{item.Total_Hours}}
                </span>
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">实验课时</span>
                <span class="labs-content-con-span">
                  {{item.Experimental_Hours}}
                </span>
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">已排课时</span>
                <span class="labs-content-con-span">
                  {{item.Already_Hours}}
                </span>
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">状态</span>
                <span class="labs-content-con-span status-color">
                  {{item.ArrangeStatusKey}}
                </span>
              </div>
              <div class="labs-content-con-item">
                <span class="labs-content-con-label">最近排课情况</span>
                <span class="labs-content-con-span">
                  {{formatDateDay(item.Date)}} {{item.StartLesson}}-{{item.EndLesson}}节  {{item.RoomCode}}
                </span>
              </div>
              <div class="labs-content-con-item">
                <div class="course-btn" @click="jumpSignature(item)">
                  {{item.StudentName ? '已签名' : '学生代表签名'}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Empty v-else/>
    </div>
  </div>
  <u-picker
    :show="show"
    :columns="columns"
    :defaultIndex="defaultIndex"
    :close-on-click-overlay="true"
    key-name="Name"
    :showToolbar="true"
    @close="show = false"
    @cancel="show = false"
    @confirm="confirm"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ApproveIcon,labTimeIcon} from '@/static/icon'
import {formatDate, isDateInRange,formatDateDay} from '@/utils/utils'
import Empty from '@/components/Empty/index.vue'
import { getMyCourses, getSemesterAll } from '@/api';

const show = ref(false);
const columns = ref()
const defaultIndex = ref()
const semesterName = ref();
const formData = ref([]);

onShow(()=>{
  init()
})

const init = async () => {
  const res = await getSemesterAll() as any
  let semesterId = ''
  res?.map((item,index)=>{
    const startDateStr = formatDate(item.Begin_Date).split(' ')[0]
    const endDateStr = formatDate(item.End_Date).split(' ')[0]
    if(isDateInRange(startDateStr,endDateStr)){
      semesterId = item.Id
      defaultIndex.value = [index]
      semesterName.value = item.Name
    }else{
      semesterId = res[0].Id
      defaultIndex.value = [0]
      semesterName.value = res[0].Name
    }
  })
  columns.value = [res]
  getCourse(semesterId)
}

const getCourse = async (semesterId) => {
  const resData = await getMyCourses({
    semesterId
  })
  formData.value = resData
}

const handleTime = () => {
  show.value = true
}

const confirm = (val) => {
  semesterName.value = val.value[0].Name
  getCourse(val.value[0].Id)
  show.value = false
}

const jumpSignature = (item) => {
  if(item.StudentName){
    return uni.previewImage({
      urls: [item.StudentName]
    });
  }
  uni.navigateTo({
    url:`../../pages/signature/index?Id=${item.Id}`
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.lab-content {
  padding: 0 20rpx;
}
.u-sticky {
  padding-top: 20rpx;
  border-radius: 10rpx;
}
.lab-content-item {
  display: inline-block;
  padding: 0 20rpx;
  border-radius: 10rpx;
  width: auto;
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
    padding-bottom: 10rpx;
    .labs-content-con-item {
      padding: 30rpx 0;
      font-size: 30rpx;
      span {
        font-weight: 500;
        font-size: 29rpx;
      }
    }
    .labs-content-con-label {
      display: inline-block;
      width: 210rpx;
      color: #666;
    }
    .labs-content-con-span {
      color: #333;
      &.status-color {
        color: #35b3b8;
      }
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
    .course-btn {
      display: block;
      border: 1px solid #3d94ef;
      border-radius: 10rpx;
      width: 230rpx;
      height: 68rpx;
      line-height: 68rpx;
      text-align: center;
      font-weight: 500;
      font-size: 30rpx;
      color: #3d94ef;
    }
  }
}
</style>
