<template>
  <u-picker
    ref="uPickerRef"
    :show="show"
    :title="title"
    :columns="columns"
    @confirm="confirm"
    @cancel="cancel"
    @change="changeHandler"
  ></u-picker>
</template>

<script>
import { betweenArray } from "@/utils/utils";

export default {
  data () {
    return {
      show: false,
      columns: [
        ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      ],
      title:'周一 第1节',
      hourVal: ['周一',1,1],
    }
  },
  props:{
    isShow:{
      type: Boolean,
      default:false
    }
  },
  watch: {
    hourVal:{
      immediate: true,
      deep: true,
      handler(val){
        let titleVal = ''
        if(val[1] == val[2]){
          titleVal = val[0]+' 第'+val[1]+'节'
        }else{
          titleVal = val[0]+' 第'+val[1]+'-'+val[2]+'节'
        }
        this.title = titleVal
      }
    }
  },
  created () {
    console.log('hours',this.isShow)
    this.show = this.isShow
  },
  methods:{
    changeHandler(e){
      const { columnIndex, value, values, index, picker=this.$refs.uPickerRef } = e;
      console.log('e',value,e)
      if (columnIndex === 1) {
        const val = value[1]
        value[2] = val
        const colum = betweenArray(val,11)
        picker.setColumnValues(2,colum)
      }
      this.hourVal = value
    },
    confirm(e){
      this.show = false;
      this.$emit('change', this.hourVal)
    },
    cancel(){
      this.show = false;
      this.$emit('cancel')
    }
  }
}
// const show = ref(true);
// const loading = ref(false)
// const columns = ref([
//   ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
//   ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
//   ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
// ]);
// const hourVal = ref(['周一','1','1'])
// const defaultAddress = ref(['2','1','2'])
// const selected = ref(['0','0','0'])

// const changeHandler = (e) => {
//   const { columnIndex, value, values, index, picker=uPickerRef.value.picker } = e;
//   console.log('e',e,picker,uPickerRef.value.picker)
//   hourVal.value = value
//   loading.value = true
//   if (columnIndex === 1) {
//     const val = value[1]
//     // hourVal.value[2] = Number(hourVal.value[2]) + 1
//     const colum = betweenArray(val,11)
//     // values[2] = colum
//     uPickerRef.value.picker.setColumnValues(2,colum)
//     // columns.value = [...values]
//     // defaultAddress.value[2] = '0'
//   }
//   loading.value = false
// };
// const handlePicker = (val,a) => {
//   console.log('1221212',val,a)
// }
// const title = computed(()=>{
//   if(hourVal.value[1] == hourVal.value[2]){
//     return hourVal.value[0]+' 第'+hourVal.value[1]+'节'
//   }else{
//     return hourVal.value[0]+' 第'+hourVal.value[1]+'-'+hourVal.value[2]+'节'
//   }
// })

// const confirm = (e) => {
//   console.log("confirm", e);
//   show.value = false;
// };
// const open = (e) => {
//   show.value = true;
// };
// defineExpose({
//   open
// });
</script>

<style lang="scss"></style>
