<template>
    <div>
        <v-sheet class="mt-n12" color="transparent">
            <div class="text-26 font-weight-bold mb-2">产出比例规划</div>
            <div class="chartWrap">
                <div class="imgBox">
                    <div class="img2Wrap">
                        <img src="@/assets/introduce/line1.png" class="img2" />
                    </div>
                    <div class="img3Wrap">
                        <img src="@/assets/introduce/line2.png" class="img3" />
                    </div>
                    <div class="Text10B"><span>10B</span><span class="zh">总产出</span></div>
                </div>
                <ul class="textWrap">
                    <li><span class="bg1">70%</span> <strong>游戏挖矿</strong></li>
                    <li><span class="bg2 zh">5%</span> <strong>合作伙伴持有并锁仓两年</strong></li>
                    <li><span class="bg3">10%</span> <strong>空投及社区奖励</strong></li>
                    <li><span class="bg4">5%</span> <strong>好友推荐奖励</strong></li>
                    <li><span class="bg5 zh">10%</span> <strong>创始团队持有并锁仓两年</strong></li>
                    <li></li>
                </ul>
            </div>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
@Component
export default class ChartWrap extends AbstractView {}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
.chartWrap {
    overflow: hidden;
    height: 330px;
    width: 956px;
    max-width: 956px;
    border-radius: 16px;
    background: linear-gradient(90deg, #103464 0%, #1d2a43 100%);
    display: flex;
    justify-content: space-between;
}
.imgBox {
    position: relative;
    width: 420px;
    height: 330px;
    background: url("../../../../assets/introduce/wheel.png") no-repeat center;
    background-size: contain;
    padding: 10px 40px;
    box-sizing: border-box;
}
.img2Wrap {
    position: absolute;
    top: 35px;
    left: 56px;
    width: 260px;
}
.img3Wrap {
    position: absolute;
    top: 30px;
    left: 51px;
    width: 270px;
}
.img2 {
    width: 100%;
    transition-duration: 1s;
    -webkit-animation: rotate 5s linear infinite;
    animation: rotate 5s linear infinite;
}
.img3 {
    width: 100%;
    transition-duration: 1s;
    -webkit-animation: rotate 5s linear infinite;
    animation: rotate 5s linear infinite;
}
.Text10B {
    position: absolute;
    top: 0px;
    left: 40px;
    width: 290px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.Text10B span:nth-child(1) {
    color: #ffffff;
    font-weight: 900;
    font-size: 32px;
    line-height: 24px;
}
.Text10B span:nth-child(2) {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    line-height: 24px;
}
.Text10B span:nth-child(2).zh {
    font-size: 16px;
}

@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-moz-keyframes rotate {
    from {
        -moz-transform: rotate(0deg);
    }
    to {
        -moz-transform: rotate(359deg);
    }
}
@-o-keyframes rotate {
    from {
        -o-transform: rotate(0deg);
    }
    to {
        -o-transform: rotate(359deg);
    }
}
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}

ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
.textWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 535px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    padding: 15px 0;
    left: -15px;
    li {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        span {
            border-radius: 8px;
            height: 28px;
            line-height: 28px;
            width: 64px;
            text-align: center;
            margin-right: 16px;
            font-family: "Montserrat-ExtraBold";
            font-size: 14px;
            flex-shrink: 0;
            flex-grow: 0;
        }
        span.bg1 {
            background: rgba(114, 226, 96, 0.2);
            color: #72e260;
        }
        span.bg2 {
            background: rgba(226, 96, 96, 0.2);
            color: #e26060;
        }
        span.bg3 {
            background: rgba(226, 174, 96, 0.2);
            color: #e2ae60;
        }
        span.bg4 {
            background: rgba(96, 164, 226, 0.2);
            color: #60a4e2;
        }
        span.bg5 {
            background: rgba(200, 96, 226, 0.2);
            color: #c860e2;
        }
        strong {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0px;
            text-align: left;
            font-weight: normal;
        }
    }
}
</style>
