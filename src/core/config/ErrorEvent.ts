/** 发送错误 事件  */
export function track_error_event(data: any = {}, eventName: string = "windowerror") {
    //@ts-ignore
    const dataLayer_info = window.dataLayer || [];
    if (!data.time) {
        data.time = new Date().getTime();
    }

    dataLayer_info.push(Object.assign({ event: eventName }, data));
}
