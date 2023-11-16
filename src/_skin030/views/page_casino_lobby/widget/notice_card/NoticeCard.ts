import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import gsap, { Linear } from "gsap";
import NovigationCommonData from "@/_skin030/views/novigation/NovigationCommonData";
import PanelUtil from "@/_skin030/core/PanelUtil";
@Component({
    components: {
        swiper,
        swiperSlide,
    },
})
export default class NoticeCard extends AbstractView {
    LangUtil = LangUtil;
    @Prop() data!: any;

    noticeDataList = [
        {
            model_type: 1,
            activity_name: "活动1标题",
            activity_desc: "活动1说明",
            btn_text: "活动1按钮",
            bg_img: require(`@/_skin030/assets/casino_lobby/card_bg_1.png`),
            key: "openpanel_dailysign",
        },
        {
            model_type: 2,
            activity_name: "活动2标题",
            activity_desc: "活动2说明",
            btn_text: "活动2按钮",
            bg_img: require(`@/_skin030/assets/casino_lobby/card_bg_2.png`),
        },
        {
            model_type: 3,
            activity_name: "活动3标题",
            activity_desc: "活动3说明",
            btn_text: "活动3按钮",
            bg_img: require(`@/_skin030/assets/casino_lobby/card_bg_3.png`),
        },
    ];
    onPromotion(item: any) {
        console.log("------点击---onPromotion", item);
    }

    getImgbg(item: any) {
        console.warn("item--img", item);
        return require(`@/_skin030/assets/casino_lobby/card_bg_${item.model_type}.png`);
    }
    onPlay(item: any) {
        if (item.key) {
            PanelUtil.actionByName(item.key);
            return;
        }
        this.goActivity();
    }
    get carouselHeight() {
        const offset = 20;
        const boxWidth = document.documentElement.clientWidth - offset;
        return boxWidth * 0.589;
    }

    swiperOption = {
        // initialSlide: 0,

        // 箭头配置
        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
        },
        // on: {
        //     click: (e: any) => {
        //         console.warn("---->>>on click", e.target.dataset);
        //         // this.noticeProxy.jump(JSON.parse(e.target.dataset.jumpitem));
        //     },
        // },
        spaceBetween: 24,
        slidesPerView: 2,
        loopedSlides: 6,
        slidesPerGroup: 1,

        loopFillGroupWithBlank: true,
        infinite: 1, // 无限滚动前后遍历数
        observer: true,
        observeParents: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        effect: "coverflow", //切换效果3D流
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 260,
            modifer: 5,
            slideShadows: false,
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 100000,
        },
        autoplayDisableOnInteraction: false,
        loop: true,
    };
    selectIndex = 0;
    progressObj = {
        value: 0,
    };
    onChange() {
        this.progressObj.value = 0;
        gsap.to(this.progressObj, {
            duration: 5,
            value: 100,
            ease: Linear.easeNone,
        });
    }

    goActivity() {
        NovigationCommonData.Instance.goCategory(
            { name: "精彩活动", id: 4, icon: "ky_promotion", path: "promotions" },
            { name: "精彩活动", id: 4, icon: "ky_promotion", path: "promotions" }
        );
    }
}
