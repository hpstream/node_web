// const http = require('http');
const path = require('path');
const fs = require('fs');
const suffix = require('./suffix.json');

module.exports = (req,res)=>{
    //获取url地址
    //url返回对象
    //{
    //  root: '/',
    //  dir: '/ww',
    //  base: 'index.html',
    //  ext: '.html',
    //  name: 'index'
    //   }
    let url=path.parse(req.url,true);
   // console.log(url)
    //处理http://localhost:3000与http://localhost:3000/index.html
    if(url.base ==''){
         url.base ='index.html';
    };
  //  console.log(path.join(__dirname,url.dir,url.base));
    fs.readFile(path.join(__dirname,url.dir,url.base),(err,data)=>{
        // 获取URL中文件的扩展名
            let ext = url.ext;
            // 设置响应类型的默认值
            let cType = 'text/html';
            // 如果请求的文件格式存在就覆盖默认值，不存在就是使用默认值
            if (suffix[ext]) {
                cType = suffix[ext];
            }
            //文本文件需要指定编码，图片不需要
            if (suffix[ext].startsWith('text')) {
                cType += '; charset=utf8'
            }
        //错误处理
        if(err){
                res.writeHead(404, {
                                'Content-Type': cType
                });
              if(url.ext == '.html'){
                //如果是html页面没有找到，就返回404.html页面
              // console.log(path.join(__dirname,'404.html'));
                    res.writeHead(301, {'Location': 'http://localhost:3000/404.html'});
                    res.end();
              }else{
                    res.end();
              }
              return ;
        }
        res.writeHead(200,{
            'Content-Type':cType
        });
        res.end(data);
    })
}