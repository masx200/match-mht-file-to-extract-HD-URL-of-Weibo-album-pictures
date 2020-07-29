const find = require("find");
const assert = require("assert");
const process = require("process");
process.on("unhandledRejection", (err) => {
  throw err;
});
~(function () {
  "use strict";
  const fs = require("fs");
  const path = require("path");
  const mhtdir = process.argv.slice(2)[0];
  assert(mhtdir, "path argument required");
  var 获取路径 = (async () => {
    let files = await find.fileSync(mhtdir);
    return files.filter((a) => a.endsWith(".mht"));
  })();
  const 清晰度 = "mw2000";
  ~(async () => {
    const 文件路径 = await 获取路径;
    console.log(文件路径);
    for (let filepath of 文件路径) {
      const mhtpath = filepath;
      const reg = /Content\-Location\: .+\.jpg/g;
      let buf = await fs.promises.readFile(mhtpath);
      const mhtstr = buf.toString();
      console.log("readfile sucess:", mhtpath, mhtstr.length);
      const result = Array.from(mhtstr.matchAll(reg), (a) => a[0]);
      const imglist = result
        .map((s) => {
          return s
            .slice("Content-Location: ".length)
            .replace("orj360", 清晰度)
            .replace("wap360", 清晰度)
            .replace("wap720", 清晰度)
            .replace("or180", 清晰度)
            .replace("small", 清晰度)
            .trim();
        })
        .filter((a) => a.startsWith("http"));
      console.log(imglist);
      const output = mhtpath + ".txt";
      await fs.promises.writeFile(output, imglist.join("\n"));
      console.log("writefile success:", output);
    }
  })();
})();
