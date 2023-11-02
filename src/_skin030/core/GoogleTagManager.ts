function getGMT() {
    // @ts-ignore
    return window.dataLayer || [];
}
export const GTM = {
    RegistrationSuccess: (phone: string, userID: string) => {
        getGMT().push({ event: "RegistrationSuccess", phone, userID });
    },
    loginSuccess: (phone: string, userID: string) => {
        getGMT().push({ event: "loginSuccess", phone, userID });
    },
    FTDAddCashClick: () => {
        getGMT().push({ event: "FTDAddCashClick" });
    },
    initiateFTD: (userID: string, value: number, currency: string) => {
        getGMT().push({ event: "initiateFTD", userID, value, currency });
    },
    SetAccountName: (userID: string) => {
        getGMT().push({ event: "SetAccountName", userID });
    },
    ftdSuccess: (phone: string, userID: string, value: number, currency: string) => {
        getGMT().push({ event: "ftdSuccess", phone, userID, value, currency });
    },
    ftdFailed: (userID: string, value: number, currency: string) => {
        getGMT().push({ event: "ftdFailed", userID, value, currency });
    },
    AddCashClick: () => {
        getGMT().push({ event: "AddCashClick" });
    },
    InitiateRepeatDeposit: (userID: string, value: number, currency: string) => {
        getGMT().push({ event: "InitiateRepeatDeposit", userID, value, currency });
    },
    repeatDepositSuccess: (phone: string, userID: string, value: number, currency: string) => {
        getGMT().push({ event: "repeatDepositSuccess", phone, userID, value, currency });
    },
    repeatDepositFailed: (userID: string, value: number, currency: string) => {
        getGMT().push({ event: "repeatDepositFailed", userID, value, currency });
    },
    firstCricketBet: (phone: string, userID: string, betAmount: number, currency: string) => {
        getGMT().push({ event: "firstCricketBet", phone, userID, betAmount, currency });
    },
    firstFootballBet: (phone: string, userID: string, betAmount: number, currency: string) => {
        getGMT().push({ event: "firstFootballBet", phone, userID, betAmount, currency });
    },
    firstCasino: (phone: string, userID: string, betAmount: number, currency: string) => {
        getGMT().push({ event: "firstCasino", phone, userID, betAmount, currency });
    },
    withdrawalRequested: (userID: string, withdrawAmount: number, currency: string) => {
        getGMT().push({ event: "withdrawalRequested", userID, withdrawAmount, currency });
    },
    withdrawalSuccess: (phone: string, userID: string, withdrawAmount: number, currency: string) => {
        getGMT().push({ event: "withdrawalSuccess", phone, userID, withdrawAmount, currency });
    },
};
