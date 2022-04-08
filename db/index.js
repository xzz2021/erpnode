// 导入mysql模块

const mysql = require('mysql')

// 创建数据库连接对象

const db = mysql.createPool({
    // host: '127.0.0.1',
    host: 'localhost',
    user: 'root',
    password: 'zxc123',
    database: 'xzz2021',
    // 允许并行查询语句
    multipleStatements: true,
    // 加上后解决导出时间数据格式和时间都有问题的BUG
    dateStrings: true
})

// 向外导出暴露对象
module.exports = db