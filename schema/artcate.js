/* 文章分类管理验证规则 */



// 导入定义验证规则模块
const joi = require('@hapi/joi')


// 分类名称
const name = joi.string().required()

// 分类别名
const alias = joi.string().alphanum().required()

// 分类Id
const id = joi.number().integer().min(1).required()





// 校验规则对象---添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 校验规则对象---根据Id删除分类
exports.delete_cate_schema = {
    params: {
        id
    }
}

// 校验规则对象---根据Id获取文章分类
exports.get_cate_schema = {
    params: {
        id
    }
}

// 校验规则对象---根据Id跟新文章分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}