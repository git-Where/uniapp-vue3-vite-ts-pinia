<template>
  <div>
    <u--form
      labelPosition="left"
      labelWidth="95"
      :model="formModel"
      :rules="rules"
      ref="form"
    >
      <div class="form-activity">
        <u-form-item label="昵称" prop="nickName" :borderBottom="true">
          <u--input
            v-model="formModel.nickName"
            placeholder="请输入昵称"
            border="none"
          ></u--input>
          <template #right>
            <u-icon
              name="arrow-right"
            ></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="邮箱" prop="email" borderBottom>
          <u--input
            v-model="formModel.email"
            placeholder="请输入邮箱"
            border="none"
          ></u--input>
          <template #right>
            <u-icon
              name="arrow-right"
            ></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="电子签名" prop="email" borderBottom @click="jump">
          <u--input
            v-model="formModel.email"
            disabled
            disabledColor="#ffffff"
            placeholder="辅助信息"
            border="none"

          ></u--input>
          <template #right>
            <u-icon
              name="arrow-right"
            ></u-icon>
          </template>
        </u-form-item>
      </div>
    </u--form>
    <img class="invite-btn" :src="PersonSubmit" @click="submit" />
  </div>
</template>

<script setup lang="ts">
import {PersonSubmit} from '@/static/icon'
import { ref } from "vue";

const form = ref();
const formModel = ref({
  nickName: "",
  email: "",
});
const rules = ref({
  "nickName": {
    type: "string",
    required: true,
    message: "请输入昵称",
    trigger: ["blur", "change"],
  },
  "email": {
    type: "string",
    required: true,
    message: "请输入邮箱",
    trigger: ["blur", "change"],
  },
});
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

const jump = () => {
  uni.navigateTo({
    url:'../../pages/signature/index'
  })
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
}
.u-input__content__field-wrapper__field,
.u-form-item__body__right__message {
  text-align: right !important;
}
</style>
