<template>
  <div class="office-box" v-if="list.length > 0">
    <div class="office-item" v-for="item in list" :key="item.Id">
      <div class="labs-content-title">
        <div>
          <img class="labs-icon" :src="labTitleIcon" />
          {{item.Begins}}
        </div>
      </div>
      <div class="office-already" v-if="item.TaskStatus === 1 ||item.TaskStatus === 2">
        <span class="office-already-text">
          已签到
        </span>
        <span class="office-already-to" v-if="item.SignTo">
          已签给{{item.SignTo }}
        </span>
      </div>
      <div class="office-sign" v-else>
        <div class="office-sign-btn" @click="handleSign(item.Id)">
          签到
        </div>
        <div class="office-sign-to" @click="handleTo(item.Id)">
          签给别人
        </div>
      </div>
    </div>
  </div>
  <Empty v-else/>
  <u-picker :show="show" :close-on-click-overlay="true" key-name="RealName" :columns="columns" @cancel="show = false" @close="show = false" @confirm="confirm" @change="changeHandler"></u-picker>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {labTitleIcon} from '@/static/icon'
import Empty from '@/components/Empty/index.vue'
import { getDutyCheckIn, getDutyList, getStudentList } from '@/api';

const list = ref([])

const show = ref(false);
const columns = ref<any>([]);
onShow(()=>{
  init()
  getStudent()
})
const init = async() => {
  const res = await getDutyList({
    SearchDate:''
  })
  list.value = res
}
const getStudent = async() => {
  const studentRes = await getStudentList({
    page:1,
    pagesize:1000
  })
  columns.value = [studentRes.data]
}
let Id = 0
const handleTo = (id) => {
  Id = id
  show.value = true
}

const confirm = (e) => {
  handleSign(Id,e.value[0].Id)
  show.value = false

}
const changeHandler = (e) => {
  const {
    columnIndex,
    index,
    picker
  } = e;
}
const handleSign = async (Id,UserId=0) => {
  uni.getLocation({
    type: 'gcj02',
    success: async function(res) {
      const {longitude,latitude} = res
      console.log('经度：' + res.longitude);
      console.log('纬度：' + res.latitude);
      await getDutyCheckIn({
        Id,latitude,longitude,
        UserId
      })
      uni.$u.toast('签到成功')
      init()
    },
    fail: function(err) {
    }
  })
}
</script>

<style scoped lang="scss">
.office-box {
  margin: 30rpx;
  padding-bottom: 20rpx;
}
.office-item {
  padding: 0 30rpx;
  border-radius: 18rpx;
  background: #fff;
  .labs-content-title {
    padding: 25rpx 0;
    border-bottom: 1rpx solid #e3e3e3;
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
  }
  .office-already,
  .office-sign {
    padding: 25rpx 0;
  }
  .office-already-text {
    display: inline-block;
    margin-right: 130rpx;
    font-weight: 500;
    font-size: 30rpx;
    color: #3d94ef;
  }
  .office-already-to {
    display: inline-block;
    line-height: 89rpx;
    font-weight: 500;
    font-size: 30rpx;
    color: #3dbabc;
  }
  .office-sign-btn {
    display: inline-block;
    margin-right: 25rpx;
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
  .office-sign-to {
    display: inline-block;
    border-radius: 10rpx;
    width: 198rpx;
    height: 68rpx;
    background: #3dbabc;
    line-height: 68rpx;
    text-align: center;
    font-weight: bold;
    font-size: 30rpx;
    color: #fff;
  }
}
</style>
