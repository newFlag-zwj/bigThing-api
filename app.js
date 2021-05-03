// 创建服务器
const express = require('express')
const app = express()

const joi = require('@hapi/joi')

// 解决跨域问题
const cors = require('cors')
app.use(cors())



// 将uploads目录中的图片托管为静态资源
app.use('/uploads', express.static('./uploads'))



// 配置解析表单中间件
app.use(express.urlencoded({ extended: false }))


// 为声明全局中间件，为res对象挂载res.cc()函数
app.use((req, res, next) => {
    // status为0成功，为1失败
    res.cc = (err, status = 1) => {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})




// 配置解析Token的中间件
//导入配置文件
const config = require('./config')

// 解析token的中间件
const expressJWT = require('express-jwt')

// 指明那些接口不需要进项token省份验证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))






// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入文章分类管理的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

// 导入文章管理的路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)





// 定义全局错误中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }

    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')


    // 未知错误
    res.cc(err)
})










// 指定端口号， 并监听服务器运行
app.listen(3007, () => {
    console.log('api_server running at http://127.0.0.1:3007')
})