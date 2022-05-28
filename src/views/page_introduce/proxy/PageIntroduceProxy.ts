export default class PageIntroduceProxy extends puremvc.Proxy {
    static NAME = "PageIntroduceProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };

    pageImage = {
        cat: require("@/assets/introduce/CAT@3x.png"),
        coin: require("@/assets/introduce/coin.png"),
        joystick: require("@/assets/introduce/joystick.png"),
        money: require("@/assets/introduce/money.png"),
        stuck: require("@/assets/introduce/stuck.png"),
        wheel: require("@/assets/introduce/wheel.png"),
        line1: require("@/assets/introduce/line1.png"),
        line2: require("@/assets/introduce/line2.png"),
        flammingM: require("@/assets/introduce/FlammingM.png"),
        flammingP: require("@/assets/introduce/FlammingP.png"),
        intBg01M: require("@/assets/introduce/01M.png"),
        intBg02M: require("@/assets/introduce/02M.png"),
        intBg03M: require("@/assets/introduce/03M.png"),
        intBg01P: require("@/assets/introduce/01P.png"),
        intBg02P: require("@/assets/introduce/02P.png"),
        intBg03P: require("@/assets/introduce/03P.png"),
        externalLink: require("@/assets/introduce/External-link.png"),
        tickAble: require("@/assets/introduce/Tick-Able.svg"),
        tickDisable: require("@/assets/introduce/Tick-Disable.svg"),
    };
}
