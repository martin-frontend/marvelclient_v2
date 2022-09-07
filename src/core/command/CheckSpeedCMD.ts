import GameConfig from "../config/GameConfig";
import GlobalVar from "../global/GlobalVar";

export default class CheckSpeedCMD extends puremvc.SimpleCommand {
    private urls: string[] = [];
    private selected = false;

    public execute(notification: puremvc.INotification): void {
        this.urls = GlobalVar.host_urls.split(",");
        while(this.urls.length > 0){
            const host = this.urls.pop();
            if(host)
            this.checkAPI(host);
        }
    }

    private checkAPI(host: string) {
        net.Http.post(host + net.HttpType.api_test_speed).then((response) => {
            if(!this.selected){
                if(core.host){
                    core.host = host;
                }else{
                    core.host = host;
                    GameConfig.loadPlatConfig();
                }
                this.selected = true;
            }
        });
    }
}
