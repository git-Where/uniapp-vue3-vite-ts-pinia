<template>
  <div class="class-schedule">
    <div class="class-item" v-for="(item,index) in list" :key="index">
      <div class="class-item-left">
        <img class="class-item-img" :src="imgBaseUrl+item.imgUrl" />
      </div>
      <div class="class-item-content">
        <div class="class-item-title clearfix">


          {{item.SceneName}}
        </div>
        <div class="class-item-status">
          状态
          <div class="class-item-switch">
            <u-switch
              v-model="item.IsEnable"
              size="15"
              activeColor="#3D94EF"
              inactiveColor="#FF6564"
              @change="switchChange(item)">
            </u-switch>
          </div>
        </div>
        <div class="class-item-map" v-if="item.Describe">
          {{item.Describe}}
        </div>
      </div>
      <div class="class-item-right">
        <div class="class-item-button ">
          <up-button v-if="item.laboratorys?.length === 0" class="class-item-btn" type="primary" :plain="true" text="选择实验室" @click="chooseLab(item)"/>
          <div v-else class="class-item-btn class-room" @click="chooseLab(item)">
            <span class="class-item-room" v-for="n in item.laboratorys" :key="n.Id">{{ n.name }}</span>
          </div>
          <up-button class="class-item-btn class-now" type="primary" :plain="false" text="立即执行" @click="rightNow(item)"/>
        </div>
      </div>
    </div>
  </div>
  <Popup ref="popupRef" @change="popupChange">
    <template #default>
      <div class="popup-box">
        <u-checkbox-group
            v-model="checkboxValue"
            placement="column"
            @change="checkboxChange"
        >
            <u-checkbox
              :customStyle="{marginBottom: '30px'}"
              activeColor="#2D9EFE"
              v-for="(item, index) in labList"
              :key="index"
              :label="'['+item.RoomCode +']' + item.Name"
              :name="item.Id"
            >
            </u-checkbox>
        </u-checkbox-group>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import {ClassIcon1,ClassIcon2,ClassIcon3,ClassIcon4,ClassIcon5,ClassIcon6} from '@/static/icon'
import Popup from '@/components/Popup/index.vue'
import { getDict, getLabAll, getScene, setSenceEdit, setSenceLabRep } from '@/api';
import {imgBaseUrl} from '@/config/app'


const popupRef = ref()
const SenceId = ref()
const checkboxValue = ref<any>([]);
const labList = ref<any>([])
const list = ref<any>([
//   {
//   icon:ClassIcon1,
//   name:'上课模式',
//   details:'触发情景：上课前30分钟'
// },{
//   icon:ClassIcon2,
//   name:'下课模式',
//   details:'触发情景：上课前30分钟'
// },{
//   icon:ClassIcon3,
//   name:'午休模式',
//   details:'触发情景：上课前30分钟'
// },{
//   icon:ClassIcon4,
//   name:'放学模式',
//   details:'触发情景：上课前30分钟'
// },{
//   icon:ClassIcon5,
//   name:'影音模式',
//   details:'触发情景：上课前30分钟'
// },{
//   icon:ClassIcon6,
//   name:'自定义模式',
// }
])
onShow(async ()=>{
  init()
  getLabs()
  const res = await getDict({
    types:'课程属性'
  })
})

const init = async () => {
  const res = await getScene()
  list.value=res
}
const getLabs = async () => {
  const res = await getLabAll()
  labList.value=res
}
const checkboxChange = async (ids) => {
  console.log(ids,'ids')
  checkboxValue.value=ids
};
const chooseLab = (itemData:any = []) => {
  SenceId.value = itemData.Id
  const ids = itemData?.laboratorys?.map((item:any)=>{
    return item.Id
  })
  checkboxValue.value = ids
  popupRef.value.open('bottom')
}

const rightNow = (item) => {

}

const popupChange = async () => {
  await setSenceLabRep({
    SenceId:SenceId.value,
    LabIds:checkboxValue.value.join(',')
  })
  uni.$u.toast('设置成功')
  popupRef.value.cancel()
  init()
}

const switchChange = async (val) => {
  await setSenceEdit({
    SceneId:val.Id,
    IsEnable:val.IsEnable
  })
  uni.$u.toast('状态设置成功')
  init()
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.class-schedule {
  padding-top: 20rpx;
  .class-item {
    display: flex;
    margin-bottom: 20rpx;
    padding: 30rpx;
    background: #fff;
  }
  .class-item-left {
    display: block;
    margin-right: 30rpx;
    width: 150rpx;
    height: 150rpx;
    .class-item-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .class-item-content {
    flex: 1;
  }
  .class-item-right {
    display: block;
    width: 150rpx;
  }
  .class-room {
    display: flex;
    overflow: hidden;
    border: 1rpx solid #3c9cff;
    border-radius: 8rpx;
    height: 62rpx;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    -webkit-box-orient: vertical !important;
  }
  .class-item-room {
    display: none;
    overflow: hidden;
    margin: 10rpx 6rpx 0;
    padding: 4rpx;
    border-radius: 5rpx;
    max-width: initial;
    height: 37rpx;
    background: #e5f1ff;
    text-overflow: ellipsis;
    font-size: 28rpx;
    color: #3d94ef;
    white-space: nowrap;
    &:first-child,
    &:nth-child(2) {
      display: block;
      flex: 1;
    }
  }
  .class-item-title {
    font-weight: 500;
    font-size: 36rpx;
    color: #333;
  }
  .class-item-button {
    float: right;
    border-radius: 10rpx;
    width: 170rpx;
    height: 58rpx;
    font-size: 28rpx;
    color: #3d94ef;
    .u-button {
      border: 1px solid #3d94ef;
      border-radius: 10rpx;
      width: 170rpx;
      height: 58rpx;
      &:last-child {
        margin-top: 20rpx;
      }
    }
  }
  .class-item-status,
  .class-item-map {
    font-size: 28rpx;
    color: #666;
    .class-item-switch {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .class-item-status {
    margin: 10rpx 0;
  }
}
.popup-box {
  :deep() {
    .u-checkbox-group {
      display: block !important;
      flex-direction: inherit !important;
      padding-left: 70rpx;
    }
  }
  .popup-item {
    padding: 20rpx 0;
  }
  .u-checkbox {
    margin: 10rpx auto;
  }
}
</style>
