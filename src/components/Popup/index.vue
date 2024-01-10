<template>
  <uni-popup ref="popupRef" background-color="#fff" @change="change">
    <div class="uni-popup-content">
      <div class="uni-popup-header clearfix">
        <div class="uni-popup-cancel" @click="cancel">{{ cancelText }}</div>
        <div class="uni-popup-title" v-if="title">{{title || '标题'}}</div>
        <div class="uni-popup-confirm" @click="confirm">{{ confirmText }}</div>
      </div>
      <div class="uni-popup-body">
        <slot />
      </div>
    </div>
  </uni-popup>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const props = defineProps({
  list:{
    type: Array,
    default:()=>[]
  },
  title:{
    type: String,
    default: ''
  },
  cancelText:{
    type: String,
    default:'取消'
  },
  confirmText:{
    type: String,
    default:'确定'
  }
})
console.log('props',props)
const popupRef = ref()
const emit = defineEmits<{
  'change': [val: any]
}>()
const change = (val) => {
  // emit('change',val)
  console.log(22222)
}

const cancel = () => {
  popupRef.value.close()
}

const confirm = () => {
  // popupRef.value.close()
  emit('change','确定')
}

const open = ()=> {
  popupRef.value.open('bottom')
}

defineExpose({
  open,
  cancel
})
</script>

<style lang="scss">
.uni-popup-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.uni-popup-header {
  box-sizing: border-box;
  padding: 0 30rpx;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  .uni-popup-cancel {
    float: left;
    font-size: 30rpx;
    color: #909193;
  }
  .uni-popup-confirm {
    float: right;
    font-size: 30rpx;
    color: #3c9cff;
  }
}
.uni-popup-title {
  display: inline-block;
  font-size: 30rpx;
  color: #666;
}
.uni-popup-body {
  display: block;
  overflow: hidden;
  overflow-y: auto;
  flex: 1;
  box-sizing: border-box;
  margin-bottom: 30rpx;
  padding: 0 30rpx;
  width: 100%;
  min-height: 250rpx;
  max-height: 500rpx;
  text-align: center;
}
</style>
