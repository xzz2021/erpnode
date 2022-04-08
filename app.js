/*
此处为入口文件
   ① 导入express中间件    ②封装错误输出函数res.cc      ③ 导入表单验证规则
   ④导入解析Token的相关依赖  ⑤ 导入并使用个人中心的路由模块
*/



//  ① 导入express
const  express = require('express')

//  ① 创建服务器实例
const app = express()

const cors = require('cors')
app.use(cors())

//   ③ 全局导入joi定义验证数据规则
const Joi = require('joi')

// ① 配置 application/json 
app.use(express.json())
//  ① 配置解析表单数据中间件，这个只能解析application/x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: false }))

// ④④④④导入配置文件
const config = require('./config')
// ④④④④解析token的中间件
const expressJWT = require('express-jwt')
// ④④④④④使用.unless指定不需要进行Token验证的接口
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\// ]}))


// ②  必须在路由之前封装res.cc函数，用以抛出错误信息
// ②  err的值，可能是一个错误对象，也可能是一个错误的描述字符串
app.use((req, res, next) => {
    // status默认值为1表示失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})



//  ① 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)   //此处/api为路由访问的前缀

const userinfoRouter = require('./router/userinfo')
// ⑤⑤⑤⑤ 以/form 开头的接口 都必须由权限，需要进行token认证
app.use('/form', userinfoRouter)

// ⑥⑥⑥⑥ 导入并使用获取和提交列表信息的路由模块
const listRouter = require('./router/form')
// ⑥⑥⑥⑥ 以/form/list 开头定义所有获取和提交列表的接口
app.use('/form/list', listRouter)



//  ③  定义（表单验证失败后）错误级别的中间件
 app.use((err, req, res, next) => {
    //  joi验证失败导致的错误
    if(err instanceof Joi.ValidationError) return res.cc(err)
    if(err.name === 'UnauthorizedError') return res.status(401).send('token不匹配，身份认证失败！')

 })
//  ① 启动服务器
app.listen(3006,() => {
    console.log('服务启动：api入口文件')
})