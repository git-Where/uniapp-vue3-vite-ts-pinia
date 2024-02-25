<template>
  <Popup ref="popupRef" :title="'周数'" @change="Change">
    <template #default>
      <div class="week-popup-box">
        <u-radio-group
          v-model="radiovalue"
          inactiveColor="#BFBFBF"
          activeColor="#367CFE"
          placement="row"
          @change="groupChange"
        >
          <u-radio
            :customStyle="{marginBottom: '8px',padding:'0 30rpx'}"
            v-for="(item, index) in radiolist"
            :key="index"
            :label="item.name"
            :name="item.name"
          >
          </u-radio>
        </u-radio-group>
      </div>
      <div class="week-popup-con clearfix">
        <div class="week-popup-con-item" :class="{active:item.active}" v-for="item in weekNums" :key="item.value" @click="numChange(item)">{{item.value}}</div>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Popup from '@/components/Popup/index.vue'

const props = defineProps({
  weekNum:{
    type:Number,
    default:0
  }
})

const popupRef = ref()

const emit = defineEmits(['change'])
const radiovalue = ref();
// 基本案列数据
const radiolist = ref([
  {
    name: '单周',
  },
  {
    name: '双周',
  },
  {
    name: '全选',
  },
]);
const weekNums = ref<any>([])

watch(()=>props.weekNum,(val)=>{
  if(val > 0){
    weekNums.value = []
    init(val)
  }
},{
  immediate:false
})
const init = (val) => {
  for(let i = 1;i<=val;i++){
    weekNums.value.push({
      value:i,
      active:false
    })
  }
}

const groupChange = (val) => {
  for(let i = 0;i<weekNums.value.length;i++){
    weekNums.value[i].active = false
    if(val === '单周'){
      if(i % 2 === 0){
        weekNums.value[i].active = true
      }
    }
    if(val === '双周'){
      if(i % 2 !== 0){
        weekNums.value[i].active = true
      }
    }
    if(val === '全选'){
      weekNums.value[i].active = true
    }
  }
};


const Change = () => {
  emit('change',weekNums.value)
  popupRef.value.cancel()
}
const numChange = (val) => {
  val.active = !val.active
}
const open = () => {
  popupRef.value.open('bottom')
}
defineExpose({
  open
})
</script>

<style lang="scss">
.week-popup-box {
  display: inline-block;
  margin: 30rpx 0;
}
.week-popup-box .u-radio-row {
  justify-content: center !important;
}
.week-popup-con {
  .week-popup-con-item {
    float: left;
    box-sizing: border-box;
    margin: 15rpx;
    border: 1rpx solid #efefef;
    border-radius: 10rpx;
    width: 109rpx;
    height: 78rpx;
    background: #fff;
    line-height: 78rpx;
    text-align: center;
    font-size: 32rpx;
    color: #333;
    &.active {
      border: 1rpx solid #367cfe;
      background: #367cfe;
      color: #fff;
    }
  }
}
</style>
