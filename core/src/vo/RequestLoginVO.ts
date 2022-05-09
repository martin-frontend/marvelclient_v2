module core{
    /**
     * 请求登录
     */
    export interface RequestLoginVO extends RequestBaseVO{
        username?:string;
        password?:string;
    }
}
