import { getFileVersion } from "@/core/global/Functions";
import axios from "axios";

export default class LandConfig {
    static config: ConfigVO = <any>{};

    static loadChannelConfig() {
        console.log("location.host: ", location.host);
        const url1 = "config/" + core.MD5.createInstance().hex_md5(location.host) + ".json?" + getFileVersion();
        return axios.get(url1).then((response: any) => {
            Object.assign(this.config, response.data);
        });
    }

    static loadPlatConfig() {
        const url2 = "config/" + this.config.platID + ".json?" + getFileVersion();
        return axios.get(url2).then((response: any) => {
            Object.assign(this.config, response.data);
        });
    }
}
