import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class RecentBetting extends AbstractView {
    titles = ["游戏名称", "玩家", "时间", "投注金额(USD)", "盈利(USD)"];
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
