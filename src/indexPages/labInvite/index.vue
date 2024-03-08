<template>
  <div>
    <div class="invite-header" :style="{background:navBg?'#3D94EF':'transparent'}">
      <div class="index-box" :style="{marginTop:statusHeight+'rpx'}">
        <div :style="{height:navigationBarHeight*2+'rpx',lineHeight:navigationBarHeight*2+'rpx'}">
          <div class="index-left" @click="back">
            <u-icon name="arrow-left"></u-icon>
          </div>
          <div class="index-title">
            实验室预约
          </div>
        </div>
      </div>
    </div>

    <scroll-view scroll-y="true" :style="'height: 100vh'" @scroll="onPageScroll">
      <img class="invite-bg" :src="InviteBg" alt="" srcset="">
      <img class="invite-header-btn" :src="InviteIcon" alt="" @click="inviteClick"/>
      <Tabs :tab-list="list"
        :line-width="136"
        :line-height="2"
        :scrollable="false"
        :item-style="{
          flex: '1',
          height: '94rpx'
        }"
        @tab-change="tabClick" />
      <InviteContent v-model="formData" @getList="getList"/>
      <div v-if="totalNum !== formData.length" class="load-more" @click="more">点击加载更多</div>
      <div v-else class="load-more">到底了</div>
    </scroll-view>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import {InviteIcon,InviteBg} from '@/static/icon'
import InviteContent from '../myInvite/components/InviteContent/index.vue'
import { navBarHeight } from '@/utils/navBarUtils';
import { getBusinessList } from '@/api/business';

const statusHeight = ref(0)
const navigationBarHeight = ref(0)

const list = ref([
  {
    name: "待审核",
    id:1,
    badge: {
      value: 0,
    }
  },
  {
    name: "已通过",
    id:0,
    badge: {
      value: 0,
    }
  },
  {
    name: "已拒绝",
    id:3,
    badge: {
      value: 0,
    }
  }
]);
const navBg = ref(false)
const page = ref(1)
const status = ref(1)
const formData = ref([])
const totalNum = ref(0)
const tabClick = (item) => {
  formData.value = []
  status.value = item.id
  totalNum.value = 0
  page.value = 1
  getList()
}
onShow(() => {
  init()
  getList()
});

const init = async () => {
  const res = await navBarHeight()
  statusHeight.value = res.statusHeight*2
  navigationBarHeight.value = res.navigationBarHeight
}
const getList = async () => {
  const res:any = await getBusinessList({
    page:page.value,
    pagesize:10,
    modaltype:2,
    status:status.value,
    keyword:'',
  })
  page.value = res.pageNo
  formData.value = formData.value.concat(res.data)
  totalNum.value = res.totalCount
  if(res.totalCount === 0){
    formData.value = []
  }
  list.value.find((item)=>item.id === status.value).badge.value = res.totalCount
}
const more = () => {
  page.value += 1
  getList()
}
const back = () => {
uni.navigateBack()
}
const inviteClick = () => {
  uni.navigateTo({
    url:'../labMakeAppoint/index'
  })
}

const onPageScroll = (event) => {
  if(event.detail.scrollTop > 20){
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
.invite-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 111;
  transition: all 0.3s;
}
.invite-header-btn {
  display: block;
  margin: -90rpx auto 0;
  width: 560rpx;
  height: 96rpx;
}
.invite-bg {
  display: block;
  width: 750rpx;
  height: 460rpx;
}
.index-box {
  position: relative;
}
.index-left {
  position: absolute;
  left: 12rpx;
  top: 50%;
  margin-top: -16rpx;
  .u-icon__icon {
    font-weight: bold !important;
    font-size: 40rpx !important;
    color: #fff !important;
  }
}
.index-title {
  display: block;
  text-align: center;
  font-size: 26rpx;
  color: #fff;
}
</style>
