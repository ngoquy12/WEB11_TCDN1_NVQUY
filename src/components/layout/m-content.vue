<template >
  <div class="m-content-header">
    <div class="m-header-title">Nhân viên</div>
    <the-button  @click="showFormEmpoloyee()" buttonTitle="Thêm mới nhân viên"></the-button>
  </div>
</template>
<script>
import TheButton from "../base/TheButton.vue"
export default {
  name: "TheContent",
  components : {
    TheButton
  },
  data(){
    return {
      isShowFormEmpoloyee : false,
      buttonTitle : ''
    }
  },
  //Hiển thị form chi tiết nhân viên
  //Author: NVQUY(15/12/2022)
  methods : {
    showFormEmpoloyee() {
        this.$emit("showFormEmpoloyee")
    },
  }
}
</script>
<style lang="">
</style>