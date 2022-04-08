
// ②导入数据库操作模块
const db = require('../db/index')


/* 花纸车间报表接口
*/
exports.gethzcj = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from hzcj WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subhzcj = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into hzcj set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}


/* 成型车间车间报表接口
*/
exports.getcxbb = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from cxbb WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subcxbb = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into cxbb set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}


/* 磨边报表接口
*/
exports.getmbbb = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from mbbb WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.submbbb = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into mbbb set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}


/* 质检数据报表接口
*/
exports.getzjsj = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from zjsj WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subzjsj = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into zjsj set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}


/* 包装报表接口
*/
exports.getbzbb = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from bzbb WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subbzbb = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into bzbb set ?'
    db.query(sqlIns, list, (err, results) => {
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}

/* 材料管理查询
*/
exports.getclgl = (req, res) => {
    // const date = req.body.date
    const material = req.query.data
    // 汇总出库数量
    const sql = 'SELECT SUM(totalweight) AS sum FROM mayl WHERE warehouse = "入库" AND material = ? ;' +
    'SELECT SUM(totalweight) AS sum FROM mayl WHERE warehouse = "出库" AND material = ? ;' +
    'SELECT createtime FROM mayl WHERE material = ? ORDER BY id DESC LIMIT 1'
    // 汇总入库数量
    // const sql2 = 'SELECT SUM(totalweight) FROM mayl WHERE warehouse = "出库" AND material = ?'
    // const sql = 'select * from mayl WHERE material = ?'
    db.query(sql, [material, material,material], function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        // const reee = JSON.parse(JSON.stringify(results[0]))
        const res1 = results[0][0].sum
        const res2 = results[1][0].sum
        const total = res1 - res2
        const time = results[2]
        res.send({
            message: '获取数据成功!',
            total: total,
            time: time
        })

    })
}


/* 密胺出入库接口
*/
exports.getmayl = (req, res) => {
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from mayl WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.submayl = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into mayl set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}

/* 密胺外发数据接口
*/
exports.getwfgl = (req, res) => {
    const date = req.query.data
    const month = date.substring(5)
    const year = date.substring(0, 4)
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from mayl WHERE WAREHOUSE = "出库" AND MONTH(createtime) = ? AND YEAR(createtime) = ?'
    db.query(sql, [month, year], function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}



/* 花纸入库接口
*/
exports.gethzrk = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from hzrk WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subhzrk = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into hzrk set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}

/* 花纸出库接口
*/
exports.gethzck = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from hzck WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subhzck = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into hzck set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}

/* 成品出入库数据接口
*/
exports.getcpcl = (req, res) => {
    // const date = req.body.date
    const date = req.query.data
    if (date == '') return res.cc('请选择日期后重试')
    const sql = 'select * from cpcl WHERE DATE(createtime) = ?'
    db.query(sql, date, function (err, results) {
        // ⑥如果执行SQL失败返回报错
        if (err) return res.cc(err)
        if (results.length == 0) {
            res.send({ message: '当前查询数据为空!' })
        } else {
            res.send({
                message: '获取数据成功!',
                results: results
            })
        }
    })
}

exports.subcpcl = (req, res) => {
    // 获取客户端提交过来的数据
    const list = req.body
    const sqlIns = 'insert into cpcl set ?'
    db.query(sqlIns, list, (err, results) => {
        // ④判断SQL语句是否执行成功
        if (err) return res.cc('数据库出错，请重试！' + err)
        if (results.affectedRows !== 1) return res.cc('提交失败，请重新提交！')
        res.cc('提交成功！', 0)
    })
}