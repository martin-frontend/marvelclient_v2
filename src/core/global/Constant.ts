import LangUtil from "./LangUtil";

export default class Constant {
    /**时间查询类型 */
    static get TIME_TYPE() {
        return [LangUtil("今日"), LangUtil("昨日"), LangUtil("最近7天"), LangUtil("最近30天")]; //"今日", "昨日", "最近7天", "最近30天"
    }

    static get PERFORMANCE_TIME_TYPE() {
        return [LangUtil("最近7天"), LangUtil("最近30天")]; //"近7日", "近30日"
    }
}
