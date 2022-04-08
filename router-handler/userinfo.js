/*
*此处定义获取用户信息后
查询数据库                     ①定义基本处理函数   ② 导入数据库并定义相关逻辑
并返回相关信息的处理函数
*/

// ②导入数据库操作
const db = require('../db/index')


// ①定义并导出用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
//    ②定义SQL语句,根据用户id，查询用户相关信息
const sql = 'select id, username from users where id=?'
// ②调用db.query执行SQL语句  req上的user对象是Token解析成功后，express-jwt帮我们挂载上去的
db.query(sql, req.user.id, (err, results) => {
    // ②执行失败返回错误信息
    if(err) return res.cc(err)
    // ②执行成功，但是查询不到相关数据时返回错误
    if (results.length !== 1) return res.cc('数据库用户信息不存在')
    // 执行成功后返回数据给用户
    res.send({
        status: 0,
        message: '获取信息成功',
        data: results[0],
        avator: 'http://xzz2022.top/avator/milkshake.png'})  //此处等同于返回id 和 username
})
}