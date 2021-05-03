/* 验证规则 */

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * integer() 值只能时一个整数
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 导入验证规则模块
const joi = require('@hapi/joi')


// 用户名验证
const username = joi.string().alphanum().min(1).max(10).required()

// 密码验证
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// id验证
const id = joi.number().integer().min(1).required()

// nickname验证
const nickname = joi.string().required()

// email验证
const email = joi.string().email().required()

// avatar验证
const avatar = joi.string().dataUri().required()




// 向外共享注册登陆表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对req.body中的数据进行验证
    body: {
        username,
        password
    },
}

// 向外共享更新用户基本信息的验证规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 向外共享重置密码的验证对象
exports.update_password_schema = {
    body: {
        // 用户的旧密码 password为验证规则
        oldPwd: password,
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 向外共享更新头像的验证规则
exports.update_avatar_schema = {
    body: {
        avatar
    }
}