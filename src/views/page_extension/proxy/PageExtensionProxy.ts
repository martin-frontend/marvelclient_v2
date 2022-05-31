import {
    dateFormat,
    getTodayOffset,
    objectRemoveNull,
} from "@/core/global/Functions";
import Utils from "@/core/global/Utils";
import MyCanvas from "@/core/ui/MyCanvas";
import CopyUtil from "@/core/global/CopyUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

export default class PageExtensionProxy extends puremvc.Proxy {
    static NAME = "PageExtensionProxy";

    public onRegister(): void {
        this.pageData.loading = true;
    }

    /**我的推广 数据 */
    promotionData: any = {
        commission_awaiting_num: {},
        commission_received_num: {},
        date: "",
        directly_users: 0,
        group_users: 0,
        invite_user_id: 0,
        is_agent_bonus: 0,
        is_promotion_statistics_display: 0,
        plat_id: 0,
        promotion_floor_unit: "",
        promotion_status: 1,
        promotion_tutorial_url: "",
        promotion_url: "",
        today_directly_users: 0,
        today_group_users: 0,
        user_id: 0,
        total_water: 0,
        commission_info: {},
        commission_num: 0,
    };

    statistics_data: any = {
        total_commission: {},      // 预计今日总佣金
        total_water_summary: 0,    // 总业绩
        self_water_summary: 0,     // 自营业绩
        group_water_summary: 0,    // 团队业绩
        direct_water_summary: 0,   // 直属业绩
    };
    link: any = "";
    btnBind: any = false;
    qrCode: any = "";

    async setLink(url: string) {
        this.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.qrCode = imgBase64;
    }

    setData(data: any) {
        Object.assign(this.statistics_data, data.statistics_data);
        Object.assign(this.promotionData, data);
        this.btnBind = !data.invite_user_id;
        this.promotionData.commission_num = data.commission_info[2].commission_num.USDT
        this.getCurrentCoin();
    }

    /** 写入 返佣等级 */
    setCommissionCommissionnum(body: any) {
        const data: any = JSON.parse(JSON.stringify(body));
        this.tableData.myCommissionNum = data.my_commission_num;
        this.tableData.is_promotion_num_added = data.is_promotion_num_added
        this.tableData.promotionConfig = JSON.parse(JSON.stringify(data.promotion_config));
        this.tableData.defaultPromotionConfig = JSON.parse(JSON.stringify(data.promotion_config));
        this.tableData.type = data.type;
        Object.keys(data.promotion_config).forEach((key: any) => {
            this.tableData.promotionConfig[key].forEach((config: any, idx: any) => {
                config["level"] = idx + 1;
            });

            this.tableData.defaultPromotionConfig[key].forEach((config: any, idx: any, arr: any) => {
                config["level"] = idx + 1;
            });
        });
    }

    /**表单 数据 */
    tableData: any = {
        myCommissionNum: {
            0: {},
            2: {},
            4: {},
            8: {},
            16: {},
            32: {},
            64: {},
            128: {},
        },
        promotionConfig: {},
        defaultPromotionConfig: {},
        is_promotion_num_added: 1,
        type: 0,
    };

    /**取目前的主币 奖励币 */
    getCurrentCoin() {
        const plat_coins = <any>GamePlatConfig.config.plat_coins;
        const coinsKey = Object.keys(plat_coins);
        coinsKey.forEach((key: any) => {
            if (plat_coins[key].type === 2) {
                this.pageData.platCoins.mainCoin = plat_coins[key];
                this.pageData.platCoins.mainCoin.name = key;
                // this.pageData.platCoins.mainCoin[key].name = key;
            }
            if (plat_coins[key].type === 3) {
                this.pageData.platCoins.rewardCoin = plat_coins[key];
                this.pageData.platCoins.rewardCoin.name = key;
                // this.pageData.platCoins.rewardCoin[key].name = key;
            }
        });
    }

    /**参数 */
    parameter: any = {
        user_id: core.user_id,
    };

    pageData = {
        loading: false,
        // 当前的主币 奖励币
        platCoins: <any>{
            mainCoin: {},
            rewardCoin: {},
        },
    };

    questionData = [
        { question: "什么是个人业績和朋友业績?", answer: "Some content" },
        { question: "什么是有效投注额?", answer: "Some content" },
        { question: "推荐洗码的具体计算方法是什么?", answer: "Some content" },
        { question: "洗码是否会影响J9BC产出?", answer: "Some content" }
    ]

    /**查询数据 */
    listQuery = {
        user_id: core.user_id,
        agent_user_id: core.user_id,
        from_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
        to_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
    };

    /**保存图片到相册 */
    async savePoster(url: any) {
        let poster: string;
        //@ts-ignore
        /* eslint-disable */
        const bg = require(`@/assets/extension/poster.jpg`);
        if (bg) {
            const myCanvas = new MyCanvas(667, 375);
            await myCanvas.drawImage1(bg, 0, 0);
            await myCanvas.drawQrCode(url, 505, 180, 140, 140);
            //推荐人
            myCanvas.drawText("推荐人:" + core.user_id.toString(), 575, 350, "#ffffff", 14);
            poster = myCanvas.getData();
        } else {
            const qr = await Utils.generateQrcode(this.link);
            poster = qr;
        }

        const img = new Image();
        img.src = poster;
        const newWin: any = window.open("", "_blank");
        newWin.document.write(img.outerHTML);
    }

    copy() {
        CopyUtil(this.link);
    }

    copyId() {
        CopyUtil(core.user_id.toString());
    }

    /**领取佣金 */
    api_user_var_commission_receive() {
        this.sendNotification(net.HttpType.api_user_var_commission_receive, {
            user_id: core.user_id,
        });
    }

    /**业绩查询--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
        }
    }

    /**业绩查询--获取用户推广统计信息*/
    api_user_var_agent_var_statistic_promotion() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_statistic_promotion, objectRemoveNull(this.listQuery));
    }

    /**业绩查询--返佣等级*/
    api_user_var_commission_commissionnum() {
        this.sendNotification(net.HttpType.api_user_var_commission_commissionnum, objectRemoveNull({ ...this.parameter }));
    }

    /**业绩查询--获取推广链接*/
    api_user_var_short_chain() {
        this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id });
    }
}