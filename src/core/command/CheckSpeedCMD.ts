import GameConfig from "../config/GameConfig";
import GlobalVar from "../global/GlobalVar";

export default class CheckSpeedCMD extends puremvc.SimpleCommand {
    private urls: string[] = [];
    private speeds: number[] = [];
    private beginTime = 0;
    private index = 0;
    private player_ip:string = "";

    public execute(notification: puremvc.INotification): void {
        this.urls = GlobalVar.host_urls.split(",");
        this.speeds = [];
        this.checkNext();
    }

    private checkNext() {
        const host = this.urls[this.index];
        if (host) {
            this.beginTime = new Date().getTime();
            net.Http.post(host + net.HttpType.api_test_speed)
                .then((response) => {
                    const json = JSON.parse(response);
                    this.player_ip = json.data.client_ip;
                    const endTime = new Date().getTime();
                    this.speeds.push(endTime - this.beginTime);
                })
                .catch(()=>{
                    this.speeds.push(100000000);
                })
                .finally(() => {
                    this.index++;
                    this.checkNext();
                });
        }else{
            const min = Math.min(...this.speeds);
            if(min<3000){
                if(core.host){
                    core.host = this.urls[this.speeds.indexOf(min)];
                }else{
                    core.host = this.urls[this.speeds.indexOf(min)];
                    GameConfig.loadPlatConfig();
                }
                
            }else{
                let alertStr = "URL ERROR\n";
                if(this.player_ip){
                    alertStr+= "IP: " + this.player_ip + "\n";
                }
                alertStr += "APIURL: " + GlobalVar.host_urls + "\n";
                alertStr += "URL: " + location.host;
                // alert(alertStr);
            }
        }
    }
}
