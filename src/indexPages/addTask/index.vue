<template>
  <div>
    <u--form
      labelPosition="left"
      :model="formModel"
      :rules="rules"
      ref="form"
    >
      <div class="form-activity">
        <u-form-item label="任务名称" required labelWidth="95" prop="TaskName" :borderBottom="true">
          <u--input
            v-model="formModel.TaskName"
            placeholder="请输入任务名称"
            border="none"
          ></u--input>
        </u-form-item>
        <u-form-item label="任务内容" required labelWidth="95" prop="Content" borderBottom>
          <u--input
            v-model="formModel.Content"
            placeholder="请输入任务内容"
            border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
          :label="userInfo.Role_Id === 5 ? '审核管理员' : '值班学生'"
          labelWidth="95"
          required
          prop="UserName"
          borderBottom
          @click="
            showSex = true;
            studentClick();
          "
        >
          <u--input
            v-model="formModel.UserName"
            disabled
            disabledColor="#ffffff"
            :placeholder="userInfo.Role_Id === 5 ? '请选择审核管理员' : '请选择值班学生'"
            border="none"
          ></u--input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="任务安排节次" required labelWidth="95" prop="Lesson" borderBottom  @click="chooseSection">
          <u--input
            v-model="formModel.Lesson"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择任务安排节次"
            border="none"
          ></u--input>
        </u-form-item>
      </div>
    </u--form>
    <img class="invite-btn" :src="TaskSure" @click="submit" />
  </div>
  <u-picker
    :show="studentShow"
    :close-on-click-overlay="true"
    :defaultIndex="defaultIndex"
    :columns="columns"
    :key-name="keyName"
    @cancel="studentShow = false"
    @close="studentShow = false"
    @confirm="confirm"
  />
  <Popup ref="sectionRef" @change="popupClassChange">
    <template #default>
      <div class="section-box">
        <u--form
          labelPosition="left"
          labelWidth="65"
          :model="sectionModel"
          :rules="sectionRules"
          ref="sectionForm"
        >
          <div class="form-activity section-activity">
            <u-form-item
              label="学期"
              required
              prop="SemesterName"
              borderBottom
              @click="semesterClick()"
            >
              <u--input
                v-model="sectionModel.SemesterName"
                disabled
                disabledColor="#ffffff"
                placeholder="请选择学期"
                border="none"
              ></u--input>
              <template #right>
                <u-icon name="arrow-right"></u-icon>
              </template>
            </u-form-item>
            <u-form-item label="周" required prop="Weeks" borderBottom @click="weekClick()">
              <u--input
                v-model="sectionModel.Weeks"
                disabled
                disabledColor="#ffffff"
                placeholder="请选择周"
                border="none"
              ></u--input>
            </u-form-item>
            <u-form-item label="课时" required prop="hours" borderBottom >
              <template #right>
                <div>
                  <div class="add-hour" @click="hourClick()">
                    <img class="add-hour-img" :src="AddHours" alt="" srcset="" />
                  </div>
                  <div class="add-hour-box">
                    <span class="add-hour-text" v-for="(item,index) in Lesson" :key="index">
                      {{item}}
                      <em class="add-hour-close" @click="deleteHour(index)">x</em>
                    </span>
                  </div>
                </div>
              </template>
            </u-form-item>
          </div>
        </u--form>
      </div>
    </template>
  </Popup>
  <WeeksPopup ref="weekRef" :week-num="weekNum" @change="weekChange" />
  <HoursPopup ref="hoursRef" :is-show="isHourShow" @change="hourChange" @cancel="isHourShow = false" />
</template>

<script setup lang="ts">
import {TaskSure,AddHours} from '@/static/icon'
import { ref } from "vue";
import Popup from "@/components/Popup/index.vue";
import WeeksPopup from "./component/WeeksPopup/index.vue";
import HoursPopup from "./component/HoursPopup/index.vue";
import { addOvertimeTasks, getSemesterAll, getStudentList } from '@/api';
import { formatDate, getWeeks } from '@/utils/utils';

const userInfo = uni.getStorageSync('userInfo') || {};
const form = ref();
const showSex = ref(false);
const formModel = ref({
  TaskName:'',
  Content:'',
  UserId:'',
  UserName:'',
  Lesson:''
});
const rules = ref({
  "TaskName": {
    type: "string",
    required: true,
    message: "请输入任务名称",
    trigger: ["blur", "change","triggers"],
  },
  "Content": {
    type: "string",
    required: true,
    message: "请输入任务内容",
    trigger: ["blur", "change","triggers"],
  },
  "UserName": {
    type: "string",
    required: true,
    message: `请选择${userInfo.Role_Id === 5 ? '审核管理员' : '值班学生'}`,
    trigger: ["blur", "change","triggers"],
  },
  "Lesson": {
    type: "string",
    required: true,
    message: `请选择任务安排节次`,
    trigger: ["blur", "change","triggers"],
  }
});
const submit = () => {
  form.value
    .validate()
    .then(async (res) => {
      console.log("校验通过", res);
      const {TaskName,Content,UserId} = formModel.value
      const {SemesterId,Weeks,Lesson} = sectionModel.value
      await addOvertimeTasks({
        TaskName,Content,UserId,SemesterId,Weeks,Lesson
      })
      uni.navigateBack({
        delta: 1
      });
    })
    .catch((errors) => {
      console.log("校验失败");
    });
};

const sectionRef = ref();
const sectionForm = ref();
const sectionModel = ref({
  SemesterId: "",
  SemesterName: "",
  Weeks: "",
  hours:'',
  Lesson:[]
})
const sectionRules = ref({
  SemesterName: {
    type: "string",
    required: true,
    message: "请选择学期",
    trigger: ["blur", "change","trigger"],
  },
  Weeks: {
    type: "string",
    required: true,
    message: "请选择周数",
    trigger: ["blur", "change","trigger"],
  },
  hours: {
    type: "string",
    required: true,
    message: "请选择课时",
    trigger: ["blur", "change","trigger"],
  },
});
const chooseSection = () => {
  sectionRef.value.open("bottom");
};
const weekMap = {
  '周一':1,
  '周二':2,
  '周三':3,
  '周四':4,
  '周五':5,
  '周六':6,
  '周日':7,
}
const popupClassChange = () => {
  sectionForm.value
    .validate()
    .then((res) => {
      console.log("校验通过",res);
      sectionModel.value.Lesson = lessonArray.map((item)=>{
        return {
          week:weekMap[item[0]],
          startLesson:item[1],
          endLesson:item[2]
        }
      })
      formModel.value.Lesson = '已选择'
      sectionRef.value.cancel();
    })
    .catch((errors) => {
      console.log("校验失败");
    });
};

let semesterParams = []
let studentParams = []
onShow(async ()=>{
  getSemester()
  getStudent()
})
const getSemester = () => {
  getSemesterAll().then(res=>{
    semesterParams = res as any
  })
}
const getStudent = async () => {
  const studentRes = await getStudentList({
    page:1,
    pagesize:1000
  })
  studentParams = studentRes.data
}

const columns:any = ref([]);
const defaultIndex = ref()
const studentShow = ref(false)
const weekNum = ref()
const type = ref('')
const keyName = ref('Name')
const semesterClick = () => {
  type.value='1'
  keyName.value = 'Name'
  const index = semesterParams.findIndex((item:any)=>item.Id === sectionModel.value.SemesterId)
  defaultIndex.value = [ index >= 0 ? index : 0]
  columns.value = [semesterParams]
  studentShow.value = true;

};

const studentClick = () => {
  type.value='2'
  keyName.value = 'RealName'
  const index = studentParams.findIndex((item:any)=>item.Id === formModel.value.UserId)
  defaultIndex.value = [ index >= 0 ? index : 0]
  columns.value = [studentParams]
  studentShow.value = true;
};
const confirm = (e) => {
  if(type.value === '1'){ // 学期
    sectionModel.value.SemesterName = e?.value?.[0]?.Name
    sectionModel.value.SemesterId = e?.value?.[0]?.Id
    getWeekList(e.value[0])
  }
  if(type.value === '2'){ // 学生列表
    formModel.value.UserName = e?.value?.[0]?.RealName
    formModel.value.UserId = e?.value?.[0]?.Id
  }
  studentShow.value = false;
};
const getWeekList = (val) => {
  const beginTime = formatDate(val.Begin_Date).split(' ')[0]
  const endTime = formatDate(val.End_Date).split(' ')[0]
  const weeks = getWeeks(beginTime,endTime)+1
  const current = getWeeks(beginTime,'2023-05-20')+1
  weekNum.value = weeks
  console.log('周数：',weeks,current)
}

const weekRef = ref();
const weekClick = () => {
  if(!sectionModel.value.SemesterId){
    return uni.$u.toast("请先选择学期");
  }
  weekRef.value.open();
};
const weekChange = (val) => {
  const weeks = [] as any
  val.forEach((item)=>{
    if(item.active){
      weeks.push(item.value)
    }
  })
  sectionModel.value.Weeks = weeks.join(",")
};

const isHourShow = ref(false);
const hourClick = () => {
  isHourShow.value = true
};
// 选择完课时回调
const Lesson = ref<any>([])
let lessonArray = [] as any
const hourChange = (obj) => {
  const val = toRaw(obj)
  if(lessonArray.some(subArr => JSON.stringify(subArr).includes(JSON.stringify(val)))){
    return uni.$u.toast("该课时已选");
  }
  lessonArray.push(val)
  let time = ''
  if(val[1] === val[2]){
    time = `第${val[1]}节`
  }else{
    time = `第${val[1]}-${val[2]}节`
  }
  sectionModel.value.hours = '1'
  Lesson.value.push(`${val[0]} ${time}`)
  isHourShow.value = false
};
const deleteHour = (index) => {
  Lesson.value.splice(index,1)
  lessonArray.splice(index,1)
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.invite-btn {
  display: block;
  margin: 50rpx auto 0 30rpx;
  width: 680rpx;
  height: 100rpx;
}
.form-activity {
  border-radius: 30rpx;
  background: #fff;
  .u-form-item {
    padding: 0 30rpx;
  }
  &.section-activity {
    .u-form-item {
      padding: 0;
    }
  }
}
.u-input__content__field-wrapper__field,
.u-form-item__body__right__message {
  text-align: right !important;
}
.popup-box {
  .popup-item {
    padding: 20rpx 0;
  }
}
.choose-section {
  text-align: right;
  font-size: 30rpx;
  color: #c7c7c7;
}
.add-hour {
  display: block;
  text-align: right;
  .add-hour-img {
    width: 198rpx;
    height: 65rpx;
  }
}
.add-hour-box {
  overflow: hidden;
  width: 490rpx;
  text-align: left;
}
.add-hour-close {
  display: inline-block;
}
.add-hour-text {
  display: inline-block;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
  width: 240rpx;
  height: 55rpx;
  background: #2196f3;
  line-height: 55rpx;
  text-align: center;
  color: #fff;
  &:nth-of-type(2n+1) {
    margin-right: 10rpx;
  }
}
</style>
