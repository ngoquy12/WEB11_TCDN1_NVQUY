<template >
  <div>
    <div class="m-popup">
      <div class="m-popup-con">
        <div class="m-popup-background"></div>
        <div class="m-popup-drag">
          <div class="m-popup m-popup-content">
            <div class="m-popup-header">
              <div class="m-popup-title">
                <div class="m-title">{{ titlePopup }}</div>
                <label class="m-popup-checkbox">
                  <input type="checkbox" class="m-input-checkbox" />
                  <span class="m-checkbox">
                    <span class="m-checkbox-inner">
                      <div class="m-icon-16 m-icon-checkbox-active"></div>
                    </span>
                  </span>
                  <span class="m-input-checkbox-label">{{
                    text.isCustomer
                  }}</span>
                </label>
                <label class="m-popup-checkbox">
                  <input type="checkbox" class="m-input-checkbox" />
                  <span class="m-checkbox">
                    <span class="m-checkbox-inner">
                      <div class="m-icon-16 m-icon-checkbox-active"></div>
                    </span>
                  </span>
                  <span class="m-input-checkbox-label">{{
                    text.isProvider
                  }}</span>
                </label>
              </div>
              <div class="m-popup-close">
                <div
                  class="m-icon-24 m-icon-help"
                  style="margin-right: 6px"
                  :title="text.helpToolTip"
                ></div>
                <div
                  class="m-icon-24 m-icon-close"
                  :title="text.escToolTip"
                  @click="hiddenFormPopup()"
                ></div>
              </div>
            </div>
            <div class="m-popup--content">
              <div>
                <div class="m-content-2-col">
                  <div class="m-col-1 m-flex-wrap">
                    <div class="m-input-40 m-pr-6 m-pb-24">
                      <div class="m-flex">
                        <title-lable :titleLable="fieldName.Code" />
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        :class="{ 'm-input-error': isEmployeeCodeError }"
                        tabindex="1"
                        @blur="employeeCodeBlured"
                        v-model="employee.EmployeeCode"
                        ref="employeeCode"
                      />
                      <div
                        class="m-input-message-error"
                        v-if="isEmployeeCodeError"
                      >
                        {{ errorMessage.emptyEmployeeCode }}
                      </div>
                    </div>
                    <div class="m-input-60 m-pb-24">
                      <div class="m-flex">
                        <title-lable :titleLable="fieldName.Name" />
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        @blur="employeeNameBlured"
                        :class="{ 'm-input-error': isEmployeeNameErorr }"
                        v-model="employee.EmployeeName"
                        tabindex="2"
                      />
                      <div
                        class="m-input-message-error"
                        v-if="isEmployeeNameErorr"
                      >
                        {{ errorMessage.emptyEmployeeName }}
                      </div>
                    </div>
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex">
                        <title-lable :titleLable="fieldName.department" />
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <TheCombobox
                        url="http://localhost:5062/api/v1/Departments"
                        propValue="DepartmentID"
                        propText="DepartmentName"
                        @getValue="getDepartmentValue"
                        :isError="isDepartmentError"
                        @errorMesaage="isDepartmentError=true"
                        
                        :tabIndex="7"
                      ></TheCombobox>
                      <div
                        class="m-input-message-error"
                        v-if="isDepartmentError"
                      >
                        {{ errorMessage.emptyDepartmentName }}
                      </div>
                    </div>
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.employeePosition" />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        tabindex="10"
                        v-model="employee.ContactTitle"
                      />
                    </div>
                  </div>
                  <div class="m-col-2 m-flex-wrap">
                    <div class="m-input-40 m-pr-6 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.dateOfBirth" />
                      </div>
                      <input
                        type="date"
                        class="m-input"
                        v-model="employee.DateOfBirth"
                        tabindex="3"
                      />
                    </div>
                    <div class="m-input-60 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.gender" />
                      </div>
                      <div class="m-radio-group">
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            @change="(e)=>(employee.Gender = parseInt(e.target.value))"
                            checked
                            value="0"
                            v-model="employee.Gender"
                            tabindex="4"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">{{ text.male }}</span>
                        </label>
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            @change="(e)=>(employee.Gender = parseInt(e.target.value))"
                            value="1"
                            v-model="employee.Gender"
                            tabindex="5"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">{{ text.female }}</span>
                        </label>
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            @change="(e)=>(employee.Gender = parseInt(e.target.value))"
                            value="2"
                            v-model="employee.Gender"
                            tabindex="6"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">{{ text.other }}</span>
                        </label>
                      </div>
                    </div>
                    <div class="m-input-60 m-pr-6 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable
                          :titleLable="fieldName.identityNumber"
                          :title="fieldName.identityNumberToolTip"
                        />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        tabindex="8"
                        v-model="employee.IdentityNumber"
                      />
                    </div>
                    <div class="m-input-40 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.identityDate" />
                      </div>
                      <input
                        type="date"
                        class="m-input"
                        tabindex="9"
                        v-model="employee.IdentityIssueDate"
                      />
                    </div>
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.identityPlace" />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        tabindex="11"
                        v-model="employee.IdentityIssuePlace"
                      />
                    </div>
                  </div>
                </div>
                <div class="m-content-1-col m-pb-24">
                  <div class="m-input-100">
                    <div class="m-flex-wrap">
                      <title-lable :titleLable="fieldName.address" />
                    </div>
                    <input
                      type="text"
                      class="m-input"
                      tabindex="12"
                      v-model="employee.Address"
                    />
                  </div>
                </div>
                <div class="m-content-4-col">
                  <div class="m-col-1 m-pr-6">
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable
                          :titleLable="fieldName.telephoneNumber"
                          :title="fieldName.telephoneNumberToolTip"
                        />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        tabindex="13"
                        v-model="employee.ContactMobile"
                      />
                    </div>
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable
                          :titleLable="fieldName.bankAccountNumber"
                        />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        v-model="employee.BankAccount"
                        tabindex="16"
                      />
                    </div>
                  </div>
                  <div class="m-col-2 m-pr-6">
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable
                          :titleLable="fieldName.phoneNumber"
                          :title="fieldName.phoneNumberToolTip"
                        />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        v-model="employee.ContactFax"
                        tabindex="14"
                      />
                    </div>
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.bankName" />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        v-model="employee.BankName"
                        tabindex="17"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-pr-6">
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.email" />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        @blur="emailBlured"
                        :class="{ 'm-input-error': isEmailError }"
                        v-model="employee.Email"
                        tabindex="15"
                      />
                      <div class="m-input-message-error" v-if="isEmailError">
                        {{ errorMessage.invalidEmail }}
                      </div>
                    </div>
                    <div class="m-input-100 m-pb-24">
                      <div class="m-flex-wrap">
                        <title-lable :titleLable="fieldName.branch" />
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        v-model="employee.BankBranchName"
                        tabindex="18"
                      />
                    </div>
                  </div>
                  <div class="m-col-4"></div>
                </div>
              </div>
              <div class="m-popup--footer">
                <div class="m-divine"></div>
                <div class="m-popup-btn">
                  <div class="m-popup-btn-left">
                    <the-button
                      :isSecondary="true"
                      :tabIndex="21"
                      @click="hiddenFormPopup"
                      @keydown.prevent="tabOder"
                      :buttonTitle="text.cancel"
                    ></the-button>
                  </div>
                  <div class="m-popup-btn-right">
                    <the-button
                      :tabIndex="20"
                      @click="btnSaveOnclick"
                      :buttonTitle="text.store"
                      :isSecondary="true"
                      v-bind:style="{ marginRight: 8 + 'px' }"
                    ></the-button>
                    <the-button
                      :tabIndex="19"
                      @click="saveAndAdd()"
                      :buttonTitle="text.storeAdd"
                    ></the-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog wraning -->
    <the-dialog
      v-if="isShowDialog"
      :contentDialog="erorrDialog"
      @closeDialog="onCloseDialog()"
    ></the-dialog>
    <!-- Dialog question -->
    <TheDialogQuestion v-if="isShowDialogQuestion"></TheDialogQuestion>
  </div>
</template>
  <script>
import TitleLable from "../../src/components/base/TheLable.vue";
import TheButton from "../../src/components/base/TheButton.vue";
import TheDialog from "../components/base/TheDialog.vue";
import resourceVN from "../../src/resources/resourceVN.js";
import TheCombobox from "../components/base/TheCombobox.vue";
import Common from "../js/commons.js";
import TheDialogQuestion from "../components/base/TheDialogQuestion.vue"
export default {
  name: "EmployeeDetail",
  components: {
    TitleLable,
    TheButton,
    TheDialog,
    TheCombobox,
    TheDialogQuestion
  },
  props: ["titlePopup", "employeeId"],
  emits: ["closeForm"],
  data() {
    return {
      titleLable: "", // Ti??u ????? c???a form
      fieldName: resourceVN.FieldName, //T??n c??c tr?????ng c?? trong form
      errorMessage: resourceVN.ErrorMessage, // T??n resource c???nh b??o
      text: resourceVN.Text, //T??n resource c??c ??o???n text
      buttonTitle: "", // T??n button,
      common: Common.FormatData,
      isDepartmentError: false,
      isEmployeeCodeError: false,
      isEmployeeNameErorr: false,
      isEmailError: false,
      employee: {},
      employeeChange : {},
      isShowDialog: false, // L???a ch???n c?? show dialog kh??ng
      erorrDialog: "", // L???i c?? tr??n dialog
      isShowDialogQuestion : false
    };
  },
  methods: {

    /**
     * x??? l?? ph??m t???t
     * @param {*} e
     * Author: NVQUy(16/01/2023)
     */
    shortcutKey(e) {
      let me = this;
      if (e.which == 27) {
        me.hiddenFormPopup();
      }
      if (e.ctrlKey && e.key == "F8") {
        me.btnSaveOnclick();
      }
    },

    /**
     * ???n form chi ti???t nh??n vi??n
     * Author: NVQUY(15/12/2022)
     */
    hiddenFormPopup() {
        this.$emit("closeForm");
    },
    //???n form chi ti???t v?? load l???i d??? li???u
    //Author: NVQUY(15/12/2022)
    hiddenAndLoad() {
      this.$emit("closeFormAndLoad");
    },
    //#region C??c h??m li??n quan ?????n c???t v?? th??m d??? li???u
    //Th??m m???i nh??n vi??n
    async btnSaveOnclick() {
      try {
        //Validate d??? li???u
        let isValid = this.validateData();
        if (isValid) {
          //G???i api th???c hi???n c???t d??? li???u
          //N???u l?? th??m m???i nh??n vi??n
          //Author : NVQUY(18/12/2022)
          if (this.valueIsEmpty(this.employeeId)) {
            this.$request
              .post("http://localhost:5062/api/v1/Employees", this.employee)
              .then((res) => {
                //???n form th??m m???i
                this.hiddenAndLoad();
                console.log(res);
              })
              .catch((error) => {
                //Hi???n th??? l???i l???y t??? serve
                this.isShowDialog = true;
                this.erorrDialog = error.response.data.UserMsg;
              });
          }
          //N???u l?? s???a nh??n vi??n
          else {
            this.$request
              .put(
                `http://localhost:5062/api/v1/Employees/${this.employeeId}`,
                this.employee
              )
              .then(() => {
                //???n form th??m m???i v?? load l???i d??? li???u
                this.$emit("closeFormAndLoad");
              })
              .catch((error) => {
                //Hi???n th??? l???i l???y t??? serve
                this.isShowDialog = true;
                this.erorrDialog = error.response.data.UserMsg;
              });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    //C???t v?? th??m
    async saveAndAdd() {
      try {
        let isValid = this.validateData();
        if (isValid) {
          //G???i api th???c hi???n c???t d??? li???u
          //N???u l?? th??m m???i nh??n vi??n
          if (this.valueIsEmpty(this.employeeId)) {
            await this.$request
              .post("http://localhost:5062/api/v1/Employees", this.employee)
              .then((res) => {
                // //Reset l???i data
                this.employee = {};
                //G???i m?? m???i
                this.$request
                  .get("http://localhost:5062/api/v1/Employees/EmployeeNewCode")
                  .then((res) => {
                    this.employee.EmployeeCode = res.data;
                    //focus v??o ?? nh???p li???u ?????u ti??n
                    this.$nextTick(function () {
                      this.$refs.employeeCode.focus();
                    });
                  });
                console.log(res);
              })
              .catch((error) => {
                //Hi???n th??? l???i l???y t??? serve
                this.isShowDialog = true;
                this.erorrDialog = error.response.data.UserMsg;
              });
          }
          //N???u l?? s???a nh??n vi??n
          else {
            this.$request
              .put(
                `http://localhost:5062/api/v1/Employees/${this.employeeId}`,
                this.employee
              )
              .then((res) => {
                //???n form chi ti???t
                this.hiddenAndLoad();
                console.log(res);
              })
              .catch((error) => {
                this.isShowDialog = true;
                this.erorrDialog = error.response.data.UserMsg;
              });
          }
        }
      } catch (error) {
        //Hi???n th??? l???i l???y t??? serve
        this.isShowDialog = true;
        this.erorrDialog = error.response.data.UserMsg;
      }
    },
    //L???y ra gi?? tr??? t??? combobox ph??ng ban
    getDepartmentValue(value) {
      this.employee.DepartmentID = value;
      this.isDepartmentError = false;
    },
    //#endregion

    //#region C??c h??m li??n quan ?????n Validate d??? li???u
    //Validate d??? li???u
    //Author: NVQUY(18/12/2022)
    validateData() {
      try {
        let isError = [];
        //N???u m?? nh??n vi??n ????? tr???ng
        if (this.valueIsEmpty(this.employee.EmployeeCode)) {
          this.isEmployeeCodeError = true;
          isError.push(this.errorMessage.emptyEmployeeCode);
        }
        //N???u t??n nh??n vi??n ????? tr???ng
        if (this.valueIsEmpty(this.employee.EmployeeName)) {
          this.isEmployeeNameErorr = true;
          isError.push(this.errorMessage.emptyEmployeeName);
        }
        //N???u th??ng tin ph??ng ban ????? tr???ng
        if (this.valueIsEmpty(this.employee.DepartmentID)) {
          this.isDepartmentError = true;
          isError.push(this.errorMessage.emptyDepartmentName);
        }
        //N???u email kh??ng ????ng ?????nh d???ng
        if (this.employee.Email) {
          if (!this.common.validateEmail(this.employee.Email)) {
            this.isEmailError = true;
            isError.push(this.errorMessage.invalidEmail);
          }
        }
        //Ki???m tra s??? l?????ng l???i v?? tr??? v??? k???t qu???
        if (isError.length > 0) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //H??m ki???m tra t???t c??? gi?? tr??? b???t bu???c nh???p
    valueIsEmpty(value) {
      if (value == "" || value == null || value == undefined) {
        return true;
      }
      return false;
    },
    //#endregion
    //????ng dialog
    onCloseDialog() {
      this.isShowDialog = false;
    },
    //TabOder
    tabOder() {
      this.$refs.employeeCode.focus();
    },

    // Hi???n th??? l???i khi ch??a nh???p gi?? tr??? v?? blur ra ngo??i ?? input
    employeeCodeBlured() {
      try {
        if (this.valueIsEmpty(this.employee.EmployeeCode)) {
          this.isEmployeeCodeError = true;
        } else {
          this.isEmployeeCodeError = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Hi???n th??? l???i khi ch??a nh???p gi?? tr??? v?? blur ra ngo??i ?? input
    employeeNameBlured() {
      try {
        if (this.valueIsEmpty(this.employee.EmployeeName)) {
          this.isEmployeeNameErorr = true;
        } else {
          this.isEmployeeNameErorr = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    //L???y d??? li???u t??? server
    if (!this.valueIsEmpty(this.employeeId)) {
      this.$request
        .get(`http://localhost:5062/api/v1/Employees/${this.employeeId}`)
        .then((res) => {
          console.log(res);
          //Th???c hi???n g??n d??? li???u
          this.employee = res.data;
          res.data = this.employeeChange;
          this.employee.DateOfBirth = this.common.formatDateCreated(
            res.data.DateOfBirth
          );
          this.employee.IdentityIssueDate = this.common.formatDateCreated(
            res.data.IdentityIssueDate
          );
          this.employeeChange = {...this.employee}
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //L???y m?? nh??n vi??n m???i
      this.$request
        .get("http://localhost:5062/api/v1/Employees/EmployeeNewCode")
        .then((res) => {
          this.employee.EmployeeCode = res.data;
          //focus v??o ?? nh???p li???u ?????u ti??n
          this.$nextTick(function () {
            this.$refs.employeeCode.focus();
          }).catch((error) => {
            console.log(error);
          });
        });
    }
  },
  mounted() {
    let me = this;
    document.addEventListener("keydown", me.shortcutKey);
  },
};
</script>


