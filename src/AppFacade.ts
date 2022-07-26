import IOErrorCMD from "./core/command/IOErrorCMD";
import RequestEndCMD from "./core/command/RequestEndCMD";
import RequestErrorCMD from "./core/command/RequestErrorCMD";
import RequestStartCMD from "./core/command/RequestStartCMD";
import GameConfig from "./core/config/GameConfig";
import { getVersion } from "./core/global/Functions";
import NetObserver from "./core/NetObserver";
import GameProxy from "./proxy/GameProxy";
import NoticeProxy from "./proxy/NoticeProxy";
import SelfProxy from "./proxy/SelfProxy";

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
        GameConfig.load();
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
    }

    private initObserver() {
        this.facade.registerMediator(new NetObserver(NetObserver.NAME));
    }
}
