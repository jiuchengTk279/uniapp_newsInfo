<template>
	<view class="home">
		<NavBar :isSearch="true" @input="change" v-model="value"></NavBar>
		<view class="home-list">
			<view class="label-box" v-if="is_histroy">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view class="label-content" v-if="historyList.length > 0">
					<view v-for="(item,index) in historyList" :key="index" class="label-content_item" @click="openHistory">{{ item.name }}</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<!-- <view v-else>搜索结果</view> -->
			<!-- 搜索结果 -->
			<ListScroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length > 0">
					<ListCard v-for="(item, index) in searchList" :key="item._id" :item="item" @click="setHistory"></ListCard>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</ListScroll>
			<!-- <button type="default" @click="testBtn">添加历史记录</button> -->
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import NavBar from '../../components/navbar/navbar.vue'
	import ListScroll from '../../components/list-scroll/list-scroll.vue'
	import ListCard from '../../components/list-card/list-card.vue'

	export default {
		data() {
			return {
				// historyList: []
				is_histroy: true,
				searchList: [],
				value: '',
				loading: false
			}
		},
		computed: {
			...mapState(['historyList'])
		},
		onLoad() {
			// this.getSearch()
		},
		components:{
			NavBar,
			ListScroll,
			ListCard
		},
		methods: {
			change(value) {
				// this.value = value
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				
				// this.getList(value)
				// console.log('接收的value:'+value)
				// 请求延时
				// 做标记，一开始为 undefined
				if (!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.getSearch(value)
					}, 1000)
				}
			},
			getSearch(value) {
				if (!value) {
					this.searchList = []
					this.is_histroy = true
					return
				}
				this.is_histroy = false
				this.loading = true
				// this.$api.get_list({
				// 	name: '全部'
				// }).then(res => {
				// 	const { data } = res
				// 	console.log(res)
				// 	this.searchList = data
				// })
				this.$api.get_search({
					value
				}).then(res => {
					const { data } = res
					console.log(res)
					this.loading = false
					this.searchList = data
				}).catch(() => {
					this.loading = false
				})
			},
			setHistory () {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			openHistory (item) {
				this.value = item.name
				this.getSearch(this.value)
			},
			clear() {
				this.$store.dispatch('clear_history')
				uni.showToast({
					title: '清空记录完成'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		// border: 1px solid red;
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				.label-title {
					color: #f07373;
				}
				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
			.no-data {
				height: 200px;
				line-height: 200px;
				width: 100%;
				text-align: center;
				font-size: 12px;
				color: #666;
			}
		}
	}
</style>
