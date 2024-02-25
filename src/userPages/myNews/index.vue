<template>
  <scroll-view v-if="list.length > 0" scroll-y="true" @scrolltolower="loadMore" :style="{ height: scrollH + 'rpx' }">
    <div class="news-box">
      <div class="news-item" v-for="item in list" :key="item.id">
        <div class="news-title clearfix">
          <div class="news-title-time">{{ item.AddTime }}</div>
          <div class="news-title-content">
            <span class="news-note"/>
            <!-- <span class="news-status waring">审核</span> -->
            <span class="news-title-name">{{ item.Title }}</span>
          </div>
        </div>
        <div class="news-content h-line-1">
          {{ item.Content }}
        </div>
        <div class="news-details clearfix" @click="jump(item)">
          <div class="news-details-icon">&gt;</div>
          查看详情
        </div>
      </div>
    </div>
    <div class="no-more" v-if="noMore">
      没有更多了~
    </div>
  </scroll-view>
  <div class="news-no" v-else>
    <img class="no-img" :src="NoIcon" alt="" />
    <img class="no-name-img" :src="NoName" alt="" />
  </div>
</template>

<script setup lang="ts">
import {NoIcon,NoName} from '@/static/icon'
import { onShow } from "@dcloudio/uni-app"
import { ref } from 'vue';
import { getMessageList } from '@/api';

const list=ref<any>([])

let page = 1
const pagesize = 10
const scrollH = ref(0)
const noMore = ref(false)

onShow(()=>{
  init()
  scrollHs()
})

const loadMore = () => {
  if(noMore.value)return
  page+=1
  init()
}

const init = async () => {
  const res = await getMessageList({
    page,pagesize
  }) as any
  if(res.length === 0){
    noMore.value = true
  }
  list.value = list.value.concat(res)
}

const scrollHs = () => {
  let sys = uni.getSystemInfoSync()
  let winWidth = sys.windowWidth
  let winrate = 750 / winWidth
  let winHeight = parseInt(sys.windowHeight * winrate as any)
  scrollH.value =  winHeight - 20
}

const jump = (item) => {
  uni.setStorageSync('newData', item)
  uni.navigateTo({
    url: '/userPages/newsDetails/index',
  })
}


</script>

<style lang="scss">
page {
  height: auto;
  background-color: $uni-bg-color-grey;
}
.no-more {
  display: block;
  padding: 24rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #999;
}
.news-box {
  padding: 0 30rpx;
  .news-item {
    margin-top: 25rpx;
    padding: 0 25rpx;
    border-radius: 14rpx;
    background: #fff;
    .news-title {
      padding: 20rpx 0;
      border-bottom: 1rpx solid #e3e3e3;
    }
    .news-title-time {
      float: right;
      margin-top: 10rpx;
      font-weight: 500;
      font-size: 22rpx;
      color: #999;
    }
    .news-note {
      display: inline-block;
      margin-right: 10rpx;
      border-radius: 50%;
      width: 13rpx;
      height: 13rpx;
      background: #f00;
    }
    .news-status {
      margin-right: 10rpx;
      padding: 2rpx 5rpx;
      border-radius: 3rpx;
      height: 31rpx;
      background: #fd9a30;
      line-height: 31rpx;
      font-weight: 500;
      font-size: 22rpx;
      color: #fff;
      &.waring {
        background: #ff3e3d;
      }
      &.inform {
        background: #3c9df3;
      }
      &.approve {
        background: #fd9a30;
      }
    }
    .news-title-name {
      font-weight: bold;
      font-size: 30rpx;
      color: #0b0b0b;
    }
    .news-content {
      padding: 20rpx 0;
      border-bottom: 1rpx solid #e3e3e3;
      font-weight: 500;
      font-size: 28rpx;
      color: #003;
    }
    .news-details {
      padding: 20rpx 0;
      font-weight: 500;
      font-size: 22rpx;
      color: #666;
    }
    .news-details-icon {
      float: right;
    }
  }
}
.news-no {
  padding: 160rpx 20rpx;
  .no-img {
    display: block;
    margin: 0 auto;
    width: 717rpx;
    height: 564rpx;
  }
  .no-name-img {
    display: block;
    margin: 110rpx auto 0;
    width: 176rpx;
    height: 30rpx;
  }
}
</style>
