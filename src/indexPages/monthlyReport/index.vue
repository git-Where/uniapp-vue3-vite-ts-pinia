<template>
  <div class="month-box">
    <u-sticky bgColor="#fff">
      <div class="search-box">
        <div class="search-item" @click="pick('1')">
          <span class="search-item-title">2023学年上</span
          ><u-icon name="arrow-down"></u-icon>
        </div>
        <div class="search-item" @click="pick('2')">
          <span class="search-item-title">11月</span
          ><u-icon name="arrow-down"></u-icon>
        </div>
        <div class="search-item" @click="pick('3')">
          <span class="search-item-title">林某某</span
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
                <span class="month-item-num">13</span>次
              </div>
              <div class="month-item-text">巡检按时</div>
            </div>
            <div class="month-complete-item-right">
              <div class="month-item-count">
                <span class="month-item-right-num red">2</span>次
              </div>
              <div class="month-item-text">巡检按时</div>
            </div>
          </div>
          <div class="month-complete-total">
            累计完成节次：<span class="month-total-num">10</span>节次<span
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
          />实验室值班任务
        </div>
        <div class="month-complete-item">
          <div class="month-complete-item-title">完成情况</div>
          <div class="month-complete-item-con">
            <div class="month-complete-item-left">
              <div class="month-item-count">
                <span class="month-item-num">13</span>次
              </div>
              <div class="month-item-text">应签到</div>
            </div>
            <div class="month-complete-item-right">
              <div class="month-item-count">
                <span class="month-item-right-num green">2</span>次
              </div>
              <div class="month-item-text">实际签到</div>
            </div>
          </div>
          <div class="month-complete-total">
            累计完成节次：<span class="month-total-num">10</span>节次<span
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
          />实验室值班任务
        </div>
        <div class="month-complete-item">
          <div class="month-complete-item-title">完成情况</div>
          <div class="month-complete-item-con">
            <div class="month-complete-item-left">
              <div class="month-item-count">
                <span class="month-item-num">13</span>次
              </div>
              <div class="month-item-text">申请情况</div>
            </div>
            <div class="month-complete-item-right">
              <div class="month-item-count">
                <span class="month-item-right-num green">2</span>次
              </div>
              <div class="month-item-text">认定情况</div>
            </div>
          </div>
          <div class="month-complete-total">
            累计完成节次：<span class="month-total-num">10</span>节次<span
              class="month-total-text"
              >（以巡检按时计算）</span
            >
          </div>
        </div>
      </div>
      <div class="month-complete-add">
        总累计完成节次:10+8+8=<span class="month-total-add-num">22</span>节次
      </div>
    </div>
  </div>
  <u-picker
    :show="show"
    :close-on-click-overlay="true"
    :columns="columns"
    @cancel="close"
    @close="close"
    @confirm="confirm"
    @change="changeHandler"
  ></u-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {InviteTitleIcon} from '@/static/icon'
const show = ref(false);
const columns:any = ref([]);

const pick = (type:string) => {
  show.value = true;
  if(type==='1'){
    columns.value = [["2023学年上", "2023学年下"]]
  }
  if(type==='2'){
    columns.value = [["1月", "2月",'3月','4月']]
  }
  if(type==='3'){
    columns.value = [["叶某某", "林某某"]]
  }

};
const close = () => {
  show.value = false;
};
const confirm = () => {
  show.value = false;
};
const changeHandler = (e) => {
  const { columnIndex, index, picker } = e;
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
