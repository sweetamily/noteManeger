
var mysql = require('mysql');
var sd = require('silly-datetime');
var test = function(data){
    var db = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'88888888',
        database:'node'
    });
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    time = Date.parse(new Date(time))
    return new Promise((resolve,reject)=>{
        db.connect(function(err){
            if(err){
                reject("mysql连接失败，错误码是："+err.code)
            }else{
                var sql = "SELECT * FROM notelist WHERE (? BETWEEN starttime AND endtime) AND userid=?";
                db.query(sql,[time,data],function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            }
        })
    });
}
    
exports.get = function(data){
    return test(data.id)
}