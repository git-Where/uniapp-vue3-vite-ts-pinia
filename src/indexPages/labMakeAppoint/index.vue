<template>
  <div class="lab-make-appoint">
    <u-form labelPosition="left" :model="formData" :rules="rules" ref="form">
      <div class="form-title">
        <img class="form-title-icon" :src="InviteTitleIcon" alt="" />活动信息
      </div>
      <div class="form-activity">
        <u-form-item label="活动主题" labelWidth="85" required prop="Titile" borderBottom>
          <up-input  @change="(value)=>{formData.Titile = value}" :adjust-position="true" placeholder="请输入活动主题" border="none"/>
        </u-form-item>
        <u-form-item label="活动内容" labelWidth="85" prop="Content" borderBottom>
          <up-input @change="(value)=>{formData.Content = value}" :adjust-position="true" placeholder="请输入活动内容" border="none"/>
        </u-form-item>
        <u-form-item
          label="活动类型"
          required
          labelWidth="85"
          prop="TypeName"
          borderBottom
          @click="activityClick"
        >
          <up-input
            v-model="formData.TypeName"
            disabled
            :adjust-position="true"
            disabledColor="#ffffff"
            placeholder="请选择活动类型"
            border="none"
          />
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="组织者" labelWidth="85" prop="Organizer" borderBottom>
          <up-input @change="(value)=>{formData.Organizer = value}" :adjust-position="true" placeholder="请输入组织者" border="none"/>
        </u-form-item>
        <u-form-item label="联系电话" labelWidth="85" required prop="Phone" borderBottom>
          <up-input @change="(value)=>{formData.Phone = value}" :adjust-position="true" placeholder="请输入联系电话" border="none"/>
        </u-form-item>
        <u-form-item label="指导老师" labelWidth="85" required prop="Teacher" borderBottom
          @click="teachOpen">
          <up-input
            v-model="formData.Teacher"
            disabled
            :adjust-position="true"
            disabledColor="#ffffff"
            placeholder="请选择指导老师"
            border="none"
          />
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="人数" labelWidth="85" required prop="Number" borderBottom>
          <up-input @change="(value)=>{formData.Number = value}" :adjust-position="true" type="number" placeholder="请输入人数" border="none"/>
        </u-form-item>
      </div>
      <div class="form-title">
        <img class="form-title-icon" :src="InviteTitleIcon" alt="" />活动信息
      </div>
      <div class="form-activity">
        <u-form-item
          label="实验室"
          required
          labelWidth="85"
          prop="LaboratoryName"
          borderBottom
          @click="labOpen"
        >
          <up-input
            v-model="formData.LaboratoryName"
            disabled
            :adjust-position="true"
            disabledColor="#ffffff"
            placeholder="请选择实验室"
            border="none"
          />
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item
          label="预约日期"
          required
          labelWidth="85"
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
      </div>
    </u-form>
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
  <Popup ref="popupTeachRef" @change="popupTeachChange"  @cancel="teachCancel">
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
              :label="item.RealName"
              :name="item.Id"
            >
            </u-checkbox>
        </u-checkbox-group>
      </div>
    </template>
  </Popup>
  <Popup ref="popupLabRef" @change="popupLabChange" @cancel="labCancel">
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
  <AppointTime ref="appTimeRef"  @update:model-value="updateModelValue"/>
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
  Titile: [
    {
      type: "string",
      required: true,
      message: "请填写活动主题",
      trigger: ["blur", "change"],
    },
    {
			// 自定义验证函数，见上说明
			validator: (rule, value, callback) => {
				return formData.value.Titile.length > 0
			},
			message: '请填写活动主题',
			// 触发器可以同时用blur和change
			trigger: ['change','blur'],
		}
  ],
  TypeName: {
    type: "string",
    required: true,
    message: "请选择活动类型",
    trigger: ["blur", "change"],
  },
  Phone: [
      {
      type: "string",
      required: true,
      message: "请输入联系电话",
      trigger: ["blur", "change"],
    },
    {
			// 自定义验证函数，见上说明
			validator: (rule, value, callback) => {
				// 上面有说，返回true表示校验通过，返回false表示不通过
				// uni.$u.test.mobile()就是返回true或者false的
        // let regPone: any = null;
        // let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; // 手机正则
        // let tel = /^(0\d{2,3}-){0,1}\d{7,8}$/; //座机
        // if (value.contactPhone.charAt(0) === '0') {
        //   regPone = tel;
        // } else {
        //   regPone = mobile;
        // }
        // if (!regPone.test(value.contactPhone)) {
        //   return useMessage('联系电话为手机号或者电话格式，请填写联系电话', {
        //     type: 'warning'
        //   });
        // }
				return uni.$u.test.mobile(value) && formData.value.Titile.length > 0;
			},
			message: '联系电话不正确',
			// 触发器可以同时用blur和change
			trigger: ['change','blur'],
		}
  ],
  Teacher: {
    type: "string",
    required: true,
    message: "请选择指导老师",
    trigger: ["blur", "change"],
  },
  Number: [
    {
      required: true,
      type:'integer',
      message: "请输入正整数活动人数",
      trigger: ["blur", "change"],
    },
    {
			// 自定义验证函数，见上说明
			validator: (rule, value, callback) => {
				return formData.value.Number.length > 0
			},
			message: '请输入正整数活动人数',
			// 触发器可以同时用blur和change
			trigger: ['change','blur'],
		}
  ],
  LaboratoryName: {
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
  form.value.validateField('TypeName')
  show.value = false
}
let teachIds = []
const teachOpen = () => {
  formData.value.TeacherId = teachIds
  popupTeachRef.value.open()
}
const popupTeachChange = async () => {
  formData.value.Teacher = formData.value.TeacherId?.reduce((pre:any, cur:any)=>{
     pre.push(teachList.value.find((n)=>n.Id === cur).RealName)
     return pre
  },[]).join()
  teachIds = formData.value.TeacherId
  popupTeachRef.value.cancel()
  form.value.validateField('Teacher')
}
let LaboratoryId = []
const labOpen = async () => {
  formData.value.Laboratory = LaboratoryId
  popupLabRef.value.open()
}
const popupLabChange = () => {
  formData.value.LaboratoryName = formData.value.Laboratory?.reduce((pre:any, cur:any)=>{
     pre.push(labList.value.find((n)=>n.Id === cur).Name)
     return pre
  },[]).join()
  LaboratoryId = formData.value.Laboratory
  popupLabRef.value.cancel()
  form.value.validateField('LaboratoryName')
}

const labCancel = ()=>{
  formData.value.Laboratory = []
}

const teachCancel = () => {
  formData.value.TeacherId = []
}

const activityId = ref('')

const submit = async() => {
  await form.value.validate()
  if(timeList.value.length === 0){
    return uni.showToast({
      title: '请选择预约日期' ,
      icon: 'none'
    })
  }
  formData.value.TeacherId = typeof formData.value.TeacherId === 'string' ? formData.value.TeacherId : formData.value.TeacherId.join() as any
  if(!activityId.value){
    activityId.value = await addBusinessActivity(formData.value)
  }
  const params = {
    ActivityId:activityId.value,
    ScheduleList:dealDateFormatter()
  }
  const resData = await addBusinessBatch(params)
  uni.navigateBack()
}

const dealDateFormatter = () => {
  const dayMap = {}
  timeList.value.forEach((item)=>{
    const day = item.split(' ')[0]
    const dayTime = item.split(' ')[1]
    if(dayMap.hasOwnProperty(day)){
      dayMap[day].push(dayTime)
    }else{
      dayMap[day] = []
      dayMap[day].push(dayTime)
    }
  })
  const ScheduleList = Object.keys(dayMap).map((key) => {
    return dayMap[key].map((item)=>{
      const splitItem = item.split('-')
      return {
        Date:key,
        StartTime:splitItem[0],
        EndTime:splitItem[1],
        Laboratory:formData.value.Laboratory,
      }
    })
  });
  return ScheduleList.flat()
}

const appTimeRef = ref()
const timeList = ref([])
const updateModelValue = (value) => {
  if(!value) return
  timeList.value.push(value)
}
const handleDelTime = (index) => {
  timeList.value.splice(index,1)
}
const handleDayAdd = () => {
  appTimeRef.value.open()
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.lab-make-appoint {
  .u-form-item__body {
    padding: 30rpx 0 !important;
  }
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
    text-align: center;
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
