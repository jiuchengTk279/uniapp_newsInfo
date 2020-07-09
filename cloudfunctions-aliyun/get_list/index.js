'use strict';
// 获取数据库的引用
const db = uniCloud.database()

exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event)
  
  const { name, page = 1, pageSize = 10 } = event
  // var name = event.name
  
  // 接收分类，通过分类去筛选数据
  // const list = await db.collection('article').field({
	 //  // true 值表示返回这个字段，false 表示不返回
	 //  content: false
  // }).get()
  
  let matchObj = {}
  // 进行全部的数据筛选
  if (name !== '全部') {
	  matchObj = {
		 classify: name
	  }
  }
  
  
  
  // 聚合，更精细化的去处理数据、求和、分组，指定那些字段
  const list = await db.collection('article').aggregate().match(matchObj).project({
	  content: 0
  })
  // 计算要跳过的数据
  .skip(pageSize * (page - 1)).limit(pageSize).end()
  
  
  //返回数据给客户端
  // return event
  
  // return list
  return {
	  code: 200,
	  msg: '数据请求成功',
	  data: list.data
  }
};
