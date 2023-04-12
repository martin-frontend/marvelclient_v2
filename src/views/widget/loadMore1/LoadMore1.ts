import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class LoadMore1 extends AbstractView {
    LangUtil = LangUtil;
    @Prop() finished!: any;
    @Prop({ default: "listbox-mobile" }) _class!: string;

    @Prop({ default: "#000000" }) backgroundColor!: string;

    @Prop({ default: false }) listNodata!: boolean;

    observer!: MutationObserver;

    onRefresh(done: any) {
        this.$emit("onRefresh", done);
    }

    onLoad(done: any) {
        this.$emit("onLoad", done);
    }

    mounted() {
        //@ts-ignore
        const loadmoreDiv: HTMLElement = <any>this.$refs.loadmoreDiv.$el;
        //@ts-ignore
        const topDiv: HTMLElement = <any>this.$refs.topDiv.$el;
        //@ts-ignore
        const bottomDiv: HTMLElement = <any>this.$refs.bottomDiv.$el;
        this.$nextTick(() => {
            loadmoreDiv.style.paddingTop = topDiv.offsetHeight + "px";
            loadmoreDiv.style.paddingBottom = bottomDiv.offsetHeight + "px";
        });
        //@ts-ignore
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        this.observer = new MutationObserver((mutationList: any, observer: any) => {
            mutationList.forEach((mutation: any) => {
                switch (mutation.type) {
                    case "attributes":
                        loadmoreDiv.style.paddingTop = topDiv.offsetHeight + "px";
                        loadmoreDiv.style.paddingBottom = bottomDiv.offsetHeight + "px";
                        break;
                }
            });
        });

        this.observer.observe(topDiv, { attributes: true });
        this.observer.observe(bottomDiv, { attributes: true });
    }

    unmounted() {
        this.observer.disconnect();
    }
}
