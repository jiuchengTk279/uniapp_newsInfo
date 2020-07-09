<template>
	<view class="scroll">
		<scroll-view scroll-y class="list-scroll" @scrolltolower="loadmore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			loadmore() {
				console.log('触发上拉')
			}
		}
	}
</script>

<style lang="less">
	.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
