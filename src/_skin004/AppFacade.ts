import CheckSpeedCMD from "@/_skin004/core/command/CheckSpeedCMD";
import IOErrorCMD from "@/_skin004/core/command/IOErrorCMD";
import RequestEndCMD from "@/_skin004/core/command/RequestEndCMD";
import RequestErrorCMD from "@/_skin004/core/command/RequestErrorCMD";
import RequestStartCMD from "@/_skin004/core/command/RequestStartCMD";
import GameConfig from "@/core/config/GameConfig";
import { getVersion } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import NetObserver from "@/_skin004/core/NetObserver";
import NotificationName from "@/core/NotificationName";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import { EnumPostMessage } from "@/core/enum/EnumPostMessage";
import dialog_recharge from "@/_skin004/views/dialog_recharge";
import getProxy from "@/core/global/getProxy";

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
            switch (e.data) {
                case EnumPostMessage.TOPUP:
                    dialog_recharge.show();
                    break;
                case EnumPostMessage.TOKEN_TIMEOUT:
                    {
                        const gameProxy: GameProxy = getProxy(GameProxy);
                        gameProxy.go_soccer();
                    }
                    break;
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
