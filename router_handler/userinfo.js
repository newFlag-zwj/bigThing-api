/* 用户信息路由处理函数模块 */

// 导入数据库连接模块
const db = require('../db/index')
const bcrypt = require('bcryptjs')


// 获取用户信息处理函数
exports.getUserInfo = (req, res) => {
    // 操作数据库查询用户的基本信息
    const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err.message)

        if (results.length !== 1) return res.cc('获取用户信息失败')

        return res.send({
            status: 0,
            msg: '获取用户信息成功',
            data: results[0]
        })
    })

}

// 更新用户基本信息处理函数
exports.updateUserInfo = (req, res) => {
    const sqlStr = `update ev_users set ? where id=?`
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err.message)

        if (results.affectedRows !== 1) return res.cc('修改用户信息失败')
        return res.cc('修改用户信息成功', 0)
    })
}

// 修改用户登陆密码处理函数
exports.updatePassword = (req, res) => {
    const sqlStr = `select * from ev_users where id=?`
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length !== 1) return res.cc('用户不存在')

        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误')

        // 对新密码进行bcrypt加密，更新到数据库中
        const sqlStr = `update ev_users set password=? where id=?`
            // 对新密码进行加密
        newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err.message)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')

            // 更新密码成功 
            return res.cc('更新密码成功', 0)
        })
    })


}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    const sqlStr = `update ev_users set user_pic=? where id=?`
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err.message)
        if (results.affectedRows !== 1) return res.cc('更换头像失败')

        return res.cc('更换头像成功', 0)
    })
}