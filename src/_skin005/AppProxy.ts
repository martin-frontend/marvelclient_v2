

export default class AppProxy extends puremvc.Proxy {
    static NAME = "AppProxy";


    /** 加载中 动画的显示 */
    loading = false;
    refCount = 0;
    setLoading(isLoad: boolean = true) {
        if (isLoad) {
            this.refCount++;
        }
        else {
            this.refCount--;
        }
        if (this.refCount < 0) {
            this.refCount = 0;
        }
        //this.loading = isLoad;
        if (this.refCount == 0 && isLoad == false) {
            this.loading = false;
        }

        if (isLoad) {
            this.loading = true;
        }
    }

    /** 用户中心 */
    bshowUserPanel = false;
    setUserPanelShow(isShow:boolean)
    {
        this.bshowUserPanel = isShow;
    }

    bshowNovigationPanel = false;
    setNovigationPanelShow(isShow:boolean)
    {
        this.bshowNovigationPanel = isShow;
    }
}
