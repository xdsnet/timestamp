var express = require("express")
var app = express()

app.get("/*",function(req,res){
    var timeStr = decodeURI(req.path.substr(1)) //解码出查询数据
    var date
    var serverHost=req.protocol+"://"+req.host+"/"
    var dateOpt={month:"long",year:"numeric",day:"numeric"}
    
    if (timeStr===""){
        res.end('<!DOCTYPE html>'+
'<html lang="zh"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
'        <title>Timestamp microservice</title>'+
'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
'    </head>'+
'    <body>'+
'        <div class="container">'+
'            <h1 class="header">'+
'                API基本调用: 时间戳微服务(Timestamp microservice)'+
'            </h1>'+
'            <blockquote>'+
'                使用场景:'+
'                <ul>1) 传递一个字符串作为参数，会检测该字符串是否包含一个Unix时间戳或者自然语言的日期 (如: January 1, 2016)</ul>'+
'                <ul>2) 如果字符串是有效Unix时间戳或者日期，它返回Unix时间戳和日期的自然语言形式表示数据。</ul>'+
'                <ul>3) 如果字符串不是有效的格式，则它返回的属性无效，即<code>{"unix":null,"natural":null}</code></ul>'+
'            </blockquote>'+
'            <h3>调用样例:</h3>'+
'            <code>'+serverHost+'December%2015,%202015</code><br>'+
'            <code>'+serverHost+'1450137600</code>'+
'            <h3>样例输出:</h3>'+
'            <code>'+
'                {\n'+
'                  "unix": 1450137600,\n'+
'                  "natural": "December 15, 2015"\n'+
'                }\n'+
'            </code>'+
'        </div>'+
'</body></html>')
    }else{
        if(parseInt(timeStr).toString() === timeStr){ //timeStr是数字值，即unixtime值
            timeStr = parseInt(timeStr)
            console.log(" unixtime")
            date=new Date(timeStr)
        }else{
            date=new Date(Date.parse(timeStr))
            console.log("no unixtime")
            console.log(timeStr)
        }
        console.log(date)
        var rt={}
        if(date.getTime()){
            console.log("time ok")
            rt={
                "unixtime":date.getTime(),
                "natural":Intl.DateTimeFormat('en-US',dateOpt).format(date)//date.toLocaleString("en-us",dateOpt)
            }
        }else{
            console.log("time no ok")
            rt={
                "unixtime":null,
                "natural":null
            }
        }
        res.send(JSON.stringify(rt))
    }
})

app.listen(80)