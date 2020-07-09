import $http from '../http.js'

// 获取头部导航栏的数据请求
// export const get_label = (data) => {
// 	return new Promise((resolve, reject) => {
// 		uniCloud.callFunction({
// 			name: 'get_label',
// 			data
// 		}).then((res) => {
// 			if (res.result.code === 200) {
// 				// .then
// 				resolve(res.result)
// 			} else {
// 				// .catch
// 				reject(res.result)
// 			}
// 		}).catch((err) => {
// 			reject(err)
// 		})
// 	})
// } 
export const get_label = (data) => {
	return $http({
		url: 'get_label',
		data
	})
}


// 获取列表数据的请求
// export const get_list = () => {
// 	return new Promise((resolve, reject) => {
// 		resolve({data: '请求数据成功'})
// 	})
// }


export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}
