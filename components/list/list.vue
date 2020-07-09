<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<ListItem :list="listCatchData[index]"></ListItem>
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
				listCatchData: {
					0: [],
					1: []
				}
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
				this.getList(this.activeIndex)
			}
		},
		methods: {
			change(e) {
				const { current } = e.detail
				// console.log(this.tab[current].name)
				this.getList(current)
				this.$emit('change', current)
			},
			getList(current) {
				this.$api.get_list({
					name: this.tab[current].name
				}).then(res => {
					// console.log(res)
					const { data } = res
					console.log('请求数据', data)
					// this.list = data
					// this.listCatchData[current] = data
					// 数据的懒加载
					this.$set(this.listCatchData, current, data)
				})
			}
		}
	}
</script>

<style lang="less">
	.home-swiper {
		// height: 100%;
		height: 850px;
		.swiper-item {
			height: 100%;
			overflow: hidden;
			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
