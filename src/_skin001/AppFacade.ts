import CheckSpeedCMD from "@/core/command/CheckSpeedCMD";
import IOErrorCMD from "@/core/command/IOErrorCMD";
import RequestEndCMD from "@/core/command/RequestEndCMD";
import RequestErrorCMD from "@/core/command/RequestErrorCMD";
import RequestStartCMD from "@/core/command/RequestStartCMD";
import GameConfig from "@/core/config/GameConfig";
import { getVersion } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import NetObserver from "./core/NetObserver";
import NotificationName from "@/core/NotificationName";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import { EnumPostMessage } from "@/core/enum/EnumPostMessage";
import dialog_recharge from "@/views/dialog_recharge";

export default class AppFacade {
    static inst = new AppFacade();

    private facade = puremvc.Facade.getInstance();

    startup() {
        this.initProxy();
        this.initCommand();
        this.initObserver();

        //版本号
        core.version_str = getVersion();
        core.version = new Date(getVersion()).getTime();
        if (process.env.VUE_APP_ENV == "development") {
            core.version *= 2;
        }
        GameConfig.load();

        //五分钟检测一次网络
        setInterval(() => {
            if (GlobalVar.host_urls) this.facade.sendNotification(NotificationName.CHECK_SPEED);
        }, 300000);

        window.addEventListener("message", (e) => {
            if (e.data == EnumPostMessage.TOPUP) {
                dialog_recharge.show();
            }
        });
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
}
