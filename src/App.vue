<template>
  <div>
    <div class="m-container">
      <!-- Thanh sidebar -->
      <the-sidebar></the-sidebar>
      <!-- Main -->
      <div class="m-content">
        <!-- Thanh navbar -->
        <the-navbar></the-navbar>
        <div class="m-main-content">
          <TheContent @showFormEmpoloyee="addOnclick()"></TheContent>
          <div class="m-content-body">
            <!-- Table -->
            <employee-list
              @editEmployee="editEmployee"
              :isLoadData="isLoadData"
              @reloadDone="loadDone"
            ></employee-list>
          </div>
        </div>
      </div>
      <EmployeeDetail
        v-if="isShowDetail"
        @closeForm="closePopup()"
        titlePopup="Thêm mới nhân viên"
        :employeeId="editedEmployeeId"
        @closeFormAndLoad="closeFormAndLoad()"
      ></EmployeeDetail>
    </div>
  </div>
</template>

<script>
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheContent from "./components/layout/m-content.vue";
import EmployeeList from "./employees/employeeList.vue";
import EmployeeDetail from "./employees/employeeDetail.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheNavbar,
    TheContent,
    EmployeeList,
    EmployeeDetail,
  },
  data() {
    return {
      isShowDetail: false,
      editedEmployeeId: null,
      isLoadData: false,
    };
  },
  methods: {
    //Author: NVQUY(15/12/2022)
    //Hiển thị form chi tiết nhân viên
    showDetail() {
      this.isShowDetail = true;
    },
    //Đóng form chi tiết nhân viên
    //Author: NVQUY(15/12/2022)
    closePopup() {
      this.isShowDetail = false;
    },
    //Author: NVQUY(15/12/2022)
    //edit employee
    editEmployee(employeeId) {
      this.showDetail();
      this.editedEmployeeId = employeeId;
    },
    //Author: NVQUY(15/12/2022)
    //Sự kiên kiện click vào nút thêm mới
    addOnclick() {
      this.showDetail();
      this.editedEmployeeId = null;
    },

    //Sự kiện phím tắt insert hiển thị form thêm mới nhân viên
    shortCutKey(e) {
      if (e.which == 45) {
        this.addOnclick();
        console.log("Insert");
      }
    },

    //Author: NVQUY(15/12/2022)
    //Đóng form chi tiết nhân viên và load lại dữ liệu
    closeFormAndLoad() {
      this.isShowDetail = false;
      this.isLoadData = true;
    },
    //Author: NVQUY(15/12/2022)
    //Trạng thái load hay không
    loadDone() {
      this.isLoadData = false;
    },
  },
  mounted() {
    document.addEventListener("keydown", this.shortCutKey);
  },
};
</script>

<style>
@import url(./css/main.css);
</style>
