// 首字大写
String.prototype.firstUpperCase = function() {
    return this.replace(/^\S/, function(s) {
        return s.toUpperCase();
    })
}

// 协议名
function getPName(p) {
    p = p.replace(/\//g, "_");
    p = p.replace(/_\{(.*?)\}/g, "_var");
    if (p.indexOf("_") == 0) p = p.substr(1);
    return p;
}

// 创建文件夹
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


var path = require("path");
var fs = require("fs");

// 创建文件夹
mkdirsSync(path.join(__dirname, `../src/command`));
// 读取配置
var confStr =  fs.readFileSync(path.join(__dirname, `proto.json`), "utf-8");
var conf = JSON.parse(confStr);


writeSetting();

for (let p of conf.list) {
    if(typeof p != "string") {
        var pName = getPName(p[0]);
        writeCommand(pName, p[1]);
    }
}






// 生成setting.ts
function writeSetting() {
    var outputFile = path.join(__dirname, `../src/setting.ts`);

    var plist = conf.list;

    var infoStr = `/**\n * document: ${conf.document}\n */\n`;
    infoStr += "module net {\n";

    var httpTypeStr = `    /**协议*/\n    export var HttpType = {\n`;
    var eventTypeStr = `    /**事件*/\n    export var EventType = {
        /**--请求开始*/
        REQUEST_START: "REQUEST_START",
        /**--请求结束 */
        REQUEST_END: "REQUEST_END",
        /**请求错误 */
        REQUEST_ERROR: "REQUEST_ERROR",
        /**IO错误 */
        IO_ERROR: "IO_ERROR",
        `;
    var regStr = `    /**注册协议*/\n    export function initCommand() {\n        const facade = puremvc.Facade.getInstance();\n`;
    var typeName = "";
    for (let p of plist) {
        if(p.indexOf("--") != -1){
            typeName = p + "--";
            httpTypeStr += "\n";
            eventTypeStr += "\n";
            regStr += "        //" + p + "\n";
            continue;
        }
        if(typeof p != "string") {
            var pName = getPName(p[0]);
            var pInfo = `        /**${typeName}${p[1]}*/`;
            httpTypeStr += `${pInfo}\n        ${pName}: "${p[0]}",\n`;
            eventTypeStr += `${pInfo}\n        ${pName}: "${pName}",\n`;
            regStr += `        facade.registerCommand(HttpType.${pName}, cmd_${pName});\n`;
        }
        
    }

    httpTypeStr += "    };\n";
    eventTypeStr += "    };\n";
    regStr += "    };\n";

    var str = infoStr + httpTypeStr + eventTypeStr + regStr + "\n}";
    fs.writeFile(outputFile, str, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("setting.ts 写入成功！");
    });
}

// 生成cmd
function writeCommand(pName, description){
    var outputFile = path.join(__dirname, `../src/command/cmd_${pName}.ts`);
    fs.readFile(path.join(__dirname, "template", "cmd.template"), "utf-8", function(err, data) {
        if (err) {
            console.log("读取模板失败");
        } else {
            var str = data.replace(/\$\{pName\}/g, pName);
            str = str.replace("${description}", description);

            fs.writeFile(outputFile, str, function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log(pName + ".ts 写入成功！");
            });
        }
    });
}