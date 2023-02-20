
export default class NovigationProxy extends puremvc.Proxy {
    static NAME = "NovigationProxy";

    categoryActive = 0;
    isMenuOpen = <any>{};

    isminiMenu = false; //是否为小菜单

    setMiniMenu(isMini:boolean = false)
    {
        this.isminiMenu = isMini;
    }

    closeMenu()
    {
        const keys = Object.keys(this.isMenuOpen);
        for (let index = 0; index < keys.length; index++) {
           this.isMenuOpen [keys[index]] = false;
        }
    }
    
}
