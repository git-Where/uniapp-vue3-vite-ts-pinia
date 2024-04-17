<template>
  <div>
    <div class="invite-header" :style="{background:navBg?'#3D94EF':'transparent'}">
      <div class="index-box" :style="{marginTop:statusHeight+'rpx'}">
        <div :style="{height:navigationBarHeight*2+'rpx',lineHeight:navigationBarHeight*2+'rpx'}">
          <div class="index-left" @click="back">
            <u-icon name="arrow-left"></u-icon>
          </div>
          <div class="index-title">
            我的邀约
          </div>
        </div>
      </div>
    </div>
    <scroll-view scroll-y="true" :style="'height: 100vh'" @scroll="onPageScroll">
      <img class="invite-bg" :src="InviteBg" alt=""  />
      <img class="invite-header-btn" :src="InviteIcon" alt="" @click="inviteClick"/>
      <div class="invite-divider">
        <u-divider textColor="#999999"
        lineColor="#999999" text="历史邀约记录"></u-divider>
      </div>
      <InviteContent  v-model="formData" @getList="getDataList"/>
      <div v-if="totalNum !== formData.length" class="load-more" @click="more">点击加载更多</div>
      <div v-else class="load-more">到底了</div>
    </scroll-view>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {InviteIcon,InviteBg} from '@/static/icon'
import InviteContent from './components/InviteContent/index.vue'
import { navBarHeight } from '@/utils/navBarUtils';
import { getBusinessMyList } from '@/api/business';

const statusHeight = ref(0)
const navigationBarHeight = ref(0)
const navBg = ref(false)

const page = ref(1)
const formData = ref([])
const totalNum = ref(0)

onShow(() => {
  page.value = 1
  totalNum.value = 0
  formData.value = []
  init()
});

const init = async () => {
  const res = await navBarHeight()
  statusHeight.value = res.statusHeight*2
  navigationBarHeight.value = res.navigationBarHeight

  getList()
}

const getDataList = async () =>{
  formData.value = []
  getList()
}
const getList = async () => {
  const res:any = await getBusinessMyList({
    page:page.value,
    pagesize:10,
    modaltype:2
  })
  page.value = res.pageNo
  formData.value = formData.value.concat(res.data)
  totalNum.value = res.totalCount
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
const more = () => {
  page.value += 1
  init()
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
.invite-divider {
  margin: 95rpx 180rpx 65rpx;
}
.invite-bg {
  display: block;
  width: 750rpx;
  height: 460rpx;
}
.index-box {
  position: relative;
  z-index: 11;
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
