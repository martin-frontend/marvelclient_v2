import IOErrorCMD from "./core/command/IOErrorCMD";
import RequestEndCMD from "./core/command/RequestEndCMD";
import RequestErrorCMD from "./core/command/RequestErrorCMD";
import RequestStartCMD from "./core/command/RequestStartCMD";
import GameConfig from "./core/config/GameConfig";
import NetObserver from "./core/NetObserver";
import GameProxy from "./proxy/GameProxy";
import NoticeProxy from "./proxy/NoticeProxy";
import SelfProxy from "./proxy/SelfProxy";
import FagProxy from "./proxy/FagProxy";

export default class AppFacade {
    static inst = new AppFacade();

    private facade = puremvc.Facade.getInstance();

    startup() {
        GameConfig.load();
        this.initProxy();
        this.initCommand();
        this.initObserver();
    }

    private initProxy() {
        this.facade.registerProxy(new SelfProxy(SelfProxy.NAME));
        this.facade.registerProxy(new GameProxy(GameProxy.NAME));
        this.facade.registerProxy(new NoticeProxy(NoticeProxy.NAME));
        this.facade.registerProxy(new FagProxy(FagProxy.NAME));
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
