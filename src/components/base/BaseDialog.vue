<template lang="">
    <div>
        <div class="m-dialog-box">
            <div class="m-dialog-center">
                <div class="m-dialog-background"></div>
                <div class="m-dialog-drag">
                    <div class="m-dialog-message">
                        <div class="m-dialog-content">
                            <div class="m-content-icon">
                                <div v-if="dialog.type=='danger'" class="m-icon-48 m-icon-danger"></div>
                                <div v-if="dialog.type=='warning'" class="m-icon-48 m-icon-warning"></div>
                                <div v-if="dialog.type=='question'" class="m-icon-48 m-icon-question"></div>
                                <div v-if="dialog.type=='success'" class="m-icon-48 m-icon-suscess"></div>
                            </div>
                            <div class="m-content-message">{{dialog.contentDialog}}</div>
                        </div>
                        <div class="m-dialog-line"></div>
                        <div class="m-dialog-footer">
                            <base-button buttonTitle="Đóng" @click="hiddenDialog()" tabindex="1"></-button>
                        </div>
                    </div>
                </div>
            </div>+
        </div>
    </div>
</template>
<script>
import BaseButton from "../base/BaseButton.vue";
export default {
  name: "BaseDialog",
  components: {
    BaseButton,
  },
  props: ["dialog"],
  emits: ["confirmClick", "closeAll"],
  methods: {
    //Ẩn dialog
    confirmClick() {
      this.$emit("closeDialog");
    },
  },
};
</script>
<style lang="">
</style>