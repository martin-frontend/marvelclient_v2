/**
 * 用户多个 弹窗之间 的管理控制对象
 */
export default class PixelEvenManager {
    private static _instance: PixelEvenManager;
    public static get Instance(): PixelEvenManager {
        if (!this._instance) {
            this._instance = new PixelEvenManager();
        }
        return this._instance;
    }
    /**app ID */
    private static appid = "";
    /**重置 需要传入id*/
    public static Init(id: string) {
        this.appid = id;
        // //@ts-ignore
        // window.fbq("init", this.appid);
    }
    constructor() {}

    /**发送消息  */
    private _send_Message_base(msgType: string, appid: string, evenname: string, data: any = null) {
        //@ts-ignore
        if (!window.fbq) return;
        //@ts-ignore
        window.fbq(msgType, appid, evenname, data);
    }
    /**发送消息  */
    private _send_Message_track(evenname: string, data: any = null) {
        //@ts-ignore
        if (!window.fbq) return;
        //@ts-ignore
        window.fbq("track", evenname, data);
    }
    /**发送消息  */
    private _send_Message_trackSingle(evenname: string, data: any = null) {
        //@ts-ignore
        if (!window.fbq) return;
        //@ts-ignore
        window.fbq("trackSingle", PixelEvenManager.appid, evenname, data);
    }
    /**发送消息  */
    private _send_Message_trackSingleCustom(evenname: string, data: any = null) {
        //@ts-ignore
        if (!window.fbq) return;
        //@ts-ignore
        window.fbq("trackSingleCustom", PixelEvenManager.appid, evenname, data);
    }
    /**注册成功 */
    onRegisterSuccess() {
        this._send_Message_trackSingle("CompleteRegistration");
    }
    /**提交充值 */
    onSendRecharge(data: any) {
        this._send_Message_trackSingle("Purchase", data);
    }
    /**登录成功 */
    onLoginSuccess() {
        this._send_Message_trackSingleCustom("LoginSuccess");
    }
}
