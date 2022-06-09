import LangConfig from "../config/LangConfig";

export default function LangUtil(str: string, ...args: any[]) {
    const md5str = core.MD5.createInstance().hex_md5(str);
    let result: string = LangConfig.config[md5str];
    if (result) {
        for (let i = 0; i < args.length; i++) {
            result = result.replace(`{${i}}`, args[i]);
        }
        return result;
    } else {
        return str;
    }
}
