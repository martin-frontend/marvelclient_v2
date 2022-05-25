import GameConfig from "@/core/config/GameConfig";

export default class PageHomeProxy extends puremvc.Proxy {
    static NAME = "PageHomeProxy";

    pageData = {
        loading: false,
        lobbyIndex: <core.PlatLobbyIndexVO[]>[],
    };

    setLobbyIndex(body: any) {
        const category_order = GameConfig.config && GameConfig.config.category_order;

        if (category_order && category_order.length > 0) {
            const tmp: core.PlatLobbyIndexVO[] = [];

            while (category_order.length > 0) {
                const cat = category_order.shift();
                const item = body.class.find((element: any) => element.category == cat);
                if (item) {
                    tmp.push(item);
                    body.class.splice(body.class.indexOf(item), 1);
                }
            }
            tmp.push(...body.class);
            this.pageData.lobbyIndex = tmp;
        } else {
            this.pageData.lobbyIndex = body.class;
        }
    }
}
