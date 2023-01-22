import genderName from "../resources/resourceVN"


const FormatData = {
    /**
     * Format ngày tháng năm
     * @param {*} Ngày tháng lấy từ api  
     * @returns Ngày tháng năm đã được định dạng
     * Created by: NVQUY(15/12/2022)
     */
    formatDate(date) {
        try {
            if (date) {
                //Chuyển sang dữ liệu date
                date = new Date(date);
                // Lấy ngày
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                // Lấy tháng
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                // Lấy năm
                let year = date.getFullYear();
                return date = `${day}/${month}/${year}`;
            }
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Format giới tính
     * @param {*} Mã giới tính  
     * @returns Tên giới tính
     * Created by: NVQUY(15/12/2022)
     */
    formatGender(gender) {
        try {
            switch (gender) {
                case 0:
                    return genderName.GenderName.male;
                case 1:
                    return genderName.GenderName.female;
                case 2:
                    return genderName.GenderName.other;
                default:
                    return "";
            }
        } catch (error) {
            console.log(error);
        }
    },
    
    /**
     * @param {email} Email nhập vào từ người dùng
     * @returns True: Néu email đúng định dạng, False: Nếu email không đúng định dạng
     */
    validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      //Hàm fomat ngày/tháng/năm khi Created
    //Author: NVQUY(15/12/2022)
    formatDateCreated(date) {
        try {
          if (date) {
            //Chuyển sang dữ liệu date
            date = new Date(date);
            // Lấy ngày
            let day = date.getDate();
            day = day < 10 ? `0${day}` : day;
            // Lấy tháng
            let month = date.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            // Lấy năm
            let year = date.getFullYear();
            //Trả về định dạng thời gian
            return `${year}-${month}-${day}`;
          }
        } catch (error) {
          console.log(error);
        }
      },
}

const Common = {
    FormatData,
}

export default Common;