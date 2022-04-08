/* 此文件处理   
验证前端提交过来的数据格式
各项表单数据
*/


const express = require('express')
const app = express()

//  导入joi定义验证数据规则
const Joi = require('joi')

// 解析 x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false}))

//  定义各项数据规则,校验需要在路由中通过  调用进行参数验证

// const regSchema = Joi.body({    //可以分别校验body,query,params
//     username: Joi.string()
//     .min(5)
//     .max(12)
//     .required(),
//     password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).required()
//     })
    // repeat_password: Joi.ref('password')

    const username = Joi.string().min(5).max(12).required()
    const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).required()

    exports.regSchema = {
        body: {
            username,
            password
        }
    }
    