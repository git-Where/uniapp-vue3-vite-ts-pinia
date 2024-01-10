export function navBarHeight(){
  return new Promise((resolve, reject) => {
    const custom = uni.getMenuButtonBoundingClientRect()
    // 状态栏高度
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
    // 导航栏高度
    const navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2
    const navHeight = navigationBarHeight + statusBarHeight
    const heiMap = {
      statusHeight:statusBarHeight, // 状态栏的高度
      navigationBarHeight,// 胶囊按钮所在的顶部导航的高度
      navHeight,// 整个顶部导航栏的高度
    }
    resolve(heiMap)
    // uni.getSystemInfo({
    //   success: res => {
    //     const navPadding = menuData.top - res.statusBarHeight
    //     const navHeight = res.statusBarHeight + navPadding * 2 + menuData.height
    //     const menuHeight = menuData.height + navPadding * 2
    //     const heiMap = {
    //       statusHeight:statusBarHeight, // 状态栏的高度
    //       navigationBarHeight,// 胶囊按钮所在的顶部导航的高度
    //       navHeight,// 整个顶部导航栏的高度
    //     }
    //     resolve(heiMap)
    //   }
    // })
  })
}
