/* 文章校验规则模块 */

const joi = require('@hapi/joi')


// 文章标题验证规则
const title = joi.string().required()

// 分类Id验证规则
const cate_id = joi.number().integer().min(1).required()

// 文章内容验证规则
const content = joi.string().required().allow('')

// 文章发布状态验证规则
const state = joi.string().valid('已发布', '草稿').required()








// 验证规则对象---发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}