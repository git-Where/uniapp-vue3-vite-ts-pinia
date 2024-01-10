import { getUserInfo } from "@/api";

export default defineStore({
  id: 'app',
  state: () => {
    return {
      systemInfo: {}
    } as {
      systemInfo: UniApp.GetSystemInfoResult;
    };
  },
  actions: {
    async getSystemInfo() {
      // if (Object.keys(this.systemInfo).length) return this.systemInfo;
      // const systemInfo:any = await getUserInfo()
      // this.systemInfo = systemInfo && JSON.parse(systemInfo);
      // console.log('this.systemInfo:',this.systemInfo)
      // return systemInfo;
    }
  }
});
