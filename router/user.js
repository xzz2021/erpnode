/*
用户路由模块，类似于封装router
存储处理客户端请求与函数处理的映射关系  
*/

const express = require('express')

const router = express.Router()

const userHandler = require('../router-handler/user')

//  ② 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//   ②  导入验证表单规则的中间件
const { regSchema } = require('../schema/user')



router.post('/register', expressJoi(regSchema), userHandler.register)   

router.post('/login', expressJoi(regSchema), userHandler.login)


module.exports = router