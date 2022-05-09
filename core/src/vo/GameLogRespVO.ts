module core{
    export interface GameLogRespVO {
        list:GameLogVO[];
        pageInfo: PageInfoVO;
        /**总投注*/
        total_bet_gold:string;
        /**总输赢*/
        total_win_gold:string;
        /**总流水*/
        total_water:string;
    }
}
