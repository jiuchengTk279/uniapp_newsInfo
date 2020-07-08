<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<NavBar></NavBar>
		<Tab :list="tabList" @tab="tab"></Tab>
		<!-- <view v-for="(item,index) in 100" :key="index">{{ item }}</view> -->
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	import NavBar from '@/components/navbar/navbar.vue';
	import Tab from '@/components/tab/tab.vue'
	
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: []
			}
		},
		components:{
			NavBar,
			Tab
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
			tab ({data, index}) {
				console.log(data, index)
			},
			getLabel () {
				// 调用云函数的方法
				console.log(this.$api)
				
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					// console.log(res)
					const { data } = res
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
			}
		}
	}
</script>

<style>

</style>
