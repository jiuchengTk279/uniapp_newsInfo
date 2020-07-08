<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<NavBar></NavBar>
		<view v-for="(item,index) in 100" :key="index">{{ item }}</view>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	import NavBar from '@/components/navbar/navbar';
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			NavBar
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
