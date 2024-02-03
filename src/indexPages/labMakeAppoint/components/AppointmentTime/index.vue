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
              <span class="inline-input" @click="handleTime('beginTime')" :style="{color:formData.beginTime?'#303133':'#b9b7b7'}">{{formData.beginTime || '请选择预约开始时间'}}</span>
              <span class="inline-input">-</span>
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
    @confirm="confirm"
></u-datetime-picker>
<u-datetime-picker
  ref="datetimePickerRef"
  :show="dateTimeShow"
  mode="date"
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
const handleTime = (type) => {
  show.value = true;
  typeName.value = type
};
const handleDay = () => {
  dateTimeShow.value = true
}
const confirm = (val) => {
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
  formData.value.time = ''
  defaultIndex.value = [0,0,0,0,0]
  popupRef.value.open("bottom");
};
defineExpose({
  open
});
</script>

<style  lang="scss">
.inline-input {
  display: contents;
  text-align: right;
  font-size: 15px;
}
</style>
