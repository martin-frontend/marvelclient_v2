module core {
    /**
     * 配置文件，需要在配置文件中配置的全局使用的参数
     */
    export interface ConfigVO {
        /**与PHP交互API地址 */
        ApiUrl: string;
        /**客服地址 */
        cServer: string;
        /**skinId，皮肤版本号 */
        skinId: string;
        /**skinSudId，扩展皮肤版本号，用于区分不同的厂商平台不同的loading页，背景音乐等 */
        skinSudId: string;
        /**配置文件的cdn地址 */
        CdnUrl: string;
        /**官网地址地址 */
        DownLoadPageUrl: string;
        /**首页菜单排序 */
        category_order: number[];
    }
}