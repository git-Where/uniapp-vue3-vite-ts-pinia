<template>
  <div>
    <u--form labelPosition="left" labelWidth="75" :model="formData" :rules="rules" ref="form">
      <div class="form-title">
        <img class="form-title-icon" :src="InviteTitleIcon" alt="" />活动信息
      </div>
      <div class="form-activity">
        <u-form-item label="活动主题" required prop="Titile" borderBottom>
          <u--input v-model="formData.Titile" placeholder="请输入活动主题" border="none"/>
        </u-form-item>
        <u-form-item label="活动内容" prop="Content" borderBottom>
          <u--input v-model="formData.Content" placeholder="请输入活动内容" border="none"/>
        </u-form-item>
        <u-form-item
          label="活动类型"
          required
          prop="TypeName"
          borderBottom
          @click="activityClick"
        >
          <u--input
            v-model="formData.TypeName"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择活动类型"
            border="none"
          />
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="组织者" prop="Organizer" borderBottom>
          <u--input v-model="formData.Organizer" placeholder="请输入组织者" border="none"/>
        </u-form-item>
        <u-form-item label="联系电话" required prop="Phone" borderBottom>
          <u--input v-model="formData.Phone" placeholder="请输入联系电话" border="none"/>
        </u-form-item>
        <u-form-item label="指导老师" required prop="Teacher" borderBottom
          @click="popupTeachRef.open('bottom')">
          <u--input
            v-model="formData.Teacher"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择指导老师"
            border="none"
          />
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="人数" required prop="Number" borderBottom>
          <u--input v-model="formData.Number" type="number" placeholder="请输入人数" border="none"/>
        </u-form-item>
      </div>
      <div class="form-title">
        <img class="form-title-icon" :src="InviteTitleIcon" alt="" />活动信息
      </div>
      <div class="form-activity">
        <u-form-item
          label="实验室"
          required
          prop="LaboratoryName"
          borderBottom
          @click="popupLabRef.open('bottom')"
        >
          <u--input
            v-model="formData.LaboratoryName"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择实验室"
            border="none"
          ></u--input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item
          label="预约日期"
          required
          prop="Laboratory"
        >
        </u-form-item>
        <div class="day-box">
          <div class="day-item clearfix" v-for="(item,index) in timeList" :key="item">
            <div class="day-item-time">{{item}}</div>
            <img class="day-item-icon" :src="ReduceIcon" alt="" @click="handleDelTime(index)"/>
          </div>
          <img class="day-add-icon" :src="AddIcon" alt="" @click="handleDayAdd"/>
        </div>
        <!-- <u-form-item
          label="预约时间"
          required
          prop="userInfo.sex"
          borderBottom
          @click="
            show = true;
          "

        >
          <u--input
            v-model="formData.userInfo.sex"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择预约时间"
            border="none"
          ></u--input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item> -->
      </div>
    </u--form>
    <img class="invite-btn" :src="InviteSubmit" @click="submit" />
    <u-picker
      :show="show"
      :columns="[activityList]"
      :defaultIndex="defaultIndex"
      :close-on-click-overlay="true"
      keyName="Key"
      :showToolbar="true"
      @close="show = false"
      @cancel="show = false"
      @confirm="confirm"
    />
  </div>
  <Popup ref="popupTeachRef" @change="popupTeachChange">
    <template #default>
      <div class="popup-box">
        <u-checkbox-group
            v-model="formData.TeacherId"
            placement="column"
        >
            <u-checkbox
              :customStyle="{paddingBottom: '12px'}"
              activeColor="#2D9EFE"
              v-for="(item, index) in teachList"
              :key="index"
              :label="item.NickName"
              :name="item.Id"
            >
            </u-checkbox>
        </u-checkbox-group>
      </div>
    </template>
  </Popup>
  <Popup ref="popupLabRef" @change="popupLabChange">
    <template #default>
      <div class="popup-box">
        <u-checkbox-group
            v-model="formData.Laboratory"
            placement="column"
        >
            <u-checkbox
              :customStyle="{paddingBottom: '12px'}"
              activeColor="#2D9EFE"
              v-for="(item, index) in labList"
              :key="index"
              :label="item.Name"
              :name="item.Id"
            >
            </u-checkbox>
        </u-checkbox-group>
      </div>
    </template>
  </Popup>
  <AppointTime ref="appTimeRef" :model-value="modelTimeValue" @update:model-value="updateModelValue"/>
</template>

<script setup lang="ts">
import {InviteTitleIcon,InviteSubmit,AddIcon,ReduceIcon} from '@/static/icon'
import Popup from '@/components/Popup/index.vue'
import { ref } from "vue";
import AppointTime from './components/AppointmentTime/index.vue'
import { getTeacherList,getDict, getLabAll, addBusinessActivity, addBusinessBatch } from '@/api';

const popupTeachRef = ref()
const popupLabRef = ref()
const form = ref()
const show = ref(false);
const formData = ref({
  Content:'',
  Number:'',
  Organizer:'',
  Phone:'',
  Teacher:'',
  TeacherId:[],
  Titile:'',
  Type:'',
  TypeName:'',
  LaboratoryName:'',
  Laboratory:[]
});
const rules = {
  "Titile": {
    type: "string",
    required: true,
    message: "请填写活动主题",
    trigger: ["blur", "change"],
  },
  "TypeName": {
    type: "string",
    required: true,
    message: "请选择活动类型",
    trigger: ["blur", "change"],
  },
  "Phone": {
    type: "string",
    required: true,
    message: "请输入联系电话",
    trigger: ["blur", "change"],
  },
  "TeacherId": {
    type: "string",
    required: true,
    message: "请选择指导老师",
    trigger: ["blur", "change"],
  },
  "Number": {
    type: "string",
    required: true,
    message: "请输入活动人数",
    trigger: ["blur", "change"],
  },
  "LaboratoryName": {
    type: "string",
    required: true,
    message: "请选择实验室",
    trigger: ["blur", "change"],
  },
}

const activityList = ref()
const defaultIndex = ref([0])
const labList = ref()
const teachList = ref()

onShow(()=>{
  getTeachs()
  getActivitys()
  getLabList()
})

const getTeachs = async () => {
  const res = await getTeacherList()
  teachList.value = res
}
const getActivitys = async () => {
  const res = await getDict({
    types:'活动类型'
  })
  activityList.value = res['活动类型']
}

const getLabList = async () => {
  const res = await getLabAll()
  labList.value = res
}

const activityClick = () => {
  const index = activityList.value.findIndex((item)=>item.Value === formData.value.Type) || 0
  defaultIndex.value = [index>0?index:0]
  show.value = true
}
const confirm = (e) => {
  formData.value.Type = e.value[0].Value
  formData.value.TypeName = e.value[0].Key
  show.value = false
}

const popupTeachChange = async () => {
  formData.value.Teacher = formData.value.TeacherId?.reduce((pre:any, cur:any)=>{
     pre.push(teachList.value.find((n)=>n.Id === cur).NickName)
     return pre
  },[]).join()
  popupTeachRef.value.cancel()
}

const popupLabChange = () => {
  formData.value.LaboratoryName = formData.value.Laboratory?.reduce((pre:any, cur:any)=>{
     pre.push(labList.value.find((n)=>n.Id === cur).Name)
     return pre
  },[]).join()
  popupLabRef.value.cancel()
}


const submit = async() => {
  dealDateFormatter()
  return false
  await form.value.validate()
  formData.value.TeacherId = formData.value.TeacherId.join() as any
  const res = await addBusinessActivity(formData.value)
  const params = {
    ActivityId:res,
    ScheduleList:[]
  }
  await addBusinessBatch(params)
}

const dealDateFormatter = () => {
  const dayMap = {}
  timeList.value.forEach((item)=>{
    const day = item.split(' ')[0]
    const dayTime = item.split(' ')[1]
    dayMap[day] = dayMap?.[day]?.length === 0 ? [] : dayMap[day]
    dayMap[day].push(dayTime)
  })
  console.log('dayMap',dayMap)
}

const appTimeRef = ref()
const timeList = ref(['2023-11-11 01-12'])
const modelTimeValue = ref('')
const updateModelValue = (value) => {
  console.log(333334443,value)
  if(!value) return
  timeList.value.push(value)
}
// watch(()=>modelTimeValue,(newVal:any)=>{
//   if(!newVal.value) return
//   timeList.value.push(newVal.value)
// },{
//   immediate:false,
//   deep:true
// })
const handleDelTime = (index) => {
  timeList.value.splice(index,1)
}
const handleDayAdd = () => {
  modelTimeValue.value = ''
  appTimeRef.value.open()
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.form-title {
  padding: 30rpx 22rpx;
  font-weight: bold;
  font-size: 36rpx;
  color: #666;
  .form-title-icon {
    display: inline-block;
    margin-right: 10rpx;
    width: 30rpx;
    height: 64rpx;
    vertical-align: middle;
  }
}
.invite-btn {
  display: block;
  margin: 50rpx auto 0 30rpx;
  width: 709rpx;
  height: 128rpx;
}
.form-activity {
  border-radius: 30rpx;
  background: #fff;
  .u-form-item {
    padding: 0 30rpx;
  }
}
.u-input__content__field-wrapper__field,
.u-form-item__body__right__message {
  text-align: right !important;
}
.day-box {
  padding-left: 30rpx;
  padding-bottom: 30rpx;
  .day-item {
    margin: 30rpx 0;
  }
  .day-item-icon {
    display: inline-block;
    margin-left: 30rpx;
    margin-bottom: 10rpx;
    width: 52rpx;
    height: 52rpx;
    vertical-align: middle;
  }
  .day-item-time {
    display: inline-block;
    border-radius: 10rpx;
    width: 390rpx;
    height: 72rpx;
    background: rgba(71, 159, 254, 0.15);
    line-height: 72rpx;
    font-size: 32rpx;
    color: #4295ff;
  }
  .day-add-icon {
    display: block;
    width: 78rpx;
    height: 78rpx;
  }
}
.u-checkbox-group {
  display: inline-block !important;
  text-align: center;
}
</style>
