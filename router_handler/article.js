/* 文章管理处理函数模块 */

const db = require('../db/index')


// 发布文章的处理函数
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面时必选参数')

    const path = require('path')
    const articleInfo = {
        // 标题、内容、状态、所属分类的Id
        ...req.body,
        // 文章的封面在服务器的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id
    }
    const sqlStr = `insert into ev_articles set ?`
    db.query(sqlStr, articleInfo, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.affectedRows !== 1) return res.cc('文章发布失败')

        res.cc('文章发布成功', 0)
    })



}