const path = require('path');
const fs = require('fs');

exports.staticSever = (req,res,root) => {
    fs.readFile(path.join(root,req.url),(err,fileContent)=>{
        console.log(err,fileContent)
        if(err){
            res.writeHead('200',{
                'Content-Type' : 'text/plain; charset=utf8'
            })
            res.end('404')
        }else{
            res.end(fileContent)
        }
    })
}