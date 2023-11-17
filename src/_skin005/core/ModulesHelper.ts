import GameConfig from "@/core/config/GameConfig";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";

function _isValueTrue(str: string, isDefault: boolean = true) {
    if (isDefault) {
        if (GameConfig && GameConfig.config && GameConfig.config.modules_switch && GameConfig.config.modules_switch[str] == 0) {
            return false;
        }
        return true;
    } else {
        if (GameConfig && GameConfig.config && GameConfig.config.modules_switch && GameConfig.config.modules_switch[str] == 1) {
            return true;
        }
        return false;
    }
}

function MyRebate() {
    return _isValueTrue("MyRebate");
    // if (GameConfig && GameConfig.config && GameConfig.config.MyRebate == 0) {
    //     return false;
    // }
    // return true;
}
function RebateDisplayType() {
    if (GameConfig && GameConfig.config && GameConfig.config.RebateDisplayType == 1) {
        return false;
    }
    return true;
}
function RebateListType() {
    if (GameConfig && GameConfig.config && GameConfig.config.RebateListType == 1) {
        return false;
    }
    return true;
}
/**
 * 是否显示 VIP信息
 */
function IsShow_VipInfo() {
    return _isValueTrue("gameWater");
}

/**
 * 是否显示 币种介绍
 */
function IsShow_CoinIntroduce() {
    return _isValueTrue("coinIntroduce");
}

/**
 * 是否显示 质押分红
 */
function IsShow_PledgeDividend() {
    return _isValueTrue("pledgeDividend");
}

/**
 * 是否显示 推广赚钱
 */
function IsShow_Promotion() {
    return _isValueTrue("promotion");
}

/**
 * 是否显示 游戏反水
 */
function IsShow_GameWater() {
    return _isValueTrue("gameWater");
}

/**
 * 是否显示 swap交易
 */
function IsShow_Swap() {
    return _isValueTrue("swap");
}
/**近期游戏记录 */
function IsShow_GameHistory() {
    return _isValueTrue("gamehistory", false);
}
/**
 * 是否显示 精彩活动
 */
function IsShow_ActivityDisplay() {
    return _isValueTrue("activityDisplay");
}
/**
 * 是否显示 每日签到
 */
function IsShow_DailysignDisplay() {
    return _isValueTrue("dailysignDisplay", false);
}
/**
 * 是否显示 顶部的足球 页签 以及 手机版 底部的页签
 */
function IsShow_FootBall() {
    return _isValueTrue("menuFootball");
}
/**
 * 是否显示 首页的足球热门赛事
 */
function IsShow_FootBallHot() {
    return _isValueTrue("footballHot");
}
/**
 * 是否显示 首页返水的领取 gameWaterGuide
 */
function IsShow_GameWaterManualReceive() {
    return _isValueTrue("gameWaterManualReceive");
}
/**
 * 是否显示 首页返水的引导 gameWaterGuide
 */
function IsShow_GameWaterGuide() {
    return _isValueTrue("gameWaterGuide");
}
/**
 * 如果为1 则需要  手动计算 vip的返奖比例
 */
function IsShow_VipShowDeal() {
    return _isValueTrue("VipShowDeal", false);
}
/**
 * 是否显示 左侧导航栏 悬浮 样式是否显示
 */
function IsShow_pcMenuTip() {
    return _isValueTrue("pcMenuTip");
}

/**
 * 是否显示 注册 时候的邀请拦
 */
function IsShow_HideRegisterInvite() {
    return _isValueTrue("HideRegisterInvite", false);
}

/**
 * @returns 是否将注册页的推荐人放在密码下面
 */
function IsShow_DownRegisterInvite() {
    return _isValueTrue("DownRegisterInvite", false);
}

/**
 * @returns 是否显示邀请码
 */
function IsShow_inviteCode() {
    return _isValueTrue("inviteCode", false);
}

/**
 * 是否显示 真实姓名
 */
function IsShow_HideRealName() {
    return _isValueTrue("HideRealName", false);
}
/**
 * 是否显示 安全中心
 */
function IsShow_HideSafeCenter() {
    return _isValueTrue("HideSafeCenter", false);
}
/**
 * 是否显示 安全中心
 */
function IsShow_HideEmail() {
    return _isValueTrue("HideEmail", false);
}
/**
 * 是否显示 google设置验证
 */
function IsShow_GoogleVerification() {
    return _isValueTrue("GoogleVerification");
}
/**
 * 是否显示 奖励币任务
 */
function IsShow_CoinTaskDisplay() {
    return _isValueTrue("coinTaskDisplay", false);
}

/**
 * 是否显示 telegram按钮
 */
function IsShow_TelegramButton() {
    return _isValueTrue("TelegramButton", false);
}
/**
 * 是否显示 telegram按钮
 */
function IsShow_NoticeBtn() {
    return _isValueTrue("NoticeButton", false);
}
/**注册时候的18岁选项 */
function IsShow_register18yearsOld() {
    return _isValueTrue("register18yearsOld", false);
}
/**
 * //是否显示 代理管理
 * @returns
 */
function IsShow_AgentManager() {
    //return IsShow_Directly() == 2;

    if (IsShow_Directly() == 2) {
        //const selfProxy = PanelUtil.getProxy_selfproxy;
        const selfProxy: SelfProxy = getProxy(SelfProxy);
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
    const selfProxy: SelfProxy = getProxy(SelfProxy);
    //const selfProxy = PanelUtil.getProxy_selfproxy;
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
    const selfProxy: SelfProxy = getProxy(SelfProxy);
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
    return _isValueTrue("sysService");
}
/**
 * 是否显示合作方客服
 * @returns
 */
function isShow_PartnerKefu() {
    return _isValueTrue("sysPartnerService", false);
}

function isShow_SearchGame() {
    return _isValueTrue("searchGame");
}
/**首页投注 */
function isShow_RecentBetting() {
    return _isValueTrue("recentBetting", false);
}
/*是否需要登录验证 */
function isNeed_loginVerifiy() {
    return _isValueTrue("loginVerifiy", false);
}
/*是否需要注册验证 */
function isNeed_registerVerifiy() {
    return _isValueTrue("registerVerifiy", false);
}
function isHide_MyInfo() {
    return _isValueTrue("mob_hidemyInfo", false);
}
/**设置CPF的入口 */
function IsShow_SetCPF() {
    return _isValueTrue("setCPF", false);
}
/**提现是否需要CPF */
function IsShow_ExchangeCPF() {
    return _isValueTrue("noNeedExchangeCPF", true);
}

/**首页投注 */
function isShow_RechargeActivityCheckbox() {
    return _isValueTrue("rechargeActivityCheckbox", false);
}
/**首页投注 */
function isHide_HomeDownloadBtn() {
    return _isValueTrue("isHideHomeDownloadBtn", false);
}
/**是否显示每日任务的入口 */
function isShow_DailyTaskBtn() {
    return _isValueTrue("isShowDailyTaskBtn", false);
}
export default {
    IsShow_VipInfo,
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
    IsShow_FootBall,
    IsShow_FootBallHot,
    IsShow_GameWaterManualReceive,
    IsShow_pcMenuTip,
    IsShow_GameWaterGuide,
    IsShow_VipShowDeal,
    IsShow_HideRegisterInvite,
    IsShow_DownRegisterInvite,
    IsShow_inviteCode,
    IsShow_GoogleVerification,
    MyRebate,
    RebateDisplayType,
    RebateListType,
    isShow_SearchGame,
    IsShow_DailysignDisplay,
    IsShow_HideRealName,
    IsShow_HideSafeCenter,
    IsShow_HideEmail,
    isShow_PartnerKefu,
    IsShow_CoinTaskDisplay,
    IsShow_TelegramButton,
    IsShow_NoticeBtn,
    IsShow_GameHistory,
    isShow_RecentBetting,
    IsShow_register18yearsOld,
    isShow_RechargeActivityCheckbox,
    isNeed_loginVerifiy,
    isNeed_registerVerifiy,
    isHide_MyInfo,
    IsShow_SetCPF,
    isHide_HomeDownloadBtn,
    isShow_DailyTaskBtn,
    IsShow_ExchangeCPF,
};
