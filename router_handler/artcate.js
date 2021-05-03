/* 文章分类管理处理函数模块 */


const db = require('../db/index')

// 获取所有未被标记删除的数据处理函数
exports.getArticleCates = (req, res) => {
    const sqlStr = `select * from ev_article_cate where is_delete=0`
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err.message)
        res.send({
            status: 0,
            msg: '获取文章分类列表成功',
            data: results
        })
    })
}

// 新增文章分类处理函数
exports.addArticleCates = (req, res) => {

    // 文章分类名与别名查重
    const sqlStr = `select * from ev_article_cate where name=? or alias=?`
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err.message)

        if (results.length === 2) return res.cc('分类名称与别名都被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名都被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换')


        // 文章分类添加
        const sqlStr = `insert into ev_article_cate set ?`
        db.query(sqlStr, req.body, (err, results) => {
            if (err) res.cc(err.message)
            if (results.affectedRows !== 1) res.cc('添加文章分类失败')

            res.cc('添加文章分类成功', 0)
        })
    })
}

// 根据Id删除文章分类处理函数
exports.deleteCateById = (req, res) => {
    sqlStr = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')

        res.cc('删除文章分类成功', 0)
    })
}

// 根据Id获取文章分类处理函数
exports.getCateById = (req, res) => {
    sqlStr = `select * from ev_article_cate where id=?`
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length !== 1) return res.cc('获取文章分类失败')

        res.send({
            status: 0,
            msg: '成功获取文章分类',
            data: results[0]
        })
    })
}

// 根据Id更新文章分类处理函数
exports.updateCateById = (req, res) => {
    // 执行查重操作
    sqlStr = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
    db.query(sqlStr, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length === 2) return res.cc('分类名称与别名都被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名都被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换')

        // 更新文章分类
        sqlStr = `update ev_article_cate set ? where id=? `
        db.query(sqlStr, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err.message)
            if (results.affectedRows !== 1) return res.cc('文章分类更新失败')

            res.send({
                status: 0,
                msg: '文章分类更新成功',
                data: results[0]
            })
        })

    })
}