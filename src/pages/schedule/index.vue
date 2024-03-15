<template>
  <view class="schedule-box">
    <u-sticky bgColor="#fff">
      <Search :model-value="formData" @update:ModelValue="updateModelValue"/>
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
import {getBusinessList, getLessonAll} from '@/api'
// import {data} from './data'

// const classMap = ['1-2','3-4','5-6','7-8','9-11']
// data.forEach((item)=>{
//   const {TeacherName,StartLesson = 0,EndLesson = 0,WeekDay,CourseName} = item
//   classMap.forEach((n)=>{
//     const numSplit = n.split('-')
//     const startTime = numSplit[0]
//     const endTime = numSplit[1]
//     if((StartLesson >= startTime && EndLesson >= endTime) || EndLesson > endTime){

//     }
//   })
// })











const formData = ref({
  IsSearchMine:'0',
  IsSearchMineName:'所有课程',
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
onLoad(async (options:any)=>{
  formData.value.IsSearchMine = options.IsSearchMine || '0'
  formData.value.IsSearchMineName = options.IsSearchMine == 1 ? '本人课程' : '所有课程'
  await getLessonAll()
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
    uni.setStorageSync('data',res.data)
  }else{
    tabList.value = []
    listMap.value = []
    classList.value = {}
  }
}
const formatterData = (data) => {
  data.forEach((item)=>{
    const {TeacherName,StartLesson,EndLesson,WeekDay,CourseName} = item
    if(Object.keys(listMap.value).includes(WeekDay)){ // 星期的数据已经存在
      // classMap.forEach((n)=>{
      //   const numSplit = n.split('-')
      //   const startTime = numSplit[0]
      //   const endTime = numSplit[1]
      //   if((StartLesson >= startTime && EndLesson >= endTime) || EndLesson > endTime){

      //   }
      // })
      const index = listMap.value[WeekDay].findIndex((n)=>n.StartLesson === StartLesson && n.EndLesson === EndLesson)
      if(index >= 0){
        listMap.value[WeekDay][index].classList.push({
          CourseName,TeacherName
        })
      }else{
        listMap.value[WeekDay].push({
          StartLesson,
          EndLesson,
          classList:[{
            CourseName,TeacherName
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
            CourseName,TeacherName
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
    "日": 7,
  };

  // 获取每个元素对应的阿拉伯数字并进行比较
  return chineseToArabic[a.name.slice(-1)] - chineseToArabic[b.name.slice(-1)];
}

const updateModelValue = (val) => {
  console.log('2222',val)
  listMap.value = {}
  tabList.value = []
  val.weeks && getList(val)

}

// watch(()=>formData.value,(val)=>{
//   listMap.value = {}
//   tabList.value = []
//   val.weeks && getList(val)
// },{
//   immediate:false,
//   deep:true
// })

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
