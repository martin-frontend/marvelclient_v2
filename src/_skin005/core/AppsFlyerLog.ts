import WebViewBridge from "@/core/native/WebViewBridge";

export const FlayerLog = {
    //用户注册
    RegistrationSuccess: (phone: string, userID: string) => {
        WebViewBridge.getInstance().flyerLog({ eventName: "Registration", eventValues: { phone, userID } });
    },
    //用户登录
    loginSuccess: (phone: string, userID: string) => {
        WebViewBridge.getInstance().flyerLog({ eventName: "Login", eventValues: { phone, userID } });
    },
    //用户设置真实姓名
    SetAccountName: (userID: string, AccountName: string) => {
        WebViewBridge.getInstance().flyerLog({ eventName: "SetAccountName", eventValues: { userID, AccountName } });
    },
    //第一次存款成功
    // ftdSuccess: (UserID:string, Amount:string, Currency:string,PaymentGateway:string, Source:string, Campaign:string) => {
    //     WebViewBridge.getInstance().flyerLog({ eventName: "ftdSuccess", eventValues: {UserID, Amount, Currency, PaymentGateway, Source, Campaign} });
    // },
    //第一次存款失败
    // ftdFailed: (UserID:string, Amount:string, Currency:string,PaymentGateway:string) => {
    //     WebViewBridge.getInstance().flyerLog({ eventName: "ftdFailed", eventValues: {UserID, Amount, Currency, PaymentGateway}});
    // },
    //用户第一次点击存款按扭
    // FTDAddCashClick: () => {
    //     WebViewBridge.getInstance().flyerLog({ eventName: "FTDAddCashClick", eventValues: { userID: core.user_id } });
    // },
    //用户点击存款按扭
    AddCashClick: () => {
        WebViewBridge.getInstance().flyerLog({ eventName: "AddCashClick", eventValues: { userID: core.user_id } });
    },
    //存款成功
    repeatDepositSuccess: (UserID: string, Amount: any, Currency: string, PaymentGateway: string) => {
        WebViewBridge.getInstance().flyerLog({
            eventName: "repeatDepositSuccess",
            eventValues: { UserID, Amount, Currency, PaymentGateway },
        });
    },
    //存款失败
    repeatDepositFailed: (UserID: string, Amount: any, Currency: string, PaymentGateway: string) => {
        WebViewBridge.getInstance().flyerLog({
            eventName: "repeatDepositFailed",
            eventValues: { UserID, Amount, Currency, PaymentGateway },
        });
    },
    //用户请求提款
    withdrawalRequested: (UserID: string, Amount: any, Currency: string, WithdrawalMode: any) => {
        WebViewBridge.getInstance().flyerLog({
            eventName: "WithdrawalRequested",
            eventValues: { UserID, Amount, Currency, WithdrawalMode },
        });
    },
    //用户提款成功
    withdrawalSuccess: (UserID: string, Amount: any, Currency: string, WithdrawalMode: string) => {
        WebViewBridge.getInstance().flyerLog({ eventName: "withdrawalSuccess", eventValues: { UserID, Amount, Currency, WithdrawalMode } });
    },
};
