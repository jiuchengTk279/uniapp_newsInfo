<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<NavBar></NavBar>
		<Tab :list="tabList" @tab="tab" :tabIndex="tabIndex"></Tab>
		<!-- <view v-for="(item,index) in 100" :key="index">{{ item }}</view> -->
		
		<!-- <view class="scroll">
			<scroll-view scroll-y class="list-scroll">
				<view>
					<view v-for="(item,index) in 100" :key="index">{{ item }}</view>
				</view>
			</scroll-view>
		</view> -->
		
		<!-- <ListScroll>
			<ListCard mode="base"></ListCard>
			<ListCard mode="image"></ListCard>
			<ListCard mode="column"></ListCard>
		</ListScroll> -->
		
		<view class="home-list">
			<List :tab="tabList" @change="change" :activeIndex="activeIndex"></List>
		</view>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	import NavBar from '@/components/navbar/navbar.vue';
	import Tab from '@/components/tab/tab.vue'
	// import ListScroll from '@/components/list-scroll/list-scroll.vue'
	// import ListCard from '@/components/list-card/list-card.vue'
	import List from '@/components/list/list.vue'
	
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		components:{
			NavBar,
			Tab,
			// ListScroll,
			// ListCard,
			List
		},
		onLoad() {
			uni.$on('labelChange', () => {
				// console.log('首页接收到标签页的数据',res)
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		methods: {
			tab ({data, index}) {
				console.log(data, index)
				this.activeIndex = index
			},
			getLabel () {
				// 调用云函数的方法
				console.log(this.$api)
				
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					// console.log(res)
					const { data } = res
					console.log('标签', data);
					data.unshift({
						name: '全部'
					})
					
					this.tabList = data
				})
				
				// this.$api.get_label({}).then(res => {})
				// uniCloud.callFunction({
				// 	name: 'get_label',
				// }).then((res) => {
				// 	const { result } = res
				// 	this.tabList = result.data
				// 	console.log(this.tabList)
				// })
			},
			change(current) {
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值',current)
			}
		}
	}
</script>

<style lang="less">
	.page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		// border: 1px solid red;
		overflow: hidden;
		height: 100%;
		.home-list {
			flex: 1;
			box-sizing: border-box;
			// border: 1px solid red;
		}
	}
</style>
