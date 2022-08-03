import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
@Component
export default class CoinTip extends AbstractView {
    LangUtil = LangUtil;
}
