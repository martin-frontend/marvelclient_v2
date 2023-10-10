/**
 * 用户多个 弹窗之间 的管理控制对象
 */
export default class MultDialogManager {
    private static obj_list = <any>[];
    private static get maxShowCount() {
        // if (window.$mobile) {
        //     return 3;
        // }
        return 1;
    }
    public static onOpenPanel(obj: any) {
        //检测是否已经包含有 此对象
        if (MultDialogManager.obj_list.includes(obj)) {
            console.log("已经包含了 此对象");
            return;
        }
        //打开 一个 界面的时候 将 列表中现有的 第一个元素的 隐藏 掉
        if (MultDialogManager.obj_list.length >= this.maxShowCount) {
            MultDialogManager.obj_list[this.maxShowCount - 1].hidden(true);
        }
        //并且将当前 对象 添加 到 数组中
        MultDialogManager.obj_list.unshift(obj);
        console.log("11打开界面", MultDialogManager.obj_list.length);
    }

    public static onClosePanel() {
        //关闭的时候  从前向后关闭   先将 元素 最开始的 一个 从数组中 取出来
        if (MultDialogManager.obj_list.length < 1) {
            return;
        }
        MultDialogManager.obj_list.shift();

        console.log("22关闭界面", MultDialogManager.obj_list.length);
        if (MultDialogManager.obj_list.length >= this.maxShowCount) {
            MultDialogManager.obj_list[this.maxShowCount - 1].hidden(false);
        }
    }
    /**
     * 强制关闭 所有
     */
    public static forceClosePanel() {
        MultDialogManager.obj_list = <any>[];
    }
}
