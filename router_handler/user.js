/* 定义和用户相关的路由处理函数 */

const db = require('../db/index')

// 导入加密存储中间件
const bcrypt = require('bcryptjs')

// 注册用户处理函数
exports.regUser = (req, res) => {
    // res.send('注册成功')
    // 接收表单数据
    const userinfo = req.body

    // 判断合法性
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({
    //         status: 1,
    //         msg: '用户名或密码不能为空'
    //     })
    // }

    // 检测用户名是否被占用
    const db = require('../db/index')
    const sqlStr = `select * from ev_users where username=?`
    db.query(sqlStr, [userinfo.username], (err, results) => {

        // 执行sql语句失败
        if (err) {
            // return res.send({ status: 1, msg: err.message })
            return res.cc(err.message)
        }

        // 用户名被占用
        if (results.length > 0) {
            // return res.send({ status: 1, msg: '用户名被占用' })
            return res.cc('用户名被占用')
        }

        // 用户名可用时
        // 导入加密存储中间件(6行)

        // 对用户密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
            // 插入新用户
        const sqlStr = `insert into ev_users set ?`
        db.query(sqlStr, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({ stauts: 1, msg: err.message })
                return res.cc(err.message)
            }
            // sql语句只想成功但影响行数不为一时
            if (results.affectedRows !== 1) {
                // return res.send({status: 1, msg: '注册用户失败，请稍后再试'})
                return res.cc('注册用户失败，请稍后再试')
            }

            // 注册成功
            // res.send({status: 0, msg: '注册成功'})
            return res.cc('注册成功', 0)
        })
    })
}


// 用户登陆函数
exports.login = (req, res) => {
    const userinfo = req.body

    // 查询数据库
    const sqlStr = `select * from ev_users where username=?`
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err.message)

        // 验证用户名的存在性
        if (results.length !== 1) return res.cc('用户名不正确')

        // 判断密码正确性
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码不正确')


        // 密码正确，成功登陆后
        // 剔除从数据库中返回信息中的密码与头像数据
        const user = {...results[0], password: '', user_pic: '' }

        // 导入生成Token字符串的包
        const jwt = require('jsonwebtoken')

        // 将用户信息对象加密为Token字符串
        const config = require('../config')
            // 生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            // 定义有效期
            expiresIn: '10h'
        })

        // 将生成的Token字符串响应给客户端
        res.send({
            status: 0,
            msg: '登陆成功',
            token: 'Bearer ' + tokenStr
        })
    })
}