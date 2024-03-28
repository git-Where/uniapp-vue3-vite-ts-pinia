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
    pagesize:1000,
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

const setData = ({TeacherName,StartLesson,EndLesson,WeekDay,CourseName,LaboratoryName,ActivityId,ActivityName,Teacher}) => {
  let lessonList = [ '1-2', '3-4','5-6','7-8','9-11' ]
  lessonList.map((lessItem)=>{
    const numSplit = lessItem.split('-')
    const startTime = Number(numSplit[0]) //1 3 5 7 9
    const endTime = Number(numSplit[1]) //2 4 6 8 11
    /**  比如固定节次1-5
     * 开始时间在节次信息中，且结束时间也在节次信息中 ，过滤固定节次时间的中间节次  比如3-4
     * 开始时间等于固定节次的开始节次或者等于固定节次的结束节次， 过滤沾边的节次 比如1-2
     * 结束时间等于固定节次的开始节次或者等于固定节次的结束节次，过滤沾边的节次 比如5-6
     * **/
    if(((StartLesson <= startTime && startTime <= EndLesson) && StartLesson <= endTime && endTime <= EndLesson) ||
    startTime === StartLesson || startTime === EndLesson || endTime === StartLesson || endTime === EndLesson){
      const index = listMap.value[WeekDay].findIndex((item)=> {
        return (item.StartLesson === startTime && item.EndLesson === endTime)
      })
      if(index >= 0){ // 节次信息已经有存在,就不在重新赋值节次信息
        if(!Array.isArray(listMap.value?.[WeekDay]?.[index]?.classList)){
          listMap.value[WeekDay][index].classList = []
        }
        listMap.value?.[WeekDay]?.[index]?.classList?.push({
          CourseName,TeacherName,LaboratoryName,ActivityId,ActivityName,Teacher
        })
      }else{
        listMap.value[WeekDay].push({
          StartLesson:startTime,
          EndLesson:endTime,
          classList:[{
            CourseName,TeacherName,LaboratoryName,ActivityId,ActivityName,Teacher
          }]
        })
      }
    }
  })
}
const formatterData = (data) => {
  data.forEach((item)=>{
    const {WeekDay,TeacherName,CourseName} = item
    // if(!TeacherName || !CourseName)return
    if(!Object.keys(listMap.value).includes(WeekDay)){ // 星期的数据不存在
      listMap.value[WeekDay] = []
    }
    setData(item)
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
