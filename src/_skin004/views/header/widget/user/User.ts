import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_email from "@/_skin004/views/dialog_email";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderProxy from "../../proxy/HeaderProxy";

@Component
export default class User extends AbstractView {
    myProxy: HeaderProxy = getProxy(HeaderProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;


    
    public get curVipLevel() : number {
        if (this.selfProxy.userInfo.vip_info )
        {
            return this.selfProxy.userInfo.vip_info.vip_level;
        }
        else
        {
            return 0;
        }
        //return this.selfProxy.userInfo.vip_info.vip_level;
    }
    openMail()
    {
        dialog_email.show();
    }
    public get userShowName() : string {
        //return "fghfasdasqwe asd123123123asdasd";
        if (this.selfProxy.userInfo.nick_name)
        {
            return this.selfProxy.userInfo.nick_name;
        }
        else
        return this.selfProxy.userInfo.user_id + "";
    }
    
    vipMap: any = {
        0: require(`@/assets/mine/vip0.png`),
        1: require(`@/assets/mine/vip1.png`),
        2: require(`@/assets/mine/vip2.png`),
        3: require(`@/assets/mine/vip3.png`),
        4: require(`@/assets/mine/vip4.png`),
        5: require(`@/assets/mine/vip5.png`),
        6: require(`@/assets/mine/vip6.png`),
        7: require(`@/assets/mine/vip7.png`),
        8: require(`@/assets/mine/vip8.png`),
        9: require(`@/assets/mine/vip9.png`),
        10: require(`@/assets/mine/vip10.png`),
        11: require(`@/assets/mine/vip11.png`),
        12: require(`@/assets/mine/vip12.png`),
        13: require(`@/assets/mine/vip13.png`),
        14: require(`@/assets/mine/vip14.png`),
        15: require(`@/assets/mine/vip15.png`),
        16: require(`@/assets/mine/vip16.png`),
        17: require(`@/assets/mine/vip17.png`),
        18: require(`@/assets/mine/vip18.png`),
        19: require(`@/assets/mine/vip19.png`),
        20: require(`@/assets/mine/vip20.png`),
    };
}
