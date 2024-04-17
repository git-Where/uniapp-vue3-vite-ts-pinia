<template>
  <Popup ref="popupRef" @change="popupChange">
    <template #default>
      <div class="popup-box">
        <u--form
          labelPosition="left"
          labelWidth="75"
          :model="formData"
          ref="form"
        >
          <u-form-item
            label="预约日期"
            style="width: 100rpx;"
            @click="handleDay"
          >
            <u--input
              v-model="formData.day"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择预约日期"
              border="none"
            ></u--input>
            <template #right>
              <u-icon name="arrow-right"></u-icon>
            </template>
          </u-form-item>
          <u-form-item
            label="预约时间"
            class="date-time"
          >
            <div style="text-align: right;">
              <span class="inline-input" @click="handleTime('beginTime')" :style="{marginBottom: '10rpx',color:formData.beginTime?'#303133':'#b9b7b7'}">{{formData.beginTime || '请选择预约开始时间'}}</span>
              <!-- <span class="inline-input">-</span> -->
              <span class="inline-input" @click="handleTime('endTime')" :style="{color:formData.endTime?'#303133':'#b9b7b7'}">{{formData.endTime || '请选择预约结束时间'}}</span>
            </div>
            <template #right>
              <u-icon name="arrow-right"></u-icon>
            </template>
          </u-form-item>
        </u--form>
      </div>
    </template>
  </Popup>
  <u-datetime-picker
    ref="timePickerRef"
    :show="show"
    mode="time"
    :minHour="minHour"
    :maxHour="maxHour"
    :minMinute="minMinute"
    :maxMinute="maxMinute"
    @cancel="show = false"
    @close="show = false"
    @confirm="confirm"
></u-datetime-picker>
<u-datetime-picker
  ref="datetimePickerRef"
  :show="dateTimeShow"
  mode="date"
  :minDate="Date.now()"
  @close="dateTimeShow = false"
  @cancel="dateTimeShow = false"
  @confirm="dateConfirm"
></u-datetime-picker>
</template>

<script setup lang="ts">

import { ref } from "vue";
import Popup from "@/components/Popup/index.vue";
import { timestampToTime } from "@/utils/utils";

const emit = defineEmits(['update:modelValue'])
const defaultIndex = ref([0,0,0,0,0])
const formData = ref({
  beginTime: "",
  endTime: "",
  day:''
});
const datetimePickerRef = ref()
const dateTimeShow = ref(false)
const popupRef = ref();
const show = ref(false);
const timePickerRef = ref()
const typeName = ref('')
const minHour = ref(0)
const maxHour = ref(23)
const minMinute = ref(0)
const maxMinute = ref(59)
const handleTime = (type) => {
  if(type === 'beginTime' && formData.value.endTime){ // 开始时间
    const time = formData.value.endTime.split(':')
    maxHour.value = Number(time[0])
    maxMinute.value = Number(time[1])
    minHour.value = 0
    minMinute.value = 0
  }
  if(type === 'endTime' && formData.value.beginTime){// 结束时间
    const time = formData.value.beginTime.split(':')
    minHour.value = Number(time[0])
    minMinute.value = Number(time[1])
    maxHour.value = 23
    maxMinute.value = 59
  }
  show.value = true;
  typeName.value = type
};
const handleDay = () => {
  dateTimeShow.value = true
}
const confirm = (val) => {
  console.log('时间',val)
  const judge = (typeName.value === 'beginTime' && val.value === formData.value.endTime) || (typeName.value === 'endTime' && val.value === formData.value.beginTime)
  if(judge){
    return uni.showToast({
      title: '预约时间不可选择统一时间段,请重新选择' ,
      icon: 'none'
    })
  }
  formData.value[typeName.value] = val.value
  show.value = false
};
const dateConfirm = (val) => {
  formData.value.day = timestampToTime(val.value,'2')
  dateTimeShow.value = false
}
const popupChange = (val) => {
  const {day,beginTime,endTime} = formData.value
  if(!day || !beginTime || !endTime){
   return uni.showToast({
      title: '请选择时间' ,
      icon: 'none'
    })
  }
  const time = day+' '+beginTime + '-' + endTime
  emit('update:modelValue',time)
  popupRef.value.cancel()
};
const open = () => {
  formData.value.beginTime = ''
  formData.value.endTime = ''
  formData.value.day = ''
  defaultIndex.value = [0,0,0,0,0]
  minHour.value = 0
  maxHour.value = 23
  minMinute.value = 0
  maxMinute.value = 59
  popupRef.value.open("bottom");
};
defineExpose({
  open
});
</script>

<style  lang="scss">
.inline-input {
  display: block;
  text-align: right;
  font-size: 15px;
}
</style>
