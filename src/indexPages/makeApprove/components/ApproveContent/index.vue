<template>
  <div class="approve-content">
    <div class="approve-content-item" v-for="item in modelValue" :key="item.Id">
      <div class="approve-content-item-title">{{item.LaboratoryName}}</div>
      <div class="approve-content-item-content">
        <div class="approve-content-title">
          <img class="approve-icon" :src="ApproveIcon" />
          <div class="approve-title u-line-1">{{item.ActivityName}}</div>
        </div>
        <div class="approve-content-con">
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">预约时间</span>
            <span class="approve-content-con-span"
              >{{formatDate(item.Date)}}</span
            >
          </div>
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">活动内容</span>
            <span class="approve-content-con-span"
              >{{item.ActivityName}}</span
            >
          </div>
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">指导老师</span>
            <span class="approve-content-con-span"
              >{{item.Teacher}}</span
            >
          </div>
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">联系电话</span>
            <span class="approve-content-con-span"
              >{{item.ActivityName}}</span
            >
          </div>
          <div class="approve-content-con-item">
            <span class="approve-content-con-label">申请者</span>
            <span class="approve-content-con-span"
              >{{item.Organizer}}</span
            >
          </div>
          <div class="approve-btn-box">
            <div class="approve-btn-ope" v-if="item.OrderStatus === 1" @click="handleApprove(item)">审核</div>
            <div class="approve-btn-cancel" v-if="item.OrderStatus === 0" @click="handleCancel(item)">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <u-modal
    ref="uModal"
    :show="show"
    width="600rpx"
    confirmText="确定"
    :cancelText="isApprove ? '拒绝' : '取消'"
    :asyncClose="false"
    showConfirmButton
    showCancelButton
    closeOnClickOverlay
    @confirm="confirm"
    @cancel="cancel"
  >
    <template #default>
      <div class="approve-modal-content" v-if="isApprove">
        是否通过由{{approveMap?.TeacherName}}老师提交的活动预约<span class="approve-modal-content-title">【{{ approveMap?.ActivityName }}】</span>
      </div>
      <div class="approve-cancel-box" v-else>
        <img class="approve-cancel-icon" :src="WarningIcon" />
        <div class="approve-cancel-text">
          拒绝理由
        </div>
        <u--textarea class="approve-cancel-textarea" v-model="textVal" placeholder="请输入拒绝理由..." ></u--textarea>
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {ApproveIcon,WarningIcon} from '@/static/icon'
import { setBusinessStatus } from '@/api/business';
import {formatDate} from '@/utils/utils'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([])
  }
});
const emit = defineEmits('getList')
const formData = ref(props.modelValue)
const show = ref(false);
const textVal = ref('')
const isApprove = ref(true)
const approveMap = ref({})

const handleApprove = (item) => {
  show.value = true;
  approveMap.value = item;
  isApprove.value = true;
};

const handleCancel = (item) => {
  show.value = true;
  approveMap.value = item;
  isApprove.value = false;
};

const confirm = async () => {
  await setBusinessStatus({
    Id:approveMap.value.Id,
    Status:isApprove.value ? 0 : 3,
    RefuseReason:isApprove.value ? textVal.value : ''
  })
  emit('getList')
  show.value = false;
};
const cancel = async () => {
  if(isApprove.value){
    await setBusinessStatus({
      Id:approveMap.value.Id,
      Status:3,
      RefuseReason:''
    })
    emit('getList')
  }
  show.value = false;
}
</script>

<style lang="scss">
.approve-content {
  padding: 0 30rpx;
}
.approve-content-item {
  .approve-content-item-title {
    padding: 30rpx 0;
    font-weight: bold;
    font-size: 36rpx;
    color: #666;
  }
  .approve-content-item-content {
    padding: 0 25rpx;
    border-radius: 21rpx;
    background: #fff;
  }
  .approve-content-title {
    display: flex;
    align-items: center;
    padding: 25rpx 0;
    border-bottom: 1rpx solid #e3e3e3;
  }
  .approve-icon {
    display: inline-block;
    margin-right: 15rpx;
    width: 52rpx;
    height: 52rpx;
    vertical-align: middle;
    font-weight: bold;
    font-size: 36rpx;
    color: #333;
  }
  .approve-title {
    flex: 1;
  }
  .approve-content-con {
    .approve-content-con-item {
      display: flex;
      padding: 30rpx 0;
      span {
        font-weight: 500;
        font-size: 29rpx;
      }
    }
    .approve-content-con-label {
      display: inline-block;
      margin-right: 50rpx;
      width: 140rpx;
      color: #666;
    }
    .approve-content-con-span {
      flex: 1;
      color: #333;
    }
    .approve-btn-box {
      padding-bottom: 30rpx;
      text-align: right;
      .approve-btn-ope,
      .approve-btn-cancel {
        display: inline-block;
        padding: 0rpx 70rpx;
        border-radius: 10rpx;
        height: 68rpx;
        line-height: 68rpx;
        font-weight: bold;
        font-size: 30rpx;
      }
      .approve-btn-ope {
        background: #3d94ef;
        color: #fff;
      }
      .approve-btn-cancel {
        border: 1px solid #fe6466;
        color: #fe6466;
      }
    }
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
