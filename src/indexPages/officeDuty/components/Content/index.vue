<template>
  <div class="office-box">
    <div class="office-item">
      <div class="labs-content-title">
        <div>
          <img class="labs-icon" :src="labTitleIcon" />
          第一节
        </div>
      </div>
      <!-- <div class="office-already">
        <span class="office-already-text">
          已签到
        </span>
        <span class="office-already-to">
          已签给张三
        </span>
      </div> -->
      <div class="office-sign" @click="handleSign">
        <div class="office-sign-btn">
          签到
        </div>
        <div class="office-sign-to" @click="tabClick">
          签给别人
        </div>
      </div>
    </div>
  </div>
  <u-picker :show="show" :close-on-click-overlay="true" :columns="columns" @cancel="close" @close="close" @confirm="confirm" @change="changeHandler"></u-picker>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {labTitleIcon} from '@/static/icon'
const show = ref(false);
const columns = reactive([
  ['张三', '里斯','王五'],
]);
const tabClick = (val) => {
  show.value = true
}

const close = () => {
  show.value = false

}
const confirm = () => {
  show.value = false

}
const changeHandler = (e) => {
  const {
    columnIndex,
    index,
    picker
  } = e;
}

const handleSign = () => {
  uni.$u.toast('签到成功')
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
