<template>
  <view>
    <div class="search-box">
      <div class="search-item" @click="pick">
        <span class="search-item-title">学期</span>
        <u-icon name="arrow-down"></u-icon>
      </div>
      <div class="search-item">
        <span class="search-item-title">周数</span><u-icon name="arrow-down"></u-icon>
      </div>
    </div>
    <div class="search-day">
        <Tabs :tab-list="list" @tab-change="tabClick" />
    </div>
  </view>
  <u-picker :show="show" :close-on-click-overlay="true" :columns="columns" @cancel="close" @close="close" @confirm="confirm" @change="changeHandler"></u-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tabs from '@/components/Tabs/index.vue'
const list = ref([
  {
    name: "11-10周一",
  },
  {
    name: "11-10周二",
  },
  {
    name: "11-10周三",
  },
  {
    name: "11-10周四",
  },
  {
    name: "11-10周五",
  },
  {
    name: "11-10周六",
  },
  {
    name: "11-10周日",
  },
]);
const show = ref(false);
const columns = reactive([
  ['中国', '美国'],
  ['深圳', '厦门', '上海', '拉萨']
]);
const tabClick = (val) => {
  console.log(val)
}

const pick = () => {
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
</script>

<style lang="scss">
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
.search-day {
  overflow: hidden;
  overflow-x: auto;
  border-bottom: 1rpx solid #ececec;
  width: auto;
  height: 98rpx;
  background: #fff;
  .search-day-item {
    float: left;
  }
}
</style>
