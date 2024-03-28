<template>
  <div class="approve-box">
    <u-sticky bgColor="#fff">
      <div class="approve-search">
        <uni-search-bar v-model="keyword" placeholder="请输入" radius="20" bgColor="#fff" @confirm="search" @cancel="cancel" @clear="cancel"/>
      </div>
      <div class="approve-tab">
        <Tabs
          :tab-list="list"
          :line-width="136"
          :line-height="2"
          :scrollable="false"
          :item-style="{
            flex: '1',
            height: '94rpx'
          }"
          @tab-change="tabClick"
        />
      </div>
    </u-sticky>
    <div class="approve-content">
      <ApproveContent v-model="formData" @getList="()=>{formData = [];init()}"/>
    </div>
  <div v-if="totalNum !== formData.length" class="load-more" @click="more">点击加载更多</div>
  <div v-else class="load-more">到底了</div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tabs from '@/components/Tabs/index.vue'
import ApproveContent from './components/ApproveContent/index.vue'
import { getBusinessList } from '@/api/business';

const list = ref([
  {
    name: "待审核",
    id:1,
    badge: {
      value: 0,
    }
  },
  {
    name: "已通过",
    id:0,
    badge: {
      value: 0,
    }
  },
  {
    name: "已拒绝",
    id:3,
    badge: {
      value: 0,
    }
  }
]);
const page = ref(1)
const status = ref(1)
const formData = ref([])
const totalNum = ref(0)
const keyword = ref('')
onShow(async ()=>{
  formData.value = []
  init()
})

const init = async () => {
  const res:any = await getBusinessList({
    page:page.value,
    pagesize:10,
    modaltype:2,
    status:status.value,
    keyword:keyword.value,
  })
  page.value = res.pageNo
  formData.value = formData.value.concat(res.data)
  totalNum.value = res.totalCount
  if(res.totalCount === 0){
    formData.value = []
  }
  list.value.find((item)=>item.id === status.value).badge.value = res.totalCount
}

const tabClick = (item) => {
  keyword.value = ''
  formData.value = []
  status.value = item.id
  totalNum.value = 0
  page.value = 1
  init()
}
const cancel = () => {
  keyword.value = ''
  formData.value = []
  init()
}
const search = (res) => {
  keyword.value = res.value
  formData.value = []
  init()
}

const more = () => {
  page.value += 1
  init()
}

</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $uni-bg-color-grey;
}
.approve-search {
  padding-top: 5rpx;
  height: 100rpx;
  background-color: $uni-bg-color-grey;
  .uni-searchbar {
    padding: 15rpx 20rpx 0;
  }
}
.approve-tab {
  height: 96rpx;
  background-color: #fff;
}
.search-result {
  padding-top: 10px;
  padding-bottom: 20px;
  text-align: center;
}
.search-result-text {
  text-align: center;
  font-size: 14px;
  color: #666;
}
.example-body {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 0;
}
.uni-mt-10 {
  margin-top: 10px;
}

</style>
