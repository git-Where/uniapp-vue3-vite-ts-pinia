
<template>
  <view class="content">
    <div class="index-nav" :style="{background:navBg?'#3D94EF':'transparent'}">
      <div class="index-box" :style="{marginTop:statusHeight+'rpx'}">
        <div class="index-title" :style="{height:navigationBarHeight*2+'rpx',lineHeight:navigationBarHeight*2+'rpx'}">首页</div>
      </div>
    </div>
    <scroll-view scroll-y="true" :style="{height:'100vh'}"  @scroll="onPageScroll">
      <img class="index-bg" :src="IndexBg" alt="">
      <div class="banner-swiper" :style="{marginTop:`-${350-(statusHeight+navigationBarHeight*2)}rpx`}">
        <u-swiper
          :list="list"
          indicator
          indicatorMode="line"
          circular
          @change="e => current = e.current"
        >
        <template #indicator>
          <view
              class="indicator"
          >
              <view
                class="indicator__dot"
                v-for="(item, index) in list"
                :key="index"
                :class="[index === current && 'indicator__dot--active']"
              >
              </view>
          </view>
      </template>
        </u-swiper>
      </div>
      <div class="sort-box">
        <div class="sort-item" v-for="(item, index) in sortList" :key="index">
          <div class="sort-item-title">
            <img class="sort-icon" :src="SortIcon" alt="">
            {{item.name}}
          </div>
          <div class="sort-item-content clearfix" v-if="item.subList.length>0">
            <div class="sort-item-content-item"  @click="jump(subItem)"  v-for="(subItem, subIndex) in item.subList" :key="subIndex">
              <img class="sort-item-content-icon" :src="subItem.icon" alt="">
              <div class="sort-item-content-text">
                {{subItem.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sort-box" v-if="roleId === 3">
        <div class="sort-item">
          <div class="sort-item-title">
            <img class="sort-icon" :src="SortIcon" alt="">
            任务提醒
          </div>
          <div class="wake-box">
            <div class="wake-item">
              <img class="wake-item-icon" :src="WakeUp" alt="">
              <div class="wake-item-text">
                <div class="wake-item-title clearfix">
                  <div class="wake-item-title-time">一小时前</div>
                  值班任务提醒
                </div>
                <div class="wake-item-content h-line-2">
                  {{ellipsis('【411】今日五六节有《大数据库导论课程》请于半个小时内开门【411】今日五六节有《大数据库导论课程》请于半个小时内开门')}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { useTitle } from '@/hooks/useTitle';
import { forward } from '@/utils/router';
import {Banner,IndexBg,SortIcon,WakeUp, Icon1,Icon10,Icon11,Icon12,Icon13,Icon14,Icon15,Icon16,Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9} from '@/static/icon'
import { navBarHeight } from '@/utils/navBarUtils';
import { systemInfos } from '@/utils/utils';
import {RoleList} from './constant'

const { title, changeTitle } = useTitle();
function goTest() {
  forward('test', {
    a: 1
  });
}

const roleId = ref(systemInfos.Role_Id);
const sortList = ref(RoleList[4])

const statusHeight = ref(0)
const navigationBarHeight = ref(0)
const list = ref([
  Banner,
  Banner,
  Banner,
])
const current= ref(0)
const navBg = ref(false)

onShow(() => {
  const token = uni.getStorageSync('token') || '';
  if(!token){
    return uni.reLaunch({
      url:'/pages/login/index'
    })
  }else{
    init()
  }
});

const init = async () => {
  const res = await navBarHeight()
  statusHeight.value = res.statusHeight*2
  navigationBarHeight.value = res.navigationBarHeight
}


const jump = (item) => {
  if(item.type === 'tab'){
    return uni.switchTab({
      url:item.url
    })

  }
  uni.navigateTo({
    url:item.url
  });
}

const ellipsis = (val) => {
  if(val.length > 45){
    return val.slice(0,45)+'...'
  }
  return val
}

const onPageScroll = (event) => {
  if(event.detail.scrollTop > 30){
    navBg.value = true
  }else{
    navBg.value = false
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.content {
  .index-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 111;
    transition: all 0.3s;
  }
  .index-bg {
    display: block;
    width: 100%;
    height: 365rpx;
  }
  .index-box {
    position: relative;
    z-index: 11;
  }
  .index-title {
    text-align: center;
    font-size: 26rpx;
    color: #fff;
  }
  .banner-swiper {
    margin-left: 25rpx;
    margin-right: 25rpx;
    margin-bottom: 25rpx;
    .u-swiper {
      border-radius: 6rpx;
      .indicator {
        @include flex(row);
        justify-content: center;
        &__dot {
          margin: 0 5rpx;
          border-radius: 100px;
          width: 12rpx;
          height: 12rpx;
          background-color: rgba(255, 255, 255, 0.3);
          transition: background-color 0.3s;
          &--active {
            background-color: #fff;
          }
        }
      }
    }
  }
  .sort-item {
    margin: 0 25rpx 25rpx;
    border-radius: 20rpx;
    background: #fff;
    font-weight: bold;
    font-size: 32rpx;
    color: #333;
    .sort-item-title {
      margin: 0 20rpx;
      padding: 20rpx 0 10rpx;
      border-bottom: 1rpx solid #e3e3e3;
      .sort-icon {
        display: inline-block;
        margin-right: 3rpx;
        width: 30rpx;
        height: 55rpx;
        vertical-align: middle;
      }
    }
    .sort-item-content-item {
      float: left;
      padding: 35rpx 20rpx;
      width: 130rpx;
      text-align: center;
    }
    .sort-item-content-icon {
      display: block;
      margin: 0 auto;
      width: 70rpx;
      height: 70rpx;
    }
    .sort-item-content-text {
      font-size: 26rpx;
      color: #333;
    }
  }
  .wake-box {
    .wake-item {
      display: flex;
      padding: 30rpx 20rpx;
      .wake-item-icon {
        display: block;
        margin-right: 20rpx;
        width: 72rpx;
        height: 72rpx;
      }
      .wake-item-text {
        flex: 1;
      }
      .wake-item-title {
        font-weight: 500;
        font-size: 30rpx;
        color: #0b0b0b;
      }
      .wake-item-title-time {
        float: right;
        font-weight: 500;
        font-size: 22rpx;
        color: #999;
      }
      .wake-item-content {
        padding-top: 10rpx;
        max-height: 85rpx;
        line-height: 42rpx;
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}
</style>
