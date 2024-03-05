<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { getUserInfo } from './api';
onLaunch(() => {
  console.log('App Launch');
});
onShow(async () => {
  console.log('App Show');

  // const userInfo = await getUserInfo()
  // uni.setStorageSync('userInfo', userInfo);
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';
@import '@/static/css/index.scss'

</style>
