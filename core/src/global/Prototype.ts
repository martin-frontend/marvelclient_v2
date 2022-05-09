/**
 * Object.assign兼容
 */
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}
/**
 * window.atob/btoa 兼容
 */
if(typeof window.atob != 'function'){
    const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    window.atob = function (e) {
        for (var t, r, o = String(e), n = 0, a = c, i = ""; o.charAt(0 | n) || (a = "=", n % 1); i += a.charAt(63 & t >> 8 - n % 1 * 8)) {
            if (255 < (r = o.charCodeAt(n += .75))) throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            t = t << 8 | r
        }
        return i
    }
    window.btoa = function(e){
        var t = String(e).replace(/[=]+$/, "");
        if (t.length % 4 == 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var r, o, n = 0,
                 a = 0,
                 i = ""; o = t.charAt(a++);~o && (r = n % 4 ? 64 * r + o: o, n++%4) ? i += String.fromCharCode(255 & r >> ( - 2 * n & 6)) : 0) o = c.indexOf(o);
        return i
    }
}


