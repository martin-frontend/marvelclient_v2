export default class IntroduceProxy extends puremvc.Proxy {
    static NAME = "IntroduceProxy";

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
        FlammingM: require("@/assets/introduce/FlammingM.png"),
        FlammingP: require("@/assets/introduce/FlammingP.png"),
        joystick: require("@/assets/introduce/joystick.png"),
        money: require("@/assets/introduce/money.png"),
        stuck: require("@/assets/introduce/stuck.png"),
        wheel: require("@/assets/introduce/wheel.png"),
    };
}
