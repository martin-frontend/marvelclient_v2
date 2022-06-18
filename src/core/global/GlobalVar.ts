export default class GlobalVar {
    static lang = "en_EN";
    static app_type = core.EnumAppType.WEB;

    static scrollStatus = {
        flag: false,
    };

    static HTMLElement = <any>{
        dom: null,
    };
}
