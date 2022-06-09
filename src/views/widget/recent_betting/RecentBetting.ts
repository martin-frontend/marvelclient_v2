import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class RecentBetting extends AbstractView {
    LangUtil = LangUtil;
    titles = [LangUtil("游戏名称"), LangUtil("玩家"), LangUtil("时间"), LangUtil("投注金额(USD)"), LangUtil("盈利(USD)")];
    listData = [
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
        ["普通百家乐", "***eng", "2022-05-03 23:26:57", "$ 428.57", "$ 407.14"],
    ];
}
