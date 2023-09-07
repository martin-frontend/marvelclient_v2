import APP from "@/_skin004/App";
import { Component, Watch, Vue } from "vue-property-decorator";

@Component
export default class NewAPP extends APP {
    created() {
        this.onResize();
    }

    last_mobile_type = false;
    onResize() {
        // const isM = !!isMobile();
        // // PanelUtil.message_alert(navigator.userAgent);
        // if (isM) {
        //     window.$mobile = Vue.prototype.$mobile = this.$vuetify.breakpoint.mobile;
        // } else {
        //     window.$mobile = Vue.prototype.$mobile = false;
        // }
        // window.$xsOnly = Vue.prototype.$xsOnly = !!Vue.vuetify.framework.breakpoint.xsOnly && !!isMobile();

        window.$xsOnly = Vue.prototype.$xsOnly = Vue.vuetify.framework.breakpoint.xsOnly;
        window.$mobile = Vue.prototype.$mobile = Vue.vuetify.framework.breakpoint.mobile;

        this.last_mobile_type = window.$mobile;
        //console.log("---上一次名字---", this.last_mobile_type);
    }
}
