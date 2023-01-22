<template lang="">
    <div>
    </div>
    <!-- Bảng chi tiết nhân viên -->
      <div class="m-body-table">
          <table class="m-table">
            <thead class="m-thead">
              <tr class="m-tr">
                <th class="m-th m-checkall">
                  <label class="m-table-checkbox">
                    <input type="checkbox" class="m-input-checkall" v-model="checkAll"/>
                    <span class="m-checkbox">
                      <span class="m-checkbox-inner">
                        <div class="m-icon-16 m-icon-checkbox-active"></div>
                      </span>
                    </span>
                  </label>
                </th>
                <th class="m-th" style="min-width: 140px">
                  <div class="m-th-title">{{fieldName.employeeCode}}</div>
                </th>
                <th class="m-th" style="min-width: 200px">
                  <div class="m-th-title">{{fieldName.employeeName}}</div>
                </th>
                <th class="m-th" style="min-width: 150px">
                  <div class="m-th-title">{{fieldName.gender}}</div>
                </th>
                <th class="m-th m-th-dob" style="min-width: 155px">
                  <div class="m-th-title">{{fieldName.dateOfBirth}}</div>
                </th>
                <th class="m-th" style="min-width: 150px">
                  <div class="m-th-title" :title="fieldName.identityNumberToolTip">
                    {{fieldName.identityNumber}}
                  </div>
                </th>
                <th class="m-th" style="min-width: 140px">
                  <div class="m-th-title">{{fieldName.employeePosition}}</div>
                </th>
                <th class="m-th" style="min-width: 250px">
                  <div class="m-th-title">{{fieldName.departmentName}}</div>
                </th>
                <th class="m-th" style="min-width: 150px">
                  <div class="m-th-title">{{fieldName.bankAccountNumber}}</div>
                </th>
                <th class="m-th" style="min-width: 250px">
                  <div class="m-th-title">{{fieldName.bankName}}</div>
                </th>
                <th class="m-th" style="min-width: 250px">
                  <div class="m-th-title" :title="fieldName.bankBranchNameToolTip">
                    {{fieldName.bankBranchName}}
                  </div>
                </th>
                <th class="m-th m-th-widget" style="min-width: 120px">
                  <div class="m-th-title">{{fieldName.function}}</div>
                </th>
              </tr>
            </thead>
            <tbody class="m-tbody">
              <!-- Nhập dữ liệu cho bảng -->
              <tr class="m-tr" :key="index" 
              v-for="(employee, index) in employees" :class="{'checked' : false}">
                <td class="m-td m-td-multi">
                  <label class="m-table-checkbox">
                    <input type="checkbox" class="m-input-checkbox" 
                    v-model="checked"
                    :value="employee.EmployeeID"/>
                    <span class="m-checkbox">
                      <span class="m-checkbox-inner">
                        <div class="m-icon-16 m-icon-checkbox-active"></div>
                      </span>
                    </span>
                  </label>
                </td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">
                  {{ employee.EmployeeCode }}
                </td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.EmployeeName }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ formatData.formatGender(employee.Gender) }}</td>
                <td class="m-td" style="text-align: center" @dblclick="dblEditEmployee(employee)">{{ formatData.formatDate(employee.DateOfBirth) }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.IdentityNumber }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.ContactTitle }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.DepartmentName }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.BankAccount }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.BankName }}</td>
                <td class="m-td" @dblclick="dblEditEmployee(employee)">{{ employee.BankBranchName }}</td>
                <td class="m-td m-td-widget">
                  <div class="m-dropdown">
                    <button class="m-dropdown-type-feature m-dropdown-button-text" @click="dblEditEmployee(employee)">
                      <div class="m-button-text">{{text.modify}}</div>
                    </button>
                    <button tabindex="-1" class="m-dropdown-type-feature m-dropdown-button-icon"
                     @click="toggleDropdown($event, employee.EmployeeID, employee.EmployeeCode)"
                     @blur="hiddenDropdown()"
                     >
                      <div class="m-button-text">
                        <div class="m-icon-16 m-icon-arrow-down-blue"></div>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <teleport to='body'>
             <!-- Dropdown menu xóa nhân viên -->
           <div class="m-dropdown-menu" v-if="isShowDropdown" :style="featurePosition" >
            <ul class="m-dropdown-menu-items">
                <li class="m-dropdown-item">
                    <a class="m-dropdown-item-link">{{text.duplicate}}</a>
                </li>
                <li class="m-dropdown-item" @click="confirmDelete">
                    <a class="m-dropdown-item-link">{{text.delete}}</a>
                </li>
                <li class="m-dropdown-item">
                    <a class="m-dropdown-item-link">{{text.stopUsing}}</a>
                </li>
            </ul>
          </div>
        </teleport>
     
      </div>
      <!--Component loading -->
      <TheLoading v-if="isShowLoading" ></TheLoading>
      <!-- Component dialog warning -->
      <dialog-warn :warnMessage="warnDelete"
       v-if="isShowDialogWarn"
       @closeDialog="cancalConfirm"
       @confirmDelete="onDeleteEmployee"
       ></dialog-warn>
       <!-- Component Dialog successs -->
       <dialog-success v-if="isShowDialogSuccess"
        :messageSuccess="alertSuccess"
        @closeDialogSuccess="closeDialogSuccess()"
        ></dialog-success>
  </div>
</template>
<script>
import TheLoading from "../components/base/TheLoading.vue";
import DialogWarn from "../components/base/TheDialogWar.vue";
import resourceVN from "../resources/resourceVN.js";
import DialogSuccess from "../components/base/TheDialogSuccess.vue";
import Common from "../js/commons.js";
export default {
  name: "TheTable",
  emits: ["closeForm", "closeFormAndLoad"],
  props: {
    isLoadData: Boolean,
  },
  components: {
    TheLoading,
    DialogWarn,
    DialogSuccess,
  },
  data() {
    return {
      employees: [], // Mảng danh sách nhân viên
      isShowLoading: false, // Lựa chọn ẩn hoặc hiện loading
      isShowDropdownPage: false, //Lựa chọn ẩn hoặc hiện dropdown chọn số bản ghi
      totalRecord: 0, //Tổng số bản ghi
      checked: [],
      warnDelete: "", // Alert cảnh báo xóa nhân viên
      alertSuccess: "", // Alert thành công
      isShowDialogWarn: false, // Lựa chọn ẩn hoặc hiện dialog cảnh báo
      isShowDialogSuccess: false, // Lựa chọn ẩn hoặc hiện dialog thành công
      fieldName: resourceVN.FieldName, //Resource tên cacs trường
      text: resourceVN.Text, //Resource các đoạn văn bản
      alertMessage: resourceVN.AlertMessage, //Nội dung dialog
      formatData: Common.FormatData,
      timeout: null,
      position: {
        //Xác định vị  trí của ô xóa nhân viên
        top: 0,
        left: 0,
      },
      deleteId: "", //Lấy ra ID cần xóa
      isShowDropdown: false, //Lựa chọn ẩn hoặc hiện dropdown xóa nhân viên
      filter: {
        employeeFilter: "", //Từ khóa tìm kiếm
        pageSize: 10, //Số lượng bản ghi trong 1 trang
        currentPage: 1, //Vị trí trang hiện tại
      },
      totalPage: 0, //Só bản ghi trong 1 trang
    };
  },
  created() {
    //Load dữ liệu
    this.loadData();
  },
  methods: {
    //blur ra ngoài ẩn đi dropdown xóa nhân viên
    hiddenDropdown() {
      setTimeout(() => (this.isShowDropdown = false), 200);
    },

    hiddenDropdownPaging() {
      setTimeout(() => (this.isShowDropdownPage = false), 200);
    },

    //Đóng form chi tiết nhân viên và load lại dữ liệu
    //Author: NVQUY(15/12/2022)
    closeDialogAndLoad() {
      this.loadData();
    },
    //Hiển thị dropdown xóa nhân viên
    //Author : NVQUY(18/12/2022)
    toggleDropdown(e, employeeId, employeeCode) {
      let assign = this;
      assign.deleteId = employeeId;
      assign.isShowDropdown = !assign.isShowDropdown;
      assign.position.top = e.clientY;
      assign.position.left = e.clientX;
      assign.warnDelete = `Bạn có thực sự muốn xóa nhân viên <${employeeCode}> không?`;
    },
    //Load dữ liệu
    //Author: NVQUY(15/12/2022)
    loadData() {
      // Gắn con trỏ this
      const me = this;
      //Hiển thị loading
      me.isShowLoading = true;
      //Gọi api
      me.$request
        .get(
          `http://localhost:5062/api/v1/Employees/filter?keyword=${me.filter.employeeFilter}&pageSize=${me.filter.pageSize}&pageNumber=${me.filter.currentPage}`
        )
        .then((res) => {
          //Chọn số bản ghi hiển thị trên bảng
          me.totalPage = res.data.TotalPage;

          //Thực hiện gán dữ liệu
          me.employees = res.data.Data;
          //Lấy và gán tổng số bản ghi
          me.totalRecord = res.data.TotalRecord;

          //Sau khi load dữ liệu xong thì tắt loading
          me.isShowLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //#region Các hàm liên quan đến sửa và xóa nhân viên
    //Double click hiển thị form sửa thông tin nhân viên
    //Author: NVQUY(17/12/2022)
    dblEditEmployee(employee) {
      try {
        //Gán giá trị cho form
        this.$emit("editEmployee", employee.EmployeeID);
      } catch (error) {
        console.log(error);
      }
    },
    //Hàm confirm xóa nhân viên
    confirmDelete() {
      this.isShowDialogWarn = true;
    },
    //Chọn nút hủy trên dialog confirm xóa nhân viên
    cancalConfirm() {
      this.isShowDialogWarn = false;
    },
    //Đóng dialog xóa thành công
    closeDialogSuccess() {
      this.isShowDialogSuccess = false;
    },
    //Hàm xử lý xóa thông tin nhân viên theo ID
    //Author: NVQUy(19/12/2022)
    async onDeleteEmployee() {
      try {
        let assign = this;
        await this.$request
          .delete(`http://localhost:5062/api/v1/Employees/${assign.deleteId}`)
          .then(() => {
            assign.isShowDialogWarn = false;
            assign.isShowDropdown = false;
            assign.loadData();
            assign.alertSuccess = assign.alertMessage.deleteEmployeeSuccess;
            assign.isShowDialogSuccess = true;
          });
      } catch (error) {
        console.log(error);
      }
    },
    //#endregion

    //#region Các hàm liên quan đến phân trang
    //Ẩn dropdown chọn số bản ghi
    hiddenDropdownPage() {
      this.isShowDropdownPage = false;
    },
    //Quay về trang trước
    previousPage() {
      console.log("Quay lại đang trước");
      if (this.filter.currentPage != 1) {
        this.filter.currentPage--;
        this.loadData();
      }
    },
    //Chọn trang tiếp theo
    nextPage() {
      if (this.filter.currentPage != this.totalPage) {
        this.filter.currentPage++;
        this.loadData();
      }
    },
    //Quay lại  trang đầu
    firstPage() {
      if (this.filter.currentPage != 1) {
        this.filter.currentPage = 1;
        this.loadData();
      }
    },
    //Chuyển tới trang cuối
    lastPage() {
      if (this.filter.currentPage != this.totalPage) {
        this.filter.currentPage = this.totalPage;
        this.loadData();
      }
    },
    //#endregion
  },
  computed: {
    //lấy vị trí của dropdown xóa thông tin một nhân viên
    featurePosition() {
      return {
        top: `${this.position.top}px`,
        left: `${this.position.left}px`,
      };
    },
    //Xử lý debound tìm kiếm nhân viên
    inputSearch: {
      get() {
        return this.filter.employeeFilter;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.filter.employeeFilter = val;
          this.loadData();
        }, 300);
      },
    },

    //Xử lý sự kiện checkbox
    checkAll: {
      get: function () {
        return this.employees
          ? this.checked.length == this.employees.length
          : false;
      },
      set: function (value) {
        let checked = [];
        if (value) {
          this.employees.forEach(function (employee) {
            checked.push(employee.EmployeeID);
          });
        }
        this.checked = checked;
      },
    },
  },
  watch: {
    isLoadData() {
      if (this.isLoadData) {
        this.loadData();
        this.$emit("reloadDone");
      }
    },
  },

  mounted() {
        let resizable = ColumnResizer.default

        new resizable(this.$refs.table, {
          liveDrag:true,
          draggingClass:"rangeDrag",
          gripInnerHtml:"<div class='rangeGrip'></div>",
          minWidth:8
        })
      }
  
};
</script>

