<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<ListItem :list="listCatchData[index]" @loadmore="loadmore" :load="load[index]"></ListItem>
		</swiper-item>
	</swiper>
</template>

<script>
	import ListScroll from '../list-scroll/list-scroll.vue'
	import ListCard from '../list-card/list-card.vue'
	import ListItem from './list-item.vue'
	
	export default {
		data() {
			return {
				list: [],
				// js 的限制 listCatchData[index] = data
				listCatchData: {},
				// page: 1,
				load: {},
				pageSize: 10
			};
		},
		components: {
			ListScroll,
			ListCard,
			ListItem
		},
		props: {
			tab: {
				type: Array,
				default() {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		// onLoad 在页面，created 在组件
		created() {
			// tab  还没有赋值
			// this.getList(0)
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		methods: {
			change(e) {
				const { current } = e.detail
				// console.log(this.tab[current].name)
				this.$emit('change', current)
				// 当数据不存在或者长度是 0 的情况下，才去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				// 数据的初始化
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				
				// console.log(this.page)
				this.$api.get_list({
					name: this.tab[current].name,
					// page: this.page,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					const { data } = res
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					// console.log('请求数据', data)
					// this.list = data
					// this.listCatchData[current] = data
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					// 数据的懒加载
					this.$set(this.listCatchData, current, data)
				})
			},
			loadmore () {
				if (this.load[this.activeIndex].loading === 'noMore') return 
				// this.page++
				this.load[this.activeIndex].page++
				// console.log('触发上拉')
				this.getList(this.activeIndex)
			}
		}
	}
</script>

<style lang="less">
	.home-swiper {
		// height: 100%;
		height: 950px;
		.swiper-item {
			height: 100%;
			overflow: hidden;
			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
