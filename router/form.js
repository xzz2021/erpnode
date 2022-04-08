
// 所有接口均需调用express 然后由express调用Router
const express = require('express')
const router = express.Router()


// 导入引用的处理函数模块
const formHandler = require('../router-handler/form')


// 导入处理函数
// 定义获取列表的接口            //调用获取列表的函数
router.get('/hzcj', formHandler.gethzcj)
router.post('/hzcj', formHandler.subhzcj)

router.get('/cxbb', formHandler.getcxbb)
router.post('/cxbb', formHandler.subcxbb)

router.get('/mbbb', formHandler.getmbbb)
router.post('/mbbb', formHandler.submbbb)

router.get('/zjsj', formHandler.getzjsj)
router.post('/zjsj', formHandler.subzjsj)

router.get('/bzbb', formHandler.getbzbb)
router.post('/bzbb', formHandler.subbzbb)

router.get('/clgl', formHandler.getclgl)

router.get('/mayl', formHandler.getmayl)
router.post('/mayl', formHandler.submayl)

router.get('/wfgl', formHandler.getwfgl)

router.get('/hzrk', formHandler.gethzrk)
router.post('/hzrk', formHandler.subhzrk)

router.get('/hzck', formHandler.gethzck)
router.post('/hzck', formHandler.subhzck)

router.get('/cpcl', formHandler.getcpcl)
router.post('/cpcl', formHandler.subcpcl)


module.exports = router