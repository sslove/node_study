
const http = require('http');
const path = require('path');
const ss = require('./02.js')
//根据路径读取页面的内容，并且响应浏览器

http.createServer((req,res) => {
    //路径分发
    ss.staticSever(req,res,path.join(__dirname,'www'))
}).listen(3000,()=>{
    console.log('run....')
})