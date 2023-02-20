
/**
 * 用户多个 弹窗之间 的管理控制对象
 */
export default class MultDialogManager {

    private static obj_list = <any>[];

    public static onOpenPanel(obj:any)
    {
       
        //打开 一个 界面的时候 将 列表中现有的 第一个元素的 隐藏 掉
        if (MultDialogManager.obj_list.length > 0)
        {
            MultDialogManager.obj_list[0].hidden(true);
        }
        //并且将当前 对象 添加 到 数组中
        MultDialogManager.obj_list.unshift(obj);
        console.log("11打开界面",MultDialogManager.obj_list.length);
    }

    public static onClosePanel()
    {
        
        //关闭的时候  从前向后关闭   先将 元素 最开始的 一个 从数组中 取出来 
        MultDialogManager.obj_list.shift();
        if(MultDialogManager.obj_list.length > 0)
        {
            MultDialogManager.obj_list[0].hidden(false);
        }
        console.log("22关闭界面",MultDialogManager.obj_list.length);
       
    }
   

}