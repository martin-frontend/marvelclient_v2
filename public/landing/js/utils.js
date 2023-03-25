function getFormWithObject(obj) {
    const fData = new FormData();
    for (const key of Object.keys(obj)) {
        if (obj[key]) fData.append(key, obj[key]);
    }
    return fData;
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
function getJson(url, callback) {
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            callback(JSON.parse(request.responseText));
        }
    };
}
function getFileVersion() {
    const min = (new Date().getTime() / 1000 / 60) >> 0;
    return ((min / 60) >> 0).toString() + (((min % 60) / 15) >> 0).toString();
}
