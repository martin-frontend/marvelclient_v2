import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear } from "gsap";

@Component
export default class Advertise extends AbstractView {
    @Prop( {default:0}) showDataType!: number;
    
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;
    progressObj = {
        value: 0,
    };

    get height(): number {

        //return this.$vuetify.breakpoint.width* (316 / 1185);

        if(this.$vuetify.breakpoint.width <= 390) return 150;
        switch (this.$vuetify.breakpoint.name) {
            case "xs":
                return 200;
            case "sm":
                return 300;
            case "md":
                return 350;
            default:
                return 450;
        }
    }

    public  img_url( item:any): string {
        if (this.$vuetify.breakpoint.mobile) {
            return item.img_url_phone;
        }
        else {
            return item.img_url;
        }
    }

    
    public get isHaveData() : boolean {
        for (let index = 0; index < this.getShowData.length; index++) {
            if (this.img_url( this.getShowData[index]))
            {
                return true;
            }
        } 
        return false;
    }
    
    public get getShowData() : any {
        if (!this.showDataType || this.showDataType == 0)
            return this.noticeProxy.data.listType1

            switch (this.showDataType) {
                case 2  :return this.noticeProxy.data.listType4
                case 8  :return this.noticeProxy.data.listType5
                case 16 :return this.noticeProxy.data.listType6
                case 32 :return this.noticeProxy.data.listType7
                case 64 :return this.noticeProxy.data.listType8
                case 4  :return this.noticeProxy.data.listType9
                case 128:return this.noticeProxy.data.listType10
                default:
                    break;
            }
        
        return [];
    }

    onItemClick(item: any) {
        this.selectIndex = this.noticeProxy.data.listType1.indexOf(item);
        this.onChange();
    }

    onBigItemClick(item: any) {
        this.noticeProxy.jump(item);
    }

    onChange() {
        this.progressObj.value = 0;
        gsap.to(this.progressObj, {
            duration: 5,
            value: 100,
            ease: Linear.easeNone,
        });
    }
}
