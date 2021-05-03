/* 文章分类管理路由模块 */



const express = require('express')
const router = express.Router()



// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')


// 导入文章分类的验证模块
const { add_cate_schema } = require('../schema/artcate')

// 导入根据Id删除文章分类的验证对象
const { delete_cate_schema } = require('../schema/artcate')

// 导入根据Id获取文章分类的验证对象
const { get_cate_schema } = require('../schema/artcate')

// 导入根据Id更新文章分类的验证对象
const { update_cate_schema } = require('../schema//artcate')







// 导入文章分类的处理函数
const artcate_handler = require('../router_handler/artcate')


// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 根据Id删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

// 根据Id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getCateById)

// 根据Id更新文章分类
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)






// 向外共享路由对象
module.exports = router