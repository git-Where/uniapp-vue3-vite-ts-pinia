<template>
  <view>
    <div class="search-box">
      <div class="search-item clearfix" @click="pick('SemesterId')">
        <u-icon name="arrow-down"></u-icon>
        <span class="search-item-title">{{formData.SemesterIdName || '请选择'}}</span>
      </div>
      <div class="search-item clearfix" @click="pick('weeks')">
        <u-icon name="arrow-down"></u-icon><span class="search-item-title">{{ formData.weeksName || '请选择' }}</span>
      </div>
      <div class="search-item clearfix" @click="pick('LaboratoryId')">
        <u-icon name="arrow-down"></u-icon><span class="search-item-title">{{ formData.LaboratoryIdName || '请选择' }}</span>
      </div>
      <div class="search-item clearfix" @click="pick('IsSearchMine')">
        <u-icon name="arrow-down"></u-icon><span class="search-item-title">{{ formData.IsSearchMineName || '请选择' }}</span>
      </div>
    </div>
  </view>
  <u-picker
    ref="UPick"
    :show="show"
    :showToolbar="true"
    :defaultIndex="defaultIndex"
    key-name="Name"
    :close-on-click-overlay="true"
    :columns="columns"
    @cancel="show = false"
    @close="show = false"
    @confirm="confirm"
    @change="changeHandler"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {getLabAll,getSemesterAll} from '@/api'
import { formatDate, getCurrentDate, getWeeks } from "@/utils/utils";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:ModelValue'])

const UPick = ref()
const show = ref(false);
const formData = ref(props.modelValue);
const searchType = ref()
const defaultIndex = ref([0])
const objMap = ref({
  IsSearchMine:{
    columns:[{
      Name:'所有课程',
      Id:0
    },{
      Name:'本人课程',
      Id:1
    }],
  },
  SemesterId:{
    columns:[],
  },
  weeks:{
    columns:[] as any
  },
  LaboratoryId:{
    columns:[],
  },
})
const columns = ref([]);

onMounted(async ()=>{
  await getLabList()
  await getSemList()
})

const getLabList = async () => {
  const res = await getLabAll()
  objMap.value.LaboratoryId.columns = res as any
}
const getSemList = async () => {
  const res = await getSemesterAll()
  objMap.value.SemesterId.columns = res as any
  formData.value.SemesterId = res[0].Id as any
  formData.value.SemesterIdName = res[0].Name as any
  getWeekList(res[0])
}
const getWeekList = (val) => {
  const beginTime = formatDate(val.Begin_Date).split(' ')[0]
  const endTime = formatDate(val.End_Date).split(' ')[0]
  const weeks = getWeeks(beginTime,endTime)+1
  const currentDate = getCurrentDate()
  const current = getWeeks(beginTime,currentDate)+1
  console.log('周数：',beginTime,endTime,currentDate,weeks,current)
  formData.value.weeksName = `第${current}周`
  formData.value.weeks = current
  for(let i = 0;i<weeks;i++){
    objMap.value.weeks.columns.push(
      {
        Name:`第${i+1}周`,
        Id:i+1
      }
    ) as any
  }
  emit('update:ModelValue',formData.value)
}

const pick = (val) => {
  searchType.value = val
  columns.value = [objMap.value[val]?.columns]
  const index = objMap.value[val].columns.findIndex((item)=>{
    return item.Id === formData.value[val]
  })
  defaultIndex.value = [ index > 0 ? index : 0]
  show.value = true
}

const confirm = (val) => {
  formData.value[searchType.value] = val.value[0].Id
  formData.value[searchType.value+'Name'] = val.value[0].Name
  emit('update:ModelValue',formData.value)
  show.value = false
}
const changeHandler = (e) => {
  const {
    columnIndex,
    index,
    picker
  } = e;
}
</script>

<style lang="scss">
.search-box {
  display: flex;
  padding: 10rpx;
  border-bottom: 1rpx solid #ececec;
  background: #fff;
  .search-item {
    display: box;
    overflow: hidden;
    flex: auto;
    margin: 10rpx;
    padding-right: 20rpx;
    border-radius: 10rpx;
    height: 66rpx;
    background: #f4f6f7;
    line-height: 66rpx;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    .search-item-title {
      display: block;
      overflow: hidden;
      width: 100rpx;
      text-overflow: ellipsis;
      text-align: center;
      font-weight: 500;
      font-size: 28rpx;
      color: #333;
      white-space: nowrap;
    }
  }
}
</style>
