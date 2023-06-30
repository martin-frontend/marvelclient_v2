import CheckSpeedCMD from "@/_skin005/core/command/CheckSpeedCMD";
import IOErrorCMD from "@/_skin005/core/command/IOErrorCMD";
import RequestEndCMD from "@/_skin005/core/command/RequestEndCMD";
import RequestErrorCMD from "@/_skin005/core/command/RequestErrorCMD";
import RequestStartCMD from "@/_skin005/core/command/RequestStartCMD";
import GameConfig from "@/core/config/GameConfig";
import { getVersion, isMobile } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import NetObserver from "./core/NetObserver";
import NotificationName from "@/core/NotificationName";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import { EnumPostMessage } from "@/core/enum/EnumPostMessage";

import PanelUtil from "./core/PanelUtil";
import LoginEnter from "@/_skin005/core/global/LoginEnter";
import Vue from "vue";
import axios from "axios";
import axiosRetry from "axios-retry";
import LangUtil from "@/core/global/LangUtil";

export default class AppFacade {
    static inst = new AppFacade();

    private facade = puremvc.Facade.getInstance();

    async startup() {
        this.initProxy();
        this.initCommand();
        this.initObserver();

        //版本号
        core.version_str = getVersion();
        core.version = new Date(getVersion()).getTime();
        if (process.env.VUE_APP_ENV == "development") {
            core.version *= 2;
        }

        // 配置 axios-retry 插件
        axiosRetry(axios, {
            retries: 5, // 重试次数
            retryDelay: (retryCount) => {
                // 指数退避算法
                // return retryCount * 1000;
                return 1000;
            },
            retryCondition: (error) => {
                // 仅在出现网络错误或 5xx 响应时重试
                return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
            },
        });

        GameConfig.load();

        
        //五分钟检测一次网络
        setInterval(() => {
            if (GlobalVar.host_urls) this.facade.sendNotification(NotificationName.CHECK_SPEED);
        }, 300000);

        window.addEventListener("message", (e) => {
            switch (e.data) {
                case EnumPostMessage.TOPUP:
                    PanelUtil.openpanel_recharge();
                    break;
                case EnumPostMessage.TOKEN_TIMEOUT:
                    {
                        PanelUtil.getProxy_gameproxy.go_soccer();
                        // const gameProxy:GameProxy = getProxy(GameProxy);
                        // gameProxy.go_soccer();
                    }
                    break;
            }
            switch (e.data.action) {
                case EnumPostMessage.UNLOGIN:
                    console.log("收到消息-111--", e.data);
                    LoginEnter(() => {});
                    break;
                case EnumPostMessage.RECHARGE:
                    console.log("收到消息-222--", e.data);
                    PanelUtil.message_confirm({
                        message: LangUtil("余额不足，是否充值？"),
                        okFun: () => {
                            PanelUtil.openpanel_recharge();
                        },
                    });
                    break;
                case EnumPostMessage.REBALANCE:
                    console.log("收到消息-333--", e.data);
                    //PanelUtil.getProxy_selfproxy.api_user_show_var([2, 3]);
                    break;
                case EnumPostMessage.BETTINGRECORD:
                    console.log("收到消息-4444--", e.data);
                    LoginEnter(() => {
                        PanelUtil.openpanel_bet_record();
                    });
                    break;
            }
        });
        await this.isIpAllow();
    }

    private initProxy() {
        this.facade.registerProxy(new SelfProxy(SelfProxy.NAME));
        this.facade.registerProxy(new GameProxy(GameProxy.NAME));
    }

    private initCommand() {
        this.facade.registerCommand(core.EventType.REQUEST_START, RequestStartCMD);
        this.facade.registerCommand(core.EventType.REQUEST_END, RequestEndCMD);
        this.facade.registerCommand(core.EventType.IO_ERROR, IOErrorCMD);
        this.facade.registerCommand(core.EventType.REQUEST_ERROR, RequestErrorCMD);
        this.facade.registerCommand(NotificationName.CHECK_SPEED, CheckSpeedCMD);
    }

    private initObserver() {
        this.facade.registerMediator(new NetObserver(NetObserver.NAME));
    }
    private async isIpAllow() {
        if (!core.plat_id) return;
        const url = net.getUrl(net.HttpType.api_plat_var_is_allowed, { plat_id: core.plat_id });
        return await net.Http.request({}, url)
            .then((response: any) => {
                const data = response.data.data ?? response.data;
                //if (data && data.is_allowed )
                if (data && data.IP && !data.is_allowed) {
                    const url = `./forbidden/index.html`;
                    return axios
                        .get(url)
                        .then((response: any) => {
                            //console.log("--- 加载成功");
                            window.location.href = `./forbidden?${data.IP}`;
                        })
                        .catch(() => {
                            //console .error("加载失败--");
                        });

                    // window.location.href=`./forbidden?${data.IP}`;
                    // return ;
                }
            })
            .catch(() => {
                // alert(" 错误");
                console.log("---allow--error----");
            });
    }
}
