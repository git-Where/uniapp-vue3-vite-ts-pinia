<template>
  <Popup ref="popupRef" @change="popupChange">
    <template #default>
      <div class="popup-box">
        <u--form
          labelPosition="left"
          labelWidth="75"
          :model="formModel"
          ref="form"
        >
          <u-form-item
            label="预约时间"
            style="width: 100rpx;"
            @click="handleAddPopup"
          >
            <u--input
              v-model="formModel.time"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择预约时间"
              border="none"
            ></u--input>
            <template #right>
              <u-icon name="arrow-right"></u-icon>
            </template>
          </u-form-item>
        </u--form>
      </div>
    </template>
  </Popup>
  <u-picker
    :show="show"
    :defaultIndex="defaultIndex"
    :columns="columns"
    :showToolbar="true"
    @cancel="show = false"
    @confirm="confirm"
    @change="changeHandler"
  ></u-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Popup from "@/components/Popup/index.vue";
import { betweenArray, getDaysInMonth } from "@/utils/utils";

const props = defineProps({
  modelValue:{
    type:Object,
    default: ()=>[]
  }
})
const emit = defineEmits(['update:modelValue'])
const defaultIndex = ref([0,0,0,0,0])
const formModel = ref({
  time: "",
});
const popupRef = ref();
const show = ref(false);
const columns = ref([
  [2020,2021, 2022, 2023],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
  ],
  [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ],
  [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ]
]);
const handleAddPopup = () => {
  show.value = true;
};
const changeHandler = (e) => {
  const { columnIndex, value, values, index, indexs } = e;
  console.log('e',value,columnIndex)
  if (columnIndex === 0 ||columnIndex === 1) {
    const month = value[1]
    const year = value[0]
    const dayNum = getDaysInMonth(year,month)
    const colum = betweenArray(1,dayNum)
    columns.value[2] = colum
    indexs[2] = 0
    defaultIndex.value = indexs
    console.log('defaultIndex',defaultIndex)
  }
}
const confirm = (e) => {
  const {value} = e
  const formatter = value.join('-').replace(/((?:.*?-.*?){2}.*?)-/m, "$1 ")
  formModel.value.time = formatter
  show.value = false
};
const popupChange = (val) => {
  console.log(val, "111111");
  emit('update:modelValue',formModel.value.time)
  popupRef.value.cancel()
};
const open = () => {
  formModel.value.time = ''
  defaultIndex.value = [0,0,0,0,0]
  popupRef.value.open("bottom");
};
defineExpose({
  open
});
</script>

<style scoped lang="scss"></style>
