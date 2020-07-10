<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll_box">
				<view class="tab-scroll_item" v-for="(item,index) in list" :key="index" @click="clickTab(item,index)" :class="{active: activeIndex === index}">{{ item.name }} </view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<text class="iconfont icon-shezhi">&#xe781;</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// list: [],
				activeIndex: 0
			};
		},
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			clickTab(item,index) {
				// console.log(item, index)
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			},
			open() {
				uni.navigateTo({
					url:"/pages/home-label/home-label"
				})
			}
		},
		// 可以监听 data、props 值的变化
		watch: {
			tabIndex(newVal) {
				// console.log(newVal, oldVal)
				this.activeIndex = newVal
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../common/css/icon.css';
	
	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;
		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			// border: 1px solid red;
			.tab-scroll_box {
				display: flex;
				height: 45px;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				.tab-scroll_item {
					// 元素不被挤压
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
					&.active {
						color: #f07373;
					}
				}
			}
		}
		.tab-icons {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 45px;
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
			.icon-shezhi {
				font-size: 26px;
				color: #666;
			}
		}
	}
</style>
