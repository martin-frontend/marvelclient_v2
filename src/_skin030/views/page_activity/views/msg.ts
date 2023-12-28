const msg = {
    depositNow: "立即获取",
    goNow: "立即前往",
};

export const getMsg = (LangUtil: any) => {
    const entries = Object.entries(msg).map(([a, b]) => [a, LangUtil(b)]);
    const newMsg = Object.fromEntries(entries);
    return newMsg as typeof msg;
};
