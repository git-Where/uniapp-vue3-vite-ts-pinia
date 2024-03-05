<template>
  <div class="content-box" v-if="modelValue.length > 0">
    <div class="content-item" v-for="(item,index) in modelValue" :key="index">
      <div class="content-item-left">
        <div>
          <img class="content-item-icon" :src="CourseIcon" />
          <text class="content-item-text">
            {{item.StartLesson}}~{{item.EndLesson}}节
          </text>
        </div>
      </div>
      <div class="content-item-right">
        <div>
          <div class="content-item-right-text" v-for="(n,i) in item.classList" :key="i">
            <span class="content-item-title">{{ n.LaboratoryName }}</span>
            <img class="content-item-user-img" :src="CourseUser"/>
            <span class="content-item-user-name">{{ n.TeacherName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Empty v-else/>
</template>

<script setup lang="ts">
import {CourseIcon,CourseUser} from '@/static/icon'
import Empty from '@/components/Empty/index.vue'

defineProps({
  modelValue: {
    type: Object as PropType<any>,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.content-box {
  padding-bottom: 20rpx;
}
.content-item {
  display: flex;
  padding-top: 20rpx;
  .content-item-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
    padding: 25rpx 0;
    border-radius: 0rpx 10rpx 10rpx 0rpx;
    width: 133rpx;
    background: #fff;
    text-align: center;
  }
  .content-item-icon {
    display: block;
    margin: 0 auto;
    width: 30rpx;
    height: 30rpx;
  }
  .content-item-text {
    font-weight: 500;
    font-size: 28rpx;
    color: #333;
  }
  .content-item-right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 20rpx;
    border-radius: 10rpx 0rpx 10rpx 10rpx;
    background: #fff;
  }
  .content-item-right-text {
    padding: 25rpx 0;
    border-bottom: 1rpx solid #e3e3e3;
    &:last-child {
      border-bottom: none;
    }
  }
  .content-item-title {
    display: inline-block;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
  }
  .content-item-user-img {
    display: inline-block;
    margin-left: 28rpx;
    margin-right: 10rpx;
    margin-bottom: 6rpx;
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
  }
  .content-item-user-name {
    font-size: 28rpx;
    color: #999;
  }
  .content-item-no-data {
    font-size: 28rpx;
    color: #999;
  }
}
</style>
