const repos = require("./data");
const fs = require("fs");
module.exports = {
    store: function() {
        fs.writeFileSync(__dirname + "/data.json", JSON.stringify(repos)); //以同步的方式写入
    },
    get: function(index) { // 增删改查的查询
        return repos[index];
    },
    add: function(article) { // 增删改查的增加
        repos.push(article);
        this.store();
    },
    del: function(index) { // 增删改查的删除
        repos.splice(index, 1); //删除
        this.store();
    },
    update: function(index, newArticle) { // 增删改查的更新
        console.log("服务器端的" + index, newArticle)
        repos.splice(index, 1, newArticle);
        this.store();
    },
    getList: function(params) { // 返回所有的数据
        return repos;
    }
}