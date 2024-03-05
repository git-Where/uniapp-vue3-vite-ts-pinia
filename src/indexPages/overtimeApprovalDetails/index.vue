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
          {{formModel?.StartLesson}}
        </u-form-item>
      </div>
    </u--form>
    <div class="invite-btn" @click="submit">
      审核
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkedOvertimeTask, getTaskDetail } from "@/api";
import { ref } from "vue";

const form = ref();
const formModel = ref();
const Id = ref()
onLoad((option:any)=>{
  Id.value = option.id
  init(option.id)

})
const init = async (Id) => {
  const res = await getTaskDetail({
    Id
  })
  formModel.value = res
}
const submit = async () => {
  await checkedOvertimeTask({
    Id:Id.value,
    status:'',
    CheckErrorLog:''
  })
  uni.navigateBack()
};

</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.invite-btn {
  display: block;
  margin: 50rpx auto 0;
  border-radius: 50rpx;
  width: 545rpx;
  height: 95rpx;
  background: linear-gradient(90deg, #49b5fa, #2f74ff);
  line-height: 95rpx;
  text-align: center;
  font-size: 36rpx;
  color: #fff;
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
</style>
