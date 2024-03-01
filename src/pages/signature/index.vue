<template>
    <div class="page-content">
        <div class="form">
            <div class="form-content">
                <canvas ref="canvas" class="form-content__canvas" canvas-id="canvas_sign" @touchstart="touchstart" @touchmove="touchmove"
                    @touchend="touchend" disable-scroll="true"/>
            </div>
            <div class="form-footer clearfix">
                <div class="form-btn">
                  <button class="form-footer__reset" @click="autographClick(1)">清除重写</button>
                  <button class="form-footer__save" @click="autographClick(2)">提交签字</button>
                  <!-- <button class="form-footer__preview" @click="autographClick(3)">预览</button> -->
                </div>
                <div class="form-toast">请在上方空白处书写您的签名</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { setStudentName } from '@/api';
import { onMounted, ref } from 'vue';

const Id = ref()
const canvas = ref()
let isAction = null
onLoad((option:any)=>{
  isAction = option.action
  Id.value = option.Id
})

const canvasCtx = ref({})
const points = ref([])
const hasSign = ref(false)
const isInit = ref(false)

onMounted(() => {
    canvasCtx.value = uni.createCanvasContext('canvas_sign', this)
    canvasCtx.value.lineWidth = 6
    canvasCtx.value.lineCap = 'round'
    canvasCtx.value.lineJoin = 'round'
})

const touchstart = (e) => {
    if (!isInit.value) {
        isInit.value = true
        autographClick(1);
    }
    let startX = e.changedTouches[0].x
    let startY = e.changedTouches[0].y
    let startPoint = {
        X: startX,
        Y: startY
    }
    points.value.push(startPoint)

    //每次触摸开始，开启新的路径
    canvasCtx.value.beginPath()
}

const touchmove = (e) => {
    let moveX = e.changedTouches[0].x
    let moveY = e.changedTouches[0].y
    let movePoint = {
        X: moveX,
        Y: moveY
    }
    points.value.push(movePoint)
    //存点
    let len = points.value.length
    if (len >= 2) {
        draw()
        //绘制路径
    }
}

const touchend = () => {
    points.value = []
    canvasCtx.value.draw(true)
}

const draw = () => {
    let point1 = points.value[0]
    let point2 = points.value[1]
    points.value.shift()
    canvasCtx.value.moveTo(point1.X, point1.Y)
    canvasCtx.value.lineTo(point2.X, point2.Y)
    canvasCtx.value.stroke()
    canvasCtx.value.draw(true)
    hasSign.value = true
}

const autographClick = (type) => {
    if (type === 1) {
        //清空画布
        hasSign.value = false
        uni.getSystemInfo({
            success: function (res) {
                let canvas = uni.createSelectorQuery().select('.form-content__canvas')
                canvas.boundingClientRect().exec(function (data) {
                    let canvasw = Math.ceil(data[0].width)
                    let canvash = Math.ceil(data[0].height)
                    canvasCtx.value.fillStyle = '#fff'
                    canvasCtx.value.fillRect(0, 0, canvasw, canvash)
                    canvasCtx.value.draw(true)
                })
            }
        })
    } else {
        if (!hasSign.value) {
            uni.showToast({
                title: '签名不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }
        uni.getSystemInfo({
            success: function (res) {
                let canvas = uni.createSelectorQuery().select('.form-content__canvas')
                canvas.boundingClientRect().exec(function (data) {
                    let canvasw = Math.ceil(data[0].width)
                    let canvash = Math.ceil(data[0].height)
                    uni.canvasToTempFilePath({
                        destWidth: canvasw,
                        destHeight: canvash,
                        fileType: 'png',
                        canvasId: 'canvas_sign',
                        success: function (res) {
                          uni.getFileSystemManager().readFile({
                            filePath: res.tempFilePath,  //图片路径
                            encoding: 'base64', //编码格式
                            success: async (res) => { //成功的回调
                              console.log('data:image/png;base64,' + res.data)
                              const studentName = 'data:image/png;base64,' + res.data
                              if(!isAction){
                                await setStudentName({
                                  Id:Id.value,
                                  studentName
                                })
                              }
                              uni.navigateBack({
                                delta: 1, // 返回的页面数，默认为1，表示返回到上一个页面
                                success: () => {
                                  uni.$emit('getBaseUrl',{
                                    current:studentName
                                  })
                                }
                              });
                            }
                          })
                        },
                        fail: (err) => {
                            console.log('图片导出失败：', err)
                        }
                    })
                })
            }
        })
    }
}

</script>

<style lang="scss">
@function tovmin($rpx) {
  @return #{$rpx * 100 / 750}vmin;
}
.page-content {
  width: 100vw;
  height: 100vh;
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .form-content {
      width: 100%;
      height: 100%;
      &__canvas {
        width: 100vw;
        height: calc(100vh - tovmin(20) - tovmin(120) - constant(safe-area-inset-bottom));
        height: calc(100vh - tovmin(20) - tovmin(120) - env(safe-area-inset-bottom));
      }
    }
    .form-footer {
      box-sizing: border-box;
      padding: tovmin(20);
      border-top: 1rpx solid #d6d6d6;
      width: 100%;
      height: calc(tovmin(120) + constant(safe-area-inset-bottom));
      height: calc(tovmin(120) + env(safe-area-inset-bottom));
      background: #fff;
      button {
        display: inline-block;
        border-radius: 6rpx;
        width: 200rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 24rpx;
      }
      button::after {
        border: none;
      }
      &__reset {
        margin-right: 10rpx;
        border: 1rpx solid #fe6466;
        color: #fe6466;
      }
      &__save {
        background-color: #3d94ef;
        color: #fff;
      }
      &__preview {
        background-color: #3d94ef;
        color: #fff;
      }
      .form-btn {
        float: right;
      }
      .form-toast {
        line-height: 50rpx;
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}</style>
