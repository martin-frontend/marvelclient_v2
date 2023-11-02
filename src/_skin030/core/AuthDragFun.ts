/**
 * 取出服务器给的滑动的距离的值
 * @param data 传入的值
 * @returns 滑块所在的位置  返回的（百分比）异或（key）,取得原始百分比； key是两位数，十位是plat_id最后一位，个位是channel_id最后一位
 */
export function getAuthDragValue(data: any): any {
    // console.log("-------plat_id--------",core.plat_id);
    // console.log("-------channel_id--------",core.channel_id);
    const key = parseInt(getLastStr(core.plat_id + "") + getLastStr(core.channel_id + ""));
    // console.log(" 获取到的key 为" , key);
    const res = data ^ key;
    // console.log(" 异或的结果 为" ,res);
    return data ^ key;
}
function getLastStr(str: string) {
    return str[str.length - 1];
}
