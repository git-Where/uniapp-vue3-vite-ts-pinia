<template>
  <u-tabs
    :list="tabList"
    :lineWidth="lineWidth"
    :lineHeight="lineHeight"
    :scrollable="scrollable"
    :activeStyle="{
      'font-weight': 'bold',
      'text-shadow': '0rpx 23rpx 27rpx rgba(59,147,253,0.11)',
      'background': 'linear-gradient(-90deg, #4BB9FA 0%, #2E72FF 100%)',
      '-webkit-background-clip': 'text',
      'font-size':'30rpx',
      '-webkit-text-fill-color': 'transparent'
    }"
    :inactiveStyle="{
      'color': '#666666',
      'font-size': '28rpx',
      'padding':'0 5rpx'
    }"
    :itemStyle="{
      padding:'0 25rpx 8rpx',
      width:'100rpx',
      textAlign:'center',
      height: '96rpx',
      ...itemStyle
    }
    "
    @click="tabClick"
  ></u-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  tabList:{
    type: Array,
    default:()=>[
      // {
      //   name: "11-10周一",
      // },
      // {
      //   name: "11-10周二",
      // },
      // {
      //   name: "11-10周三",
      // },
      // {
      //   name: "11-10周四",
      // },
      // {
      //   name: "11-10周五",
      // },
      // {
      //   name: "11-10周六",
      // },
      // {
      //   name: "11-10周日",
      // },
    ]
  },
  scrollable:{
    type: Boolean,
    default:true
  },
  itemStyle:{
    type:Object,
    default:()=>{}
  },
  lineWidth:{
    type:Number,
    default:60
  },
  lineHeight:{
    type:Number,
    default:2
  }
})
const emit = defineEmits<{
  'tabChange':[value:number]
}>()
const tabClick = (index,item) => {
  console.log(index,item)
  emit('tabChange',index)
}

</script>
<style lang="scss">
.u-tabs__wrapper__nav__line {
  bottom: 0 !important;
}
.u-tabs__wrapper__nav__item__text {
  font-size: 28rpx !important;
}
</style>
