import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear } from "gsap";

@Component({
    components: {
        swiper,
        swiperSlide,
    },
})
export default class Advertise extends AbstractView {
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;
    progressObj = {
        value: 0,
    };

    swiperOption = {
        initialSlide: 0,

        // 箭头配置
        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
        },
        on: {
            click: (e: any) => {
                console.log(e.target.dataset);
                console.log(e.target.dataset.jumpitem);
                this.noticeProxy.jump(JSON.parse(e.target.dataset.jumpitem));
            },
        },
        spaceBetween: 24,
        slidesPerView: 4,
        loopedSlides: 8,
        slidesPerGroup: 1,

        loopFillGroupWithBlank: true,
        infinite: 1, // 无限滚动前后遍历数
        observer: true,
        observeParents: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 4000,
        },
        autoplayDisableOnInteraction: false,
        loop: true,
    };

    get height(): number {
        switch (this.$vuetify.breakpoint.name) {
            case "xs":
                return 145;
            case "sm":
            case "md":
                return 350;
            default:
                return 480;
        }
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
