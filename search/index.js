//成绩查询功能
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const scoreData = require('./score.json')

http.createServer((req,res)=>{
    //查询成绩的入口 /query
    //路由请求路径和方式
    if(req.url === '/query' && req.method === 'GET') {
        fs.readFile(path.join(__dirname,'view','index.html'),'utf8',(err,fileContent)=>{
            if(err){
                res.end('404');
            }
            res.end(fileContent)
        })
    }else if(req.url === '/score'&& req.method === 'POST'){
        let pdata = '';
        req.on('data',(chunk)=>{
            pdata += chunk
        })
        req.on('end',()=>{
            let obj = querystring.parse(pdata);
            let result = scoreData[obj.code];
            fs.readFile(path.join(__dirname,'view','result.html'),'utf8',(err,content)=>{
                if(err){
                    res.end('404')
                }
                //返回内容之前要进行数据的渲染
                content = content.replace('$$chinese$$',result.chinese)
                content = content.replace('$$math$$',result.math)
                content = content.replace('$$english$$',result.english)
                content = content.replace('$$summary$$',result.summary)
                res.end(content)

            })

        })

    }



    //获取成绩的结果 /score


}).listen(3000,()=>{
    console.log('run...')
})