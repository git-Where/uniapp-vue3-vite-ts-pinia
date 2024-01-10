

<template>
  <view
    :class="[{ border: border }, 'navbar']"
    :style="{
      height: height + 'px',
      lineHeight: menuHeight + 'px',
      paddingTop: statusHeight + 'px',
      backgroundColor: bgColor,
      color: textColor
    }"
  >
    <view class="icon navbar-icon" @tap="back()" v-if="showBack || showLeft">
      <i class="ic ic-back" :style="{ color: backIconColor }"></i>
    </view>
    <view
      v-if="pageName"
      :class="[align, 'navbar-title']"
      :style="{
        color: textColor,
        textAlign: align,
        fontSize: textSize
      }"
      >{{ pageName }}</view
    >
  </view>
</template>

<script setup name="UniNavBar">
import {navBarHeight} from '@/utils/navBarUtils'
import { ref } from 'vue'

defineProps({
  showLeft: {
    // 显示返回箭头
    type: Boolean,
    default: false
  },
  customeClass: String, // 导航栏样式名
  pageName: {
    type: String,
    default: '首页'
  }, // 当前页面标题
  bgColor: {
    type: String,
    default: '#fff'
  }, // 导航栏背景色
  textColor: {
    type: String,
    default: '#000'
  }, // 导航栏标题文字颜色
  align: {
    type: String,
    default: 'center'
  }, // 文字的对齐方式
  backIconColor: String,
  border: {
    type: Boolean,
    default: true
  },
  textSize: {
    type: String,
    default: '34rpx'
  }
})
const emit = defineEmits(['backClick'])
const statusHeight = ref(0)
const height = ref(0)
const menuHeight = ref(0)
const showBack = ref(false)

onMounted(async () => {
  const {statusHeight,navHeight,menuHeight} = await navBarHeight()
  statusHeight.value = statusHeight
  height.value = navHeight
  menuHeight.value = menuHeight
})

if (getCurrentPages().length > 1) {
  showBack.value = true
}

const back = () => {
  uni.navigateBack()
  emit('backClick')
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  background-color: #fff;
  text-align: center;
  color: #333;
  &.border {
    border-bottom: 1rpx solid #e2e2e2;
  }
  .navbar-title {
    font-weight: bold;
    font-size: 34rpx;
    color: #000;
    &.left {
      margin-left: 72rpx;
      text-align: left;
    }
  }
  &-icon {
    position: absolute;
    left: 0;
    padding: 0 20rpx;
    .ic {
      font-size: 36rpx;
      color: #0e050a;
    }
  }
}
</style>
