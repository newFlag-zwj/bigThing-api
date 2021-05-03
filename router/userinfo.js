const express = require('express')
const router = express.Router()



// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')


// 导入更改用户基本信息的验证规则对象
const { update_userinfo_schema } = require('../schema/user')

// 导入更该用户密码的验证规则对象
const { update_password_schema } = require('../schema/user')

// 导入更换用户头像的验证对象
const { update_avatar_schema } = require('../schema/user')




// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')


// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 修改用户密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)



// 向外共享路由对象
module.exports = router