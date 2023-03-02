import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "./PanelUtil";

function _isValueTrue(str:string) {

    if (GameConfig && GameConfig.config && GameConfig.config.modules_switch && GameConfig.config.modules_switch[str] == 0)
    {
        return false
    }
    return true;
}

/**
 * 是否显示 VIP信息
 */
function IsShow_VipInfo() {
    return _isValueTrue("gameWater")
}

/**
 * 是否显示 币种介绍
 */
function IsShow_CoinIntroduce() {
    return _isValueTrue("coinIntroduce")
}

/**
 * 是否显示 质押分红
 */
function IsShow_PledgeDividend() {
    return _isValueTrue("pledgeDividend")
}

/**
 * 是否显示 推广赚钱
 */
function IsShow_Promotion() {
    return _isValueTrue("promotion")
}

/**
 * 是否显示 游戏反水
 */
function IsShow_GameWater() {
    return _isValueTrue("gameWater")
}

/**
 * 是否显示 swap交易
 */
function IsShow_Swap() {
    return _isValueTrue("swap")
}

/**
 * 是否显示 精彩活动
 */
function IsShow_ActivityDisplay() {
    return _isValueTrue("activityDisplay")
}
/**
 * //是否显示 代理管理
 * @returns 
 */
function IsShow_AgentManager() {
    //return IsShow_Directly() == 2;

    if (IsShow_Directly() == 2)
    {
        const selfProxy = PanelUtil.getProxy_selfproxy;
        if (!(selfProxy && selfProxy.userInfo && selfProxy.userInfo.user_id != 0)) {
            return false;
        }
        // 1-信用代理|98-信用玩家
        if (selfProxy.userInfo.show_credit_set == 1) {
            return true;
        }
        return false;
    }
    return false;
}


/**
 * 是否显示 代理管理
 * @returns //1-展示推广赚钱|2-展示代理管理|3-都不展示
 */
function IsShow_Directly() {

    const selfProxy = PanelUtil.getProxy_selfproxy;
    if (!(selfProxy && selfProxy.userInfo && selfProxy.userInfo.user_id != 0)) {
        return 0;
    }
    if (selfProxy.userInfo.show_promote == 1) {
        return 1;
    }
    if (selfProxy.userInfo.show_promote == 2) {
        return 2;
    }

    return 0;
}

function isShow_Fan_shui() {
    const selfProxy = PanelUtil.getProxy_selfproxy;
    if (!(selfProxy && selfProxy.userInfo && selfProxy.userInfo.user_id != 0)) {
        return false;
    }
    if (selfProxy.userInfo.is_credit_user == 1) {
        return true;
    }

    return false;
}
/**
 * 是否显示客服
 * @returns 
 */
function isShow_Kefu() {
    return _isValueTrue("sysService")
}

export default {
    IsShow_VipInfo ,
    IsShow_CoinIntroduce,
    IsShow_PledgeDividend,
    IsShow_Promotion,
    IsShow_GameWater,
    IsShow_Swap,
    IsShow_ActivityDisplay,
    //IsShow_Directly,
    IsShow_AgentManager,
    isShow_Fan_shui,
    isShow_Kefu,
}