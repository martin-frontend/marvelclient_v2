import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogDirectlyEasybetsetProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyEasybetsetProxy";
    isOpenWalletMenu: boolean = false;
    playerInfo = {
        user_id: 0,
        nick_name: "",
        vendor_config: {
            market_type_config: <any>{},
        },
    };
    isShowGropSet: boolean = true; //是否将消息转为 消息组， 整个组的 投注设置
    private compareData = <any>{}; //比较的数据
    formData = {
        user_id: core.user_id,
        direct_user_id: 0,
        coin_name_unique: "",
        market_type_config: <any>[],
    };

    pageData = {
        loading: false,
        bShow: false,
        bHidden:false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });

        Object.assign(this.formData, {
            direct_user_id: 0,
            coin_name_unique: "",
            market_type_config: <any>[],
        });
    }

    type_1 = ["ASIAN_HANDICAP", "ASIAN_OVER_UNDER", "TOTAL_GOALS"];
    type_2 = ["ASIAN_HANDICAP_HALF_TIME", "ASIAN_OVER_UNDER_HALF_TIME", "TOTAL_GOALS_HALF_TIME"];
    type_3 = ["MATCH_ODDS", "MATCH_ODDS_HALF_TIME"];
    type_4 = ["ODD_OR_EVEN_HALF_TIME", "ODD_OR_EVEN"];
    type_5 = [];

    setTypeSingleData(arr: any, typestr: any, mainArr: any) {
        if (arr.length > 0) {
            const obj_1 = JSON.parse(JSON.stringify(arr[0]));
            const str = "easybet投注类型" + typestr;
            obj_1.market_type_text = LangUtil(str);
            obj_1.srcArr = JSON.parse(JSON.stringify(arr));
            mainArr.push(obj_1);
        }
    }

    setCurFormMerketData(inputKey: any = null) {
        if (!inputKey) inputKey = this.formData.coin_name_unique;

        //分开的盘口设置
        if (!this.isShowGropSet) {
            this.formData.market_type_config = JSON.parse(JSON.stringify(this.playerInfo.vendor_config.market_type_config[inputKey]));
            this.compareData = JSON.parse(JSON.stringify(this.playerInfo.vendor_config.market_type_config[inputKey])); //给比较的对象 赋值， 主要用于检测 是否有修改过
            return;
        }
        //组合一起的盘口设置
        const srcData = this.playerInfo.vendor_config.market_type_config[inputKey];
        const destArr = <any>[];
        const type_1_arr = [];
        const type_2_arr = [];
        const type_3_arr = [];
        const type_4_arr = [];
        const type_5_arr = [];

        for (let index = 0; index < srcData.length; index++) {
            const element = srcData[index];
            if (this.type_1.indexOf(element.market_type) != -1) {
                type_1_arr.push(element);
            } else if (this.type_2.indexOf(element.market_type) != -1) {
                type_2_arr.push(element);
            } else if (this.type_3.indexOf(element.market_type) != -1) {
                type_3_arr.push(element);
            } else if (this.type_4.indexOf(element.market_type) != -1) {
                type_4_arr.push(element);
            } else {
                type_5_arr.push(element);
            }
        }
        this.setTypeSingleData(type_1_arr, "1", destArr);
        this.setTypeSingleData(type_2_arr, "2", destArr);
        this.setTypeSingleData(type_3_arr, "3", destArr);
        this.setTypeSingleData(type_4_arr, "4", destArr);
        this.setTypeSingleData(type_5_arr, "5", destArr);

        this.formData.market_type_config = destArr;
        this.compareData = JSON.parse(JSON.stringify(destArr)); //给比较的对象 赋值， 主要用于检测 是否有修改过
    }
    setDataGrop() {}
    setData(data: any) {
        this.pageData.loading = false;

        Object.assign(this.playerInfo, data);
        //设置预设金币种类的值
        const keys = Object.keys(this.playerInfo.vendor_config.market_type_config);

        if (!this.formData.coin_name_unique || keys.indexOf(this.formData.coin_name_unique) == -1) {
            this.formData.coin_name_unique = keys[0];
        }
        //this.formData.coin_name_unique = keys[0];
        //Object.assign(this.formData.market_type_config, this.playerInfo.vendor_config.market_type_config);
        //this.formData.market_type_config = JSON.parse(JSON.stringify(this.playerInfo.vendor_config.market_type_config))
        this.setCurFormMerketData(); //设置当前需要显示的数组的值
    }

    //挑选出被修改过的值
    sclectChangeVaule(inputArr: any, isNeedReturn: boolean = false) {
        const curList = this.compareData;
        const destArr = inputArr;
        if (!curList || !destArr) {
            return null;
        }
        const newArr = <any>[];

        //let field_src, field_dest = null;
        //console.log("------....curList" , curList);
        for (let index = 0; index < curList.length; index++) {
            const element = curList[index];
            const destObj = destArr[index];

            if (
                destObj.setting.single_max_bet == element.setting.single_max_bet &&
                destObj.setting.single_field_max_bet == element.setting.single_field_max_bet
            ) {
                continue;
            }
            if (!isNeedReturn) {
                return true;
            }
            const newObj = {
                market_type: element.market_type,
                setting: <any>{},
            };
            //let isAdd = false;

            if (!destObj.setting.single_field_max_bet) {
                newObj.setting.single_field_max_bet = "-";
            } else {
                newObj.setting.single_field_max_bet = parseFloat(destObj.setting.single_field_max_bet);
            }
            if (!destObj.setting.single_max_bet) {
                newObj.setting.single_max_bet = "-";
            } else {
                newObj.setting.single_max_bet = parseFloat(destObj.setting.single_max_bet);
            }

            // if (element.setting.single_field_max_bet != destObj.setting.single_field_max_bet) {
            //     //如果两个值不想等  如果输入的需要传的为空  则直接发送空
            //     if (!destObj.setting.single_field_max_bet) {
            //         newObj.setting.single_field_max_bet = "-";
            //         isAdd = true;
            //     }
            //     else {
            //         //如果 传入值 为空， 输入值 不为空 则 需要将输入值 转为数字 写入
            //         if (!element.setting.single_field_max_bet) {
            //             newObj.setting.single_field_max_bet = parseFloat(destObj.setting.single_field_max_bet);
            //             isAdd = true;
            //         }
            //         else {
            //             field_src = parseFloat(element.setting.single_field_max_bet);
            //             field_dest = parseFloat(destObj.setting.single_field_max_bet);
            //             // if (field_dest != field_src) {
            //             //     newObj.setting.single_field_max_bet = field_dest;
            //             //     isAdd = true;
            //             // }
            //             newObj.setting.single_field_max_bet = field_dest;
            //         }
            //     }
            // }

            // if (element.setting.single_max_bet != destObj.setting.single_max_bet) {
            //     //如果两个值不想等  如果输入的需要传的为空  则直接发送空
            //     if (!destObj.setting.single_max_bet) {
            //         newObj.setting.single_max_bet = "-";
            //         isAdd = true;
            //     }
            //     else {
            //         //如果 传入值 为空， 输入值 不为空 则 需要将输入值 转为数字 写入
            //         if (!element.setting.single_max_bet) {
            //             newObj.setting.single_max_bet = parseFloat(destObj.setting.single_max_bet);
            //             isAdd = true;
            //         }
            //         else {
            //             field_src = parseFloat(element.setting.single_max_bet);
            //             field_dest = parseFloat(destObj.setting.single_max_bet);
            //             // if (field_dest != field_src) {
            //             //     newObj.setting.single_max_bet = field_dest;
            //             //     isAdd = true;
            //             // }
            //             newObj.setting.single_max_bet = field_dest;
            //         }
            //     }
            // }
            if (!this.isShowGropSet) {
                newArr.push(newObj);
            } else {
                if (element.srcArr && element.srcArr.length > 0) {
                    for (let index = 0; index < element.srcArr.length; index++) {
                        const obj = element.srcArr[index];
                        obj.setting.single_field_max_bet = newObj.setting.single_field_max_bet ? newObj.setting.single_field_max_bet : "-";
                        obj.setting.single_max_bet = newObj.setting.single_max_bet ? newObj.setting.single_max_bet : "-";
                        newArr.push(obj);
                    }
                }
            }
        }
        if (!isNeedReturn) {
            return false;
        }
        return newArr;
    }
    //查询 当前直属用户的 信息
    api_user_var_fetch_direct_user_info() {
        this.pageData.loading = true;
        const data = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_fetch_direct_user_info, objectRemoveNull(data));
    }

    agent_direct_user_update(formdata: any) {
        this.pageData.loading = true;
        const sendData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
            coin_name_unique: this.formData.coin_name_unique,
            market_type_config: JSON.stringify(formdata),
            //account_status:this.playerInfo.status,
        };
        //console.log("发送的值", sendData);
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(sendData));
    }
    agent_direct_user_update_callback(msg: any = null) {
        const str = LangUtil("修改成功！");
        PanelUtil.message_alert({
            message: str,
            okFun: () => {
                //this.pageData.bShow = false;
            },
        });
    }
}
