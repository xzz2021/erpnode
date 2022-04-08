/*
  此处定义get userinfo 接口
*/

const express = require('express')

const router = express.Router()
const infoHandler = require('../router-handler/userinfo')


router.get('/userinfo', infoHandler.getUserInfo)


module.exports = router
