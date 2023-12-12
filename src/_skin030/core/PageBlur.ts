// export default class PageBlur {

import { isSafari } from "@/core/global/Functions";

//     static blurRight = false;

//     private static setPageScroll(isScroll:boolean)
//     {
//         if (!isScroll) {
//             document.documentElement.style.overflow = "hidden";
//             //@ts-ignore
//             document.body.scroll = "no";
//         } else {
//             //document.documentElement.style.overflow = "scroll";
//             document.documentElement.style.overflowY = "scroll";
//             //@ts-ignore
//             document.body.scroll = "yes";
//         }
//     }

//     // 引用对象的数组
//     private static arr = <any>{}; // 引用计数
//     //通用 私有方法
//     private static _blur_util(isBlur: boolean, isAll: boolean, allname: string, othername: string, blurvalue: number = 10) {
//         let blur_ele: HTMLElement | null = null;
//         const curUseName = isAll ? allname : othername;

//         blur_ele = document.getElementById(curUseName);

//         if (!blur_ele) return;

//         if (!PageBlur.arr) {
//             PageBlur.arr = <any>{};
//         }
//         // 如果没有值 或者 是负数 则 为0
//         if (!PageBlur.arr[curUseName] || PageBlur.arr[curUseName] < 0) {
//             PageBlur.arr[curUseName] = 0;
//         }

//         if (isBlur) {
//             PageBlur.arr[curUseName]++;
//             if (PageBlur.arr[curUseName] > 1) return; // 引用已经超过一个了  则不需要再 设置

//             blur_ele.style.filter = "blur(" + blurvalue + "px)";
//             PageBlur.setPageScroll(false);
//         }
//         else {
//             PageBlur.arr[curUseName]--;
//             if (PageBlur.arr[curUseName] < 1)
//             {
//                 blur_ele.style.filter = "none";
//                 PageBlur.setPageScroll(true);
//             }

//         }
//     }
//     //页面模糊
//     /**
//      * 页面模糊
//      * @param isBlur 是否模糊
//      * @param isAll 是否全部模糊， 如果为false则 上面的head 不模糊 默认为true
//      * @param blur_value 模糊的值 默认为10
//      */
//     static blur_mainpage(isBlur: boolean, isAll: boolean = true, blur_value: number = 10) {
//         this.blurRight = isBlur;
//         // PageBlur._blur_util(isBlur, isAll, "mainpage", "router_page", blur_value);
//     }

//     /**
//     * 导航模糊
//     * @param isBlur 是否模糊
//     * @param isAll 是否全部模糊， 如果为false则 上面的icon不模糊， 默认为true
//     * @param blur_value 模糊的值 默认为10
//     */
//     static blur_navigation(isBlur: boolean, isAll: boolean = true, blur_value: number = 10) {
//         PageBlur._blur_util(isBlur, isAll, "navpage", "category_page", blur_value);
//     }
//     static blur_page(isBlur: boolean ,blur_value: number = 10)
//     {
//         PageBlur._blur_util(isBlur, true, "page", "", blur_value);
//     }

// }

const PageBlur = {
    isBlur: false,
    right: false,
    bottom: false,
    curBlurCount_main: 0,
    curBlurCount_right: 0,
    curBlurCount_bottom: 0,

    setPageScroll: (isScroll: boolean) => {
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
    },

    onChangeBlur: () => {
        //两个计数的值 修复 ，放置小于 0
        if (PageBlur.curBlurCount_right < 0) {
            PageBlur.curBlurCount_right = 0;
        }
        if (PageBlur.curBlurCount_bottom < 0) {
            PageBlur.curBlurCount_bottom = 0;
        }
        if (PageBlur.curBlurCount_main < 0) {
            PageBlur.curBlurCount_main = 0;
        }
        //如果 其中 有一个 还有值 则 显示
        if (PageBlur.curBlurCount_right > 0 || PageBlur.curBlurCount_bottom > 0 || PageBlur.curBlurCount_main > 0) {
            PageBlur.isBlur = true;
            PageBlur.setPageScroll(false);
        }

        if (PageBlur.curBlurCount_right < 1) {
            PageBlur.right = false;
        }
        if (PageBlur.curBlurCount_bottom < 1) {
            PageBlur.bottom = false;
        }
        if (PageBlur.curBlurCount_right < 1 && PageBlur.curBlurCount_bottom < 1 && PageBlur.curBlurCount_main < 1) {
            PageBlur.isBlur = false;
            PageBlur.setPageScroll(true);
        }
    },
    blur_mainpage: (isBlur: boolean, isAll = true) => {
        if (isSafari()) return;
        if (isBlur) {
            //PageBlur.isBlur = isBlur;
            PageBlur.right = isBlur;
            PageBlur.bottom = isBlur;
            PageBlur.curBlurCount_right++;
            PageBlur.curBlurCount_bottom++;
            PageBlur.curBlurCount_main++;
        } else {
            PageBlur.curBlurCount_right--;
            PageBlur.curBlurCount_bottom--;
            PageBlur.curBlurCount_main--;
        }
        PageBlur.onChangeBlur();
    },
    blur_navigation: (isBlur: boolean, isAll = true) => {
        if (isSafari()) return;
        if (isBlur) {
            PageBlur.bottom = isBlur;
            PageBlur.curBlurCount_bottom++;
            PageBlur.curBlurCount_main++;
        } else {
            PageBlur.curBlurCount_bottom--;
            PageBlur.curBlurCount_main--;
        }
        PageBlur.onChangeBlur();
    },
    blur_page: (isBlur: boolean) => {
        if (isSafari()) return;
        if (isBlur) {
            PageBlur.curBlurCount_main++;
        } else {
            PageBlur.curBlurCount_main--;
        }
        PageBlur.onChangeBlur();
    },
    //强力 关闭
    blur_force_close: () => {
        PageBlur.curBlurCount_main = 0;
        PageBlur.curBlurCount_right = 0;
        PageBlur.curBlurCount_bottom = 0;
        PageBlur.onChangeBlur();
    },
};

export default PageBlur;
