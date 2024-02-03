<template>
  <div>
    <u--form
      labelPosition="left"
      :model="formModel"
      :rules="rules"
      ref="form"
    >
      <div class="form-activity">
        <u-form-item label="任务名称" labelWidth="95" prop="userInfo.name" :borderBottom="true">
          <u--input
            v-model="formModel.userInfo.name"
            placeholder="请输入任务名称"
            border="none"
          ></u--input>
        </u-form-item>
        <u-form-item label="任务内容" labelWidth="95" prop="userInfo.name" borderBottom>
          <u--input
            v-model="formModel.userInfo.name"
            placeholder="请输入任务内容"
            border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="值班学生"
          labelWidth="95"
          required
          prop="userInfo.sex"
          borderBottom
          @click="
            showSex = true;
            chooseLab();
          "
        >
          <u--input
            v-model="formModel.userInfo.sex"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择值班学生"
            border="none"
          ></u--input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="任务安排节次" labelWidth="95" prop="userInfo.name" borderBottom  @click="chooseSection">
          <u--input
            v-model="formModel.userInfo.name"
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
  <!-- <Popup ref="studentPopupRef" @change="popupChange">
    <template #default>
      <div class="popup-box">
        <div class="popup-item">学生</div>
        <div class="popup-item">老师</div>
        <div class="popup-item">121212</div>
        <div class="popup-item">121212</div>
      </div>
    </template>
  </Popup> -->

  <u-picker
    :show="studentShow"
    :close-on-click-overlay="true"
    :columns="columns"
    keyName="Name"
    @cancel="studentShow = false"
    @close="studentShow = false"
    @confirm="confirm"
  ></u-picker>
  <Popup ref="sectionRef" @change="popupClassChange">
    <template #default>
      <div class="section-box">
        <u--form
          labelPosition="left"
          labelWidth="65"
          :model="sectionFormModel"
          :rules="sectionRules"
          ref="sectionForm"
        >
          <div class="form-activity">
            <u-form-item
              label="学期"
              required
              prop="semester"
              borderBottom
              @click="semesterClick()"
            >
              <u--input
                v-model="sectionFormModel.semester"
                disabled
                disabledColor="#ffffff"
                placeholder="请选择学期"
                border="none"
              ></u--input>
              <template #right>
                <u-icon name="arrow-right"></u-icon>
              </template>
            </u-form-item>
            <u-form-item label="周" required prop="weeks" borderBottom @click="weekClick()">
              <u--input
                v-model="sectionFormModel.weeks"
                disabled
                disabledColor="#ffffff"
                placeholder="请选择周"
                border="none"
              ></u--input>
            </u-form-item>
            <u-form-item label="课时" required prop="hours" borderBottom @click="hourClick()">
              <template #right>
                <div class="add-hour">
                  <img class="add-hour-img" :src="AddHours" alt="" srcset="" />
                </div>
              </template>
            </u-form-item>
          </div>
        </u--form>
      </div>
    </template>
  </Popup>
  <!-- <SemesterPopup ref="semesterRef" @change="semesterChange" /> -->
  <WeeksPopup ref="weekRef" v-model="weekNum" @change="weekChange" />
  <HoursPopup ref="hoursRef" v-if="isHourShow" :is-show="isHourShow" @change="hourChange" @cancel="isHourShow = false" />
</template>

<script setup lang="ts">
import {TaskSure,AddHours} from '@/static/icon'
import { ref } from "vue";
import Popup from "@/components/Popup/index.vue";
import SemesterPopup from "./component/SemesterPopup/index.vue";
import WeeksPopup from "./component/WeeksPopup/index.vue";
import HoursPopup from "./component/HoursPopup/index.vue";
import { getSemesterAll } from '@/api';
import { formatDate, getWeeks } from '@/utils/utils';

const studentPopupRef = ref();
const form = ref();
const showSex = ref(false);
const formModel = ref({
  userInfo: {
    name: "",
    sex: "",
  },
});
const rules = ref({
  "userInfo.name": {
    type: "string",
    required: true,
    message: "请填写姓名",
    trigger: ["blur", "change"],
  },
  "userInfo.sex": {
    type: "string",
    max: 1,
    required: true,
    message: "请选择值班学生",
    trigger: ["blur", "change"],
  },
});
const popupChange = (val) => {
  console.log(val, "111111");
};
const submit = () => {
  form.value
    .validate()
    .then((res) => {
      uni.$u.toast("校验通过", res);
    })
    .catch((errors) => {
      uni.$u.toast("校验失败");
    });
};

const sectionRef = ref();
const sectionForm = ref();
const sectionFormModel = ref({
  semester: "",
  weeks: "",
  hours: "",
});
const sectionRules = ref({
  semester: {
    type: "string",
    required: true,
    message: "请选择学期",
    trigger: ["blur", "change"],
  },
  weeks: {
    type: "string",
    max: 1,
    required: true,
    message: "请选择周数",
    trigger: ["blur", "change"],
  },
  hours: {
    type: "string",
    max: 1,
    required: true,
    message: "请选择课时",
    trigger: ["blur", "change"],
  },
});
const chooseSection = () => {
  sectionRef.value.open("bottom");
};
const popupClassChange = () => {
  sectionForm.value
    .validate()
    .then((res) => {
      uni.$u.toast("校验通过", res);
      sectionRef.value.cancel();
    })
    .catch((errors) => {
      uni.$u.toast("校验失败");
    });
};

onShow(async ()=>{
  getSemester()
})
const getSemester = () => {
  getSemesterAll().then(res=>{
    columns.value = [res]
  })
}

const studentShow = ref(false)
const weekNum = ref()
const semesterRef = ref();
const semesterClick = () => {
  // semesterRef.value.open();
  studentShow.value = true;

};
const semesterChange = (val) => {};

const columns:any = ref([['学生1','学生2']]);
const chooseLab = () => {
  studentShow.value = true;
};
const confirm = (e) => {

  studentShow.value = false;
  console.log(1,e)
  getWeekList(e.value[0])
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
  weekRef.value.open();
};
const weekChange = (val) => {};

const isHourShow = ref(false);
const hourClick = () => {
  isHourShow.value = true
};
// 选择完课时回调
const hourChange = (val) => {
  console.log(val)
  isHourShow.value = false
};

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
  width: 198rpx;
  height: 65rpx;
  .add-hour-img {
    width: 100%;
    height: 100%;
  }
}
</style>
