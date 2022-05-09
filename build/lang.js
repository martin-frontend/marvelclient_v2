const fs = require("fs");
var path = require("path");
const xlsx = require("node-xlsx");
// 读取Excel
let exceldata = xlsx.parse("./lang/" + "lang.xlsx");
let exportData = exceldata[0]["data"];
const topArr = exportData.shift();


var exportJson = {};
let cate;
for (const row of exportData) {
    if (row[0]) {
        cate = row[0];
    }

    const key = row[1];
    if(key){
        for (let i = 2; i < row.length; i++) {
            const fName = topArr[i];
            if (!exportJson[fName]) {
                exportJson[fName] = {};
            }
            if (!exportJson[fName][cate]) {
                exportJson[fName][cate] = {};
            }
            exportJson[fName][cate][key] = row[i];
        }
    }
}

for (const fname of Object.keys(exportJson)) {
    var file = path.join(__dirname, "../src/lang/" + fname + ".ts");
    fs.writeFileSync(file, "export default " + JSON.stringify(exportJson[fname], null, 4));
}
