module core{
    export interface ModuleVO {
        /**模块名*/
        name: string;
        /**资源组名*/
        resGroup: string;
        /**路由名*/
        routeName: string;
        /**模块加载成功后，需要执行的命令*/
        okEventType: string;
    }
}

