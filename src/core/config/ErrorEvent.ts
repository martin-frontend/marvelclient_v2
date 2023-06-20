import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
class FirebaseData {
    private static _instance: FirebaseData;
    private static firebaseConfig = {
        apiKey: "AIzaSyCtypYA5gNSk_d1KM7HvDo6-TYYTp9LSv0",
        authDomain: "firsttestfiredata.firebaseapp.com",
        databaseURL: "https://firsttestfiredata.firebaseio.com",
        projectId: "firsttestfiredata",
        storageBucket: "firsttestfiredata.appspot.com",
        messagingSenderId: "71628956013",
        appId: "1:71628956013:web:d7256dfc3dec0852e9fa64",
        measurementId: "G-D80ZN3PWRD",
    };
    public static get Instance(): FirebaseData {
        if (!this._instance) {
            this._instance = new FirebaseData();
        }
        return this._instance;
    }
    /** firebase的 数据 */
    private firebaseDB: any;
    constructor() {
        const app = initializeApp(FirebaseData.firebaseConfig);
        this.firebaseDB = getFirestore(app);
    }
    /**获取当前时间信息 */
    get getTimeInfo() {
        const time_info = <any>{};
        const currentTime = new Date();
        // 创建时区选项
        const options: Intl.DateTimeFormatOptions = {
            timeZone: "Asia/Shanghai", // 设置为+8时区
            hour12: true, // 使用24小时制
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        // 格式化时间并输出
        const localTimeString = currentTime.toLocaleString("en-US", options);
        console.log(localTimeString);
        time_info.time = currentTime.getTime() + "";
        time_info.time_local = new Date();
        time_info.time_baijing = localTimeString;
        return time_info;
    }

    get getPageInfo() {
        const obj = <any>{};
        obj.url = window.location.href;

        return obj;
    }
    get getDiverInfo() {
        const deviceType = window.innerWidth < 768 ? "mobile" : "desktop";
        let browserName = "";
        const aa = navigator.userAgent.match(/(chrome|firefox|safari|edge|opera)/i);
        if (aa && aa.length > 0 && aa[0]) {
            browserName = aa[0].toLowerCase();
        }

        let browserVersion = "";
        const bb = navigator.userAgent.match(/(chrome|firefox|safari|edge|opera)\/([\d.]+)/i);
        if (bb && bb.length > 0 && bb[2]) {
            browserVersion = bb[2];
        }
        //const browserVersion = navigator.userAgent.match(/(chrome|firefox|safari|edge|opera)\/([\d.]+)/i)[2];
        const operatingSystem = navigator.platform;
        const resolution = window.screen.width + "x" + window.screen.height;
        const viewportSize = window.innerWidth + "x" + window.innerHeight;
        //@ts-ignore
        const language = navigator.language || navigator.userLanguage;
        const currentURL = window.location.href;
        return {
            deviceType: deviceType,
            browserName: browserName,
            browserVersion: browserVersion,
            operatingSystem: operatingSystem,
            resolution: resolution,
            viewportSize: viewportSize,
            language: language,
            currentURL: currentURL,
        };
    }
    /**设置数据--- */
    async addDocData(doc_name: string, data: any) {
        if (!data) return;
        const newObj = <any>{};
        //console.log(" 添加的数据为" ,data);
        newObj.errinfo = JSON.parse(JSON.stringify(data));
        //记录设备信息
        newObj.core_info = JSON.parse(JSON.stringify(core));
        //记录时间信息
        newObj.time_info = JSON.parse(JSON.stringify(this.getTimeInfo));
        //记录当前页面信息
        newObj.page_info = JSON.parse(JSON.stringify(this.getPageInfo));
        newObj.diver_info = JSON.parse(JSON.stringify(this.getDiverInfo));
        try {
            const collectionRef = collection(this.firebaseDB, "errinfo", doc_name, newObj.time_info.time);
            const docRef = await addDoc(collectionRef, newObj);
            //console.log("添加数据成功---", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}
/** 发送错误 事件  */
export function track_error_event(data: any = {}, eventName: string = "windowerror") {
    if (!(process.env.VUE_APP_ENV == "production")) {
        return;
    }
    //@ts-ignore
    const dataLayer_info = window.dataLayer || [];
    dataLayer_info.push(Object.assign({ event: eventName }, data));
    const skin = window.location.host;
    FirebaseData.Instance.addDocData(skin, data);
}
//@ts-ignore
window.track_error_event = track_error_event;