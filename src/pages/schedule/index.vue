<template>
  <view class="schedule-box">
    <u-sticky bgColor="#fff">
      <Search v-model="formData"/>
      <div class="search-day" v-if="tabList.length > 0">
        <Tabs :tab-list="tabList" :line-height="3" :line-width="80" @tab-change="tabClick" />
      </div>
    </u-sticky>
    <Content v-model="classList"/>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Search from './components/Search/index.vue'
import Content from './components/Content/index.vue'
import Tabs from '@/components/Tabs/index.vue'
import {getBusinessList} from '@/api'
const formData = ref({
  IsSearchMine:'1',
  IsSearchMineName:'本人课程',
  SemesterId:'',
  SemesterIdName:'',
  weeks:'',
  weeksName:'',
  LaboratoryId:'',
  LaboratoryIdName:'',
})
const classList = ref()
const tabList = ref<any>([]);
const listMap = ref({})
onLoad((options:any)=>{
  formData.value.IsSearchMine = options.IsSearchMine || '1'
  formData.value.IsSearchMineName = options.IsSearchMine == 1 ? '本人课程' : '所有课程'
})
const getList = async (val) => {
  const {IsSearchMine,SemesterId,weeks,LaboratoryId} = val
  const res = await getBusinessList({
    page:1,
    pagesize:20,
    modaltype:0,
    IsSearchMine,
    SemesterId,
    weeks,
    LaboratoryId
  })
  if(res.data.length > 0){
    formatterData(res.data)
  }else{
    tabList.value = []
    listMap.value = []
    classList.value = {}
  }
}
const formatterData = (data) => {
  data.forEach((item)=>{
    const {LaboratoryName,TeacherName,StartLesson,EndLesson,WeekDay} = item
    if(Object.keys(listMap.value).includes(WeekDay)){ // 已经存在
      const index = listMap.value[WeekDay].findIndex((n)=>n.StartLesson === StartLesson && n.EndLesson === EndLesson)
      if(index >= 0){
        listMap.value[WeekDay][index].classList.push({
          LaboratoryName,TeacherName
        })
      }else{
        listMap.value[WeekDay].push({
          StartLesson,
          EndLesson,
          classList:[{
            LaboratoryName,TeacherName
          }]
        })
      }
    }else{
      listMap.value[WeekDay] = []
      listMap.value[WeekDay].push(
        {
          StartLesson,
          EndLesson,
          classList:[{
            LaboratoryName,TeacherName
          }]
        }
      )
    }
  })
  Object.entries(listMap.value).forEach(([key, value]) => {
    tabList.value.push({
      name:key
    })
    listMap.value[key].sort(function (a, b) {
      return a.StartLesson - b.StartLesson;
    })
    listMap.value[key].sort(function (a, b) {
      return a.EndLesson - b.EndLesson;
    })
  });
  tabList.value.sort(compareChineseNumber)

  classList.value = listMap.value[tabList.value[0].name]
  console.log('list.value',listMap.value,classList.value)
}
const compareChineseNumber = (a, b) => {
  // 创建一个映射表将中文数字转换为对应的阿拉伯数字
  const chineseToArabic = {
    "一": 1,
    "二": 2,
    "三": 3,
    "四": 4,
    "五": 5,
    "六": 6,
  };

  // 获取每个元素对应的阿拉伯数字并进行比较
  return chineseToArabic[a.name.slice(-1)] - chineseToArabic[b.name.slice(-1)];
}
watch(()=>formData.value,(val)=>{
  listMap.value = {}
  tabList.value = []
  val.weeks && getList(val)
},{
  immediate:false,
  deep:true
})

const tabClick = (val) => {
  classList.value = listMap.value[val.name]
}

</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.schedule-box .u-icon {
  display: inline-block !important;
  float: right;
  margin: 22rpx 0 0;
  width: 28rpx;
  height: 26rpx;
}
.search-day {
  overflow: hidden;
  overflow-x: auto;
  border-bottom: 1rpx solid #ececec;
  width: auto;
  height: 98rpx;
  background: #fff;
  .search-day-item {
    float: left;
  }
}
</style>
