module net {
    export class Http {
        static request(data: any, url: string, callback?: any) {
            puremvc.Facade.getInstance().sendNotification(EventType.REQUEST_START, { url, data });

            data.device_type = core.device_type;
            data.app_type = core.app_type;
            data.device = core.device;
            data.plat_id = core.plat_id;
            data.channel_id = core.channel_id;

            data.lang = core.lang;

            if (core.user_id) {
                data.user_id = core.user_id;
                data.token = core.token;
            }

            console.group("http send >>> " + url);
            console.log(data);
            console.groupEnd();

            return new Promise((resolve, reject) => {
                const formData = core.getFormWithObject(data);
                const ajax = new XMLHttpRequest();
                ajax.open("POST", core.host + "/" + url);
                ajax.send(formData);
                ajax.onreadystatechange = function (e) {
                    const facde = puremvc.Facade.getInstance();
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            try {
                                const result: core.ResponseVO = JSON.parse(this.response);
                                if (callback) callback(result);

                                console.group("http response >>> " + url);
                                console.log(JSON.parse(this.response));
                                console.groupEnd();

                                if (result.status == 0) {
                                    resolve(result);
                                    const version = (new Date(result.extend.version)).getTime();
                                    if(core.version < version){
                                        alert("new version update!");
                                        location.reload();
                                    }
                                } else {
                                    facde.sendNotification(core.EventType.REQUEST_ERROR, { url, data, result });
                                }
                            } catch (e) {
                                facde.sendNotification(core.EventType.REQUEST_ERROR, { url, data, e });
                            }
                        } else {
                            facde.sendNotification(core.EventType.IO_ERROR, { url, data, e });
                        }
                        facde.sendNotification(core.EventType.REQUEST_END, { url, result: this.response });
                    }
                };
            });
        }

        static get(url:string, data?:any):Promise<any>{
            return new Promise((resolve, reject) => {
                const ajax = new XMLHttpRequest();
                ajax.open("GET", url);
                ajax.send(data);
                ajax.onreadystatechange = function (e) {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject();
                        }
                    }
                };
            });
        }

        static post(url:string, data?:any):Promise<any>{
            return new Promise((resolve, reject) => {
                const ajax = new XMLHttpRequest();
                ajax.open("POST", url);
                ajax.send(data);
                ajax.onreadystatechange = function (e) {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject();
                        }
                    }
                };
            });
        }
    }

    /**为URL附加参数 */
    export function getUrl(source: string, obj?: any): string {
        if (obj) {
            for (const key of Object.keys(obj)) {
                source = source.replace(`{${key}}`, obj[key]);
            }
        }
        return source;
    }
}
