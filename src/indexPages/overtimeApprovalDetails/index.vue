<template>
  <div>
    <u--form
      labelPosition="left"
      ref="form"
    >
      <div class="form-activity">
        <u-form-item label="任务名称" labelWidth="95" prop="Name" :borderBottom="true">
          {{formModel?.Name}}
        </u-form-item>
        <u-form-item label="任务内容" labelWidth="95" prop="Content" borderBottom>
          {{formModel?.Content}}
        </u-form-item>
        <u-form-item
          label="值班学生"
          labelWidth="95"
          prop="UserName"
          borderBottom
        >
          {{formModel?.UserName}}
        </u-form-item>
        <u-form-item label="任务安排节次" labelWidth="95" prop="Lesson" borderBottom >
          第{{formModel?.Week}}周的周{{formModel?.WeekDay}} 第{{formModel?.StartLesson}}-{{formModel?.EndLesson}}节次
        </u-form-item>
      </div>
    </u--form>
    <div class="approve-btn-box">
      <div class="invite-btn" v-if="userInfo.Role_Id === 1 && overStatus == 0" @click="submit">
        审核
      </div>
      <div class="invite-btn invite-cancel" @click="cancel">
        取消
      </div>
    </div>
  </div>
  <u-modal
    ref="uModal"
    :show="show"
    width="600rpx"
    confirmText="确定"
    cancelText="取消"
    :asyncClose="false"
    showConfirmButton
    showCancelButton
    closeOnClickOverlay
    @confirm="confirm"
    @cancel="show = false"
  >
    <template #default>
      <div class="approve-modal-content">
        <u-radio-group
          v-model="status"
          placement="row"
          @change="checkboxChange"
      >
          <u-radio
              :customStyle="{marginBottom: '8px'}"
              v-for="(item, index) in statusMap"
              :key="index"
              :label="item.name"
              :name="item.id"
          >
          </u-radio>
      </u-radio-group>
      </div>
      <div class="approve-cancel-box" v-if="status === 2">
        <u--textarea class="approve-cancel-textarea" v-model="CheckErrorLog" placeholder="请输入理由..." ></u--textarea>
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { checkedOvertimeTask, getTaskDetail } from "@/api";
import { ref } from "vue";

const form = ref();
const formModel = ref();
const Id = ref()
const show = ref(false)
const CheckErrorLog = ref('')
const statusMap = [
    {
      name: '审核通过',
      id:1,
      disabled: false,
    },
    {
      name: '拒绝',
      id:2,
      disabled: false,
    }
  ]
const status = ref()
const userInfo = uni.getStorageSync('userInfo') || {};
const overStatus = ref()
onLoad((option:any)=>{
  Id.value = option.id
  overStatus.value = option.status
  console.log('option',option)
  init(option.id)

})
const init = async (Id) => {
  const res = await getTaskDetail({
    Id
  })
  formModel.value = res
}
const submit = async () => {
  show.value = true
};
const confirm = async () => {
  if(!status.value){
    return uni.$u.toast("请先选择审核原因");
  }
  await operate(status.value)
}
const cancel = async () => {
  await operate(3)
}
const operate = async (status) => {
  await checkedOvertimeTask({
    Id:Id.value,
    status,
    CheckErrorLog:CheckErrorLog.value
  })
  show.value = false
  uni.navigateBack({
		delta:1,
		success: () => {
			uni.$emit('getName',{
				current: '1'
			})
		}
	})
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.approve-btn-box {
  display: flex;
  padding: 0 10rpx;
}
.invite-btn {
  display: block;
  flex: 1;
  margin: 50rpx 10rpx;
  border-radius: 50rpx;
  height: 95rpx;
  background: linear-gradient(90deg, #49b5fa, #2f74ff);
  line-height: 95rpx;
  text-align: center;
  font-size: 36rpx;
  color: #fff;
  &.invite-cancel {
    background: linear-gradient(90deg, #f36e6e, #f44848);
  }
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
  .u-form-item__body__right__content__slot {
    text-align: right;
  }
}
.approve-modal-content {
  text-align: center;
  font-weight: 500;
  font-size: 32rpx;
  color: #333;
  .approve-modal-content-title {
    color: #007aff;
  }
  .u-radio {
    width: 225rpx;
  }
}
.approve-cancel-box {
  width: 500rpx;
  .approve-cancel-icon {
    display: block;
    margin: 0 auto;
    width: 48rpx;
    height: 48rpx;
  }
  .approve-cancel-text {
    padding: 10rpx 0;
    text-align: center;
    font-weight: bold;
    font-size: 36rpx;
    color: #f82;
  }
  .approve-cancel-textarea {
    text-align: left;
  }
}
</style>
