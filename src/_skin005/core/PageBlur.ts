export default class PageBlur {


    private static setPageScroll(isScroll:boolean)
    {
        if (!isScroll) {
            document.documentElement.style.overflow = "hidden";
            //@ts-ignore
            document.body.scroll = "no";
        } else {
            //document.documentElement.style.overflow = "scroll";
            document.documentElement.style.overflowY = "scroll";
            //@ts-ignore
            document.body.scroll = "yes";
        }
    }

    // 引用对象的数组
    private static arr = <any>{}; // 引用计数
    //通用 私有方法
    private static _blur_util(isBlur: boolean, isAll: boolean, allname: string, othername: string, blurvalue: number = 10) {
        let blur_ele: HTMLElement | null = null;
        const curUseName = isAll ? allname : othername;

        blur_ele = document.getElementById(curUseName);

        if (!blur_ele) return;

        if (!PageBlur.arr) {
            PageBlur.arr = <any>{};
        }
        // 如果没有值 或者 是负数 则 为0  
        if (!PageBlur.arr[curUseName] || PageBlur.arr[curUseName] < 0) {
            PageBlur.arr[curUseName] = 0;
        }

        if (isBlur) {
            PageBlur.arr[curUseName]++;
            if (PageBlur.arr[curUseName] > 1) return; // 引用已经超过一个了  则不需要再 设置

            blur_ele.style.filter = "blur(" + blurvalue + "px)";
            PageBlur.setPageScroll(false);
        }
        else {
            PageBlur.arr[curUseName]--;
            if (PageBlur.arr[curUseName] < 1)
            {
                blur_ele.style.filter = "none";
                PageBlur.setPageScroll(true);
            }
                
        }
    }
    //页面模糊  
    /**
     * 页面模糊
     * @param isBlur 是否模糊
     * @param isAll 是否全部模糊， 如果为false则 上面的head 不模糊 默认为true
     * @param blur_value 模糊的值 默认为10
     */
    static blur_mainpage(isBlur: boolean, isAll: boolean = true, blur_value: number = 10) {
        PageBlur._blur_util(isBlur, isAll, "mainpage", "router_page", blur_value);
    }

    /**
    * 导航模糊
    * @param isBlur 是否模糊
    * @param isAll 是否全部模糊， 如果为false则 上面的icon不模糊， 默认为true
    * @param blur_value 模糊的值 默认为10
    */
    static blur_novigation(isBlur: boolean, isAll: boolean = true, blur_value: number = 10) {
        PageBlur._blur_util(isBlur, isAll, "navpage", "category_page", blur_value);
    }
    static blur_page(isBlur: boolean ,blur_value: number = 10)
    {
        PageBlur._blur_util(isBlur, true, "page", "", blur_value);
    }

}