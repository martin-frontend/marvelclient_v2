import AbstractProxy from "@/core/abstract/AbstractProxy";

export class GetVerityProxy extends AbstractProxy {
    static NAME = "GetVerityProxy";

    dialogData = {
        bShow: false,
        type: 0,
        email: "",
        auth_code: "",
    };
    /**验证码图片 */
    auth_image = "";

    show(type: number, email: string) {
        this.dialogData.type = type;
        this.dialogData.email = email;
        this.dialogData.bShow = true;
        this.api_public_auth_code();
    }

    api_public_auth_code(){
        this.sendNotification(net.HttpType.api_public_auth_code, {uuid: core.device});
    }

    api_public_email_send() {
        this.sendNotification(net.HttpType.api_public_email_send, {
            type: this.dialogData.type,
            email: this.dialogData.email,
            auth_code: this.dialogData.auth_code,
            plat_id: core.plat_id,
            uuid: core.device,
            user_id: core.user_id,
        });
    }
}

export default class GetVerity {
    static show(type:number, email:string) {
        const myProxy: GetVerityProxy = <any>puremvc.Facade.getInstance().retrieveProxy(GetVerityProxy.NAME);
        myProxy.show(type, email);
    }
}
