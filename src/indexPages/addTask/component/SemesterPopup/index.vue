<template>
  <Popup ref="popupRef" @change="Change">
    <template #default>
      <div class="popup-box">
        <div class="popup-item">2023年上</div>
        <div class="popup-item">2023年下</div>
        <div class="popup-item">2022年上</div>
        <div class="popup-item">2022年上</div>
        <div class="popup-item">2022年上</div>
        <div class="popup-item">2022年上</div>
        <div class="popup-item">2022年上</div>
        <div class="popup-item">2022年上</div>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Popup from '@/components/Popup/index.vue'
const popupRef = ref()

const emit = defineEmits(['change'])
const Change = (val) => {
  emit('change',val)
  popupRef.value.cancel()
}
const open = () => {
  popupRef.value.open('bottom')
}
defineExpose({
  open
})
</script>

<style lang="scss">

</style>
