var http = require("https");
var fs = require("fs");
var shuzu=[];
var tupiantxt=fs.readFile('main.txt','utf-8',function(err,data){
    if(err){
        console.log('读取编辑文件失败');
    
    }else{
         console.log('读取编辑文件成功');
         //console.log(data);
         var txt=data;
         txt.replace(/<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/ig,function(reg1,reg2){
            //console.log(reg1);
          
            
            if(reg2.indexOf('https:')==-1){
                reg2='https:'+reg2
            }
           reg2=reg2.replace('64x64.','')
           reg2= reg2.replace('_.webp','')
             console.log(reg2);
            shuzu.push(reg2)
          
         })
        console.log(shuzu.length+'张图片')
        down(shuzu);
    }
})

console.log("http start");

var url = "";
var totaldone=0;

function down(arr) {
    for (let i = 0; i < arr.length; i++) {
        http.get(arr[i], function (res) {
            var imgData = "";
            res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
            res.on("data", function (chunk) {
                imgData += chunk;
              
            });
            res.on("end", function () {
                fs.writeFile("./pic/"+i+".png", imgData, "binary", function (err) {
                    if (err) {
                        console.log("down fail");
                    } else {
                        totaldone++;
                       
                        console.log("下载完成第"+i+"张");
                         if(totaldone==arr.length){
                            console.log('下载完成');
                        }
                    }

                });
            });
        });
    }
}

