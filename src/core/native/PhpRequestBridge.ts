export default class PhpRequestBridge {
    //post form表单请求
    static postRequest(url: string, json: any, callbackSucess: any, callbackFailed?: any) {
        console.log("data =", json);
        let keyArr = Object.keys(json);
        let formData = new FormData();

        for (let i = 0; i < keyArr.length; i++) {
            formData.append(keyArr[i], json[keyArr[i]]);
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("uri", url);
        xmlhttp.setRequestHeader("sign", "");
        xmlhttp.send(formData); // 要发送的参数，要转化为json字符串发送给后端，后端就会接受到json对象
        // readyState == 4 为请求完成，status == 200为请求陈宫返回的状态
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200) {
                // console.log("响应数据==========================", xmlhttp.responseText);
                // console.log("响应数据readyState==========================", xmlhttp.readyState);
                if (xmlhttp.readyState == 4) {
                    //readyState == 3下载中； responseText 属性已经包含部分数据。4下载操作已完成。
                    // PhpRequestBridge.closeLoading(callbackID);

                    if (callbackSucess) callbackSucess(xmlhttp.responseText);
                }
            } else {
                // PhpRequestBridge.closeLoading(callbackID);
                if (callbackFailed) callbackFailed();
            }
        };
    }

    static getRequest(url: string, callbackSucess: any, callbackFailed?: any) {
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null); /*不发送数据到服务器*/
        request.onreadystatechange = function () {
            console.log("request.responseText=", request.responseText);
            if (request.readyState == 4) {
                if (request.status == 200 && request.responseText) {
                    console.log("callbackSucess=", callbackSucess);

                    var json: core.ConfigVO;
                    try {
                        json = JSON.parse(request.responseText);
                        if (callbackSucess) callbackSucess(request.responseText);
                    } catch (e) {
                        if (callbackFailed) callbackFailed(null);
                    }
                } else {
                    if (callbackFailed) callbackFailed(null);
                }
            }
        };
    }
}
