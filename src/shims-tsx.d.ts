import Vue, { VNode } from "vue";

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
    interface Window {
        $mobile: boolean;
        $xsOnly: boolean;
    }
}

declare module "vue/types/vue" {
    interface VueConstructor {
        router: VueRouter;
        vuetify: Vuetify;
        prePath: string;
    }
    interface Vue {
        $mobile: boolean;
        $xsOnly: boolean;
    }
}
