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
        <u-form-item label="昵称" prop="NickName" :borderBottom="true">
          <u--input
            v-model="formModel.NickName"
            placeholder="请输入昵称"
            border="none"
          ></u--input>
          <template #right>
            <u-icon
              name="arrow-right"
            ></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="邮箱" prop="EMAIL" borderBottom>
          <u--input
            v-model="formModel.EMAIL"
            placeholder="请输入邮箱"
            border="none"
          ></u--input>
          <template #right>
            <u-icon
              name="arrow-right"
            ></u-icon>
          </template>
        </u-form-item>
        <u-form-item label="电子签名" prop="SignatureName" borderBottom @click="jump">
          <u--input
            v-model="formModel.SignatureName"
            disabled
            disabledColor="#ffffff"
            placeholder="辅助信息"
            border="none"
          />
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
import { getUserInfo, setUserInfo } from '@/api';
import {PersonSubmit} from '@/static/icon'
import { ref } from "vue";

const form = ref();
const formModel = ref({
  NickName: "",
  EMAIL: "",
  Id:0,
  Signature:'',
  SignatureName:''
});
const rules = ref({
  "NickName": {
    type: "string",
    required: true,
    message: "请输入昵称",
    trigger: ["blur", "change"],
  },
  "EMAIL":[
    {
      type: "string",
      required: true,
      message: "请输入邮箱",
      trigger: ["blur", "change"],
    },
    {
			// 自定义验证函数，见上说明
			validator: (rule, value, callback) => {
				// 上面有说，返回true表示校验通过，返回false表示不通过
				// uni.$u.test.mobile()就是返回true或者false的
				return uni.$u.test.email(value);
			},
			message: '邮箱输入不正确',
			// 触发器可以同时用blur和change
			trigger: ['change','blur'],
		}
  ]
});

onLoad(()=>{
  uni.$on('getBaseUrl', function(data) {
		console.log('我在B页面选择了:', data);
    formModel.value.Signature = data.current
    formModel.value.SignatureName = '已签'
	})
  init()
  const userInfo = uni.getStorageSync('userInfo') || {};
  formModel.value.Id = userInfo.Id
})

const init = async () => {
  const res = await getUserInfo()
  uni.setStorageSync('userInfo',res)
  const {Id='',EMAIL='',NickName='',Signature=''} = res
  formModel.value = {
    ...formModel.value,
    EMAIL,
    NickName,
    Id,
    Signature,
    SignatureName:Signature?'已签':''
  }
}

const submit = () => {
  form.value
    .validate()
    .then(async (res) => {
      console.log("校验通过", res);
      const {Signature,NickName,EMAIL,Id} = formModel.value
      await setUserInfo({
        Signature,NickName,EMAIL,Id
      })
      const userInfos = uni.getStorageSync('userInfo') || {};
      uni.setStorageSync('userInfo',{...userInfos,NickName,EMAIL,Signature})
      uni.navigateBack({
        delta:1
      })
      uni.$off('getBaseUrl')
    })
    .catch((errors) => {
      console.log("校验失败");
    });
};

const jump = () => {
  uni.navigateTo({
    url:'../../pages/signature/index?action=user'
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
