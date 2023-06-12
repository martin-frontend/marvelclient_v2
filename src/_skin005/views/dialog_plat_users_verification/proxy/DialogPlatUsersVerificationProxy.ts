import MultDialogManager from "@/_skin005/core/MultDialogManager";
import { objectRemoveNull } from "@/core/global/Functions";

// const data1 = {
//     id: 3,
//     plat_id: 30023,
//     user_id: 30000757,
//     data_belong: "1",
//     country: 7,
//     city: "XXXOOO",
//     verification_name: "testtesttest",
//     area_code: "45",
//     mobile: "6338274632",
//     email: "test123@com.c",
//     address: "",
//     remark: "111111111111111",
//     status: 2,
//     created_by: "system",
//     created_at: "2023-06-01 02:58:50",
//     updated_by: "system",
//     updated_at: "2023-06-01 03:05:57",
// };
export default class DialogPlatUsersVerificationProxy extends puremvc.Proxy {
    static NAME = "DialogPlatUsersVerificationProxy";

    pageData = {
        loading: false,
        bHidden: false, //暂时隐藏
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: <any>{ status: 0 }, // status 0-未认证|1-认证通过|2-认证失败|3-审核中
        form: <any>{
            country: "",
            city: "",
            verification_name: "",
            area_code: "",
            mobile: "",
            email: "",
            address: "",
            province: "",
            post_code: "",
        },
        countryList: <any>[{ name: "test", id: 7 }],
        cityList: <any>[],
        areaCodeList: <any>[],
    };

    resetForm(resetCountry: boolean = true) {
        Object.assign(this.pageData.form, {
            city: "",
            verification_name: "",
            area_code: "",
            mobile: "",
            email: "",
            address: "",
            province: "",
            post_code: "",
        });
        if (resetCountry) {
            Object.assign(this.pageData.form, {
                country: "",
            });
        }
    }

    setData(data: any) {
        this.pageData.loading = false;
        if (Object.keys(data).length > 0) {
            Object.assign(this.pageData.list, data);
            Object.assign(this.pageData.form, {
                country: data.country?.toString() ?? "",
                city: data.city?.toString() ?? "",
                verification_name: data.verification_name ?? "",
                area_code: data.area_code ?? "",
                mobile: data.mobile ?? "",
                email: data.email ?? "",
                address: data.address ?? "",
                province: data.province ?? "",
                post_code: data.post_code ?? "",
            });
            // if (data.country) {
            //     this.api_public_city(data.country);
            // }
        }
    }
    setCountryList(data: any) {
        this.pageData.countryList = [];
        const keys = Object.keys(data);
        keys.forEach((key) => {
            this.pageData.countryList.push({
                id: key,
                name: data[key],
            });
        });
    }
    setCityList(data: any) {
        this.pageData.cityList = [];
        const keys = Object.keys(data);
        keys.forEach((key) => {
            this.pageData.cityList.push({
                id: key,
                name: data[key],
            });
        });
    }
    setAreaCodeList(data: any) {
        this.pageData.areaCodeList = [...data];
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    /**获取国家 */
    api_public_country() {
        this.sendNotification(net.HttpType.api_public_country);
    }
    /**获取城市 */
    api_public_city(country_id: any) {
        this.sendNotification(net.HttpType.api_public_city, { country_id });
    }
    /**获取手机区号 */
    // api_public_area_code() {
    //     this.sendNotification(net.HttpType.api_public_area_code);
    // }
    /**获取手机区号 */
    api_public_all_area_code() {
        this.sendNotification(net.HttpType.api_public_all_area_code);
    }
    /**--获取用户认证信息*/
    api_user_var_plat_users_verification_show() {
        this.sendNotification(net.HttpType.api_user_var_plat_users_verification_show, { user_id: core.user_id });
    }
    /**--储存用户认证信息*/
    api_user_var_plat_users_verification_save() {
        this.sendNotification(
            net.HttpType.api_user_var_plat_users_verification_save,
            objectRemoveNull({ user_id: core.user_id, ...this.pageData.form })
        );
    }
    /**--获取验证码*/
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
}
