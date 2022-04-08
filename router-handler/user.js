/*
此处定义路由处理函数，，①定义操作函数②引入数据库查询③加密用户密码④插入数据库，即写入注册的userinfo
⑤封装res.cc函数后直接调用⑥验证登录用户的密码是否正确⑦引入JWTtoken
把相应请求的接口返回函数抽离出来
在此处封装
*/

// ②导入数据库操作模块
const db = require('../db/index')

// ③导入bcrypt加密用户密码
const bcrypt = require('bcrypt')

// ⑦导入生成Token的包
    const jwt = require('jsonwebtoken')
// ⑦导入JWT的密匙
const config = require('../config')

exports.register = (req, res) => {
    // ①获取客户端提交过来的信息,req.body
    const userinfo = req.body

    // 此处移除掉普通的自定义表单验证------------
    // if(!userinfo.username || !userinfo.password ) {
    // //  ⑤  return res.send( {status: 1,message: '账号或密码不合法'} )
    // return res.cc('账号或密码不合法')
    // }
// ------------------------
    // ②定义SQL的username查询语句
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, userinfo.username, (err,results) => {
    // ②如果数据库查询语句执行失败
    if (err) {
        //    ⑤ return res.send({ status: 1, message: err.message})
        return res.cc(err)
    }
    // ②判断username是否冲突
    if (results.length > 0) {
        //    ⑤ return res.send({ status: 1, message: '用户名已存在' } )
        return res.cc('用户名已存在')
    }
    // ②如果用户名可以使用
    // 加密部分③③③③③③③③
    const saltRounds = 10  ////③生成salt的迭代次数
    const myPlaintextPassword = userinfo.password
    //③生成salt并获取hash值
    bcrypt.hash(myPlaintextPassword,saltRounds, function(err, hash){
            userinfo.password = hash
            const sqlIns = 'insert into users set ?'
            db.query(sqlIns, {username: userinfo.username, password: userinfo.password}, (err, results) => {
                // ④判断SQL语句是否执行成功
                if(err)  //   ⑤  return res.send ({ status: 1, message: err.message})
                  return res.cc(err)
                // ④判断影响行数是否为1
                if(results.affectedRows !== 1)    //    ⑤  return res.send({ status: 1, message: '注册失败，请稍后再试！'})
                return res.cc('注册失败，请稍后再试！')
                // ④注册成功
                //  ⑤   res.send({ status: 0, message: '注册成功！'})
                res.cc('注册成功！', 0)
            })
        })

})
}


// ①相当于定义函数名称的同时向外暴露并导出名称给封装的路由由其引用
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from users where username=?'
    db.query(sql, userinfo.username, function (err, results){
        // ⑥如果执行SQL失败返回报错
        if(err) return res.cc(err)
        if(results.length !==1) return res.cc('用户名不存在，登录失败')
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult) return res.cc('密码错误，稍后再试！')
        // if(!compareResult) return res.cc('密码错误，稍后再试！')
        // ⑦引入JWTtoken
        
        //                           ⑦剔除数据中用户的密码
        const user = {...results[0], password: ''}
        // ⑦⑦⑦⑦对用户信息进行加密  //加密信息     //加密密匙       //token有效期
        const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // console.log(token)
         res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearer ' + token
        })
    
})

}