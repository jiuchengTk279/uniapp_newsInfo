// vuex 状态管理

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// historyList: []
		// 本地持久缓存数据，页面刷新数据不丢失
		historyList: uni.getStorageSync('_history') || []
	},
	mutations:{
		// 设置历史搜索记录
		SET_HISTORY_LIST(state, history) {
			state.historyList = history
		},
		// 清空历史记录
		CLEAR_HISTORY_LIST(state) {
			state.historyList = []
		}
	},
	actions: {
		set_history({commit, state}, history) {
			let list = state.historyList
			list.unshift(history)
			uni.setStorageSync('_history', list)
			commit('SET_HISTORY_LIST', list)
		},
		clear_history({commit}) {
			// uni.setStorageSync('_history', [])
			uni.removeStorageSync('_history')
			commit('CLEAR_HISTORY_LIST')
		}
	}
})

export default store