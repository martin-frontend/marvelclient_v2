import LangConfig from "../config/LangConfig";

export default function LangUtil(str:string){
    const md5str = core.MD5.createInstance().hex_md5(str);
    return LangConfig.config[md5str];
}