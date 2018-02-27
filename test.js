'use strict';
let db = require("./db.js");
db.add({ name: "haha" });
console.log(db.getList());