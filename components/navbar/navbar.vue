<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :style="{ height: navBarHeight + 'px', width: windowWidth + 'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<!-- <uni-icons type="search"></uni-icons> -->
						<text class="iconfont icon-search"></text>
					</view>
					<view class="navbar-search_text">uniapp、vue</view>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight + navBarHeight + 'px' }"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375
			}
		},
		methods: {
			
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			// 屏幕本来的位置
			this.windowWidth = info.windowWidth
			// console.log(info)
			
			// h5 app mp-alipay 这三个平台不支持这个方法
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo)
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// console.log(navBarHeight)
			// #endif
		}
	}
</script>

<style lang="less" scoped>
	@import '../../common/css/icon.css';
	
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: #f07373;
			.navbar-content {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 15px;
				height: 45px;
				box-sizing: border-box;
				.navbar-search {
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #FFFFFF;
					.navbar-search_icon {
						// width: 10px;
						// height: 10px;
						// border: 1px solid red;
						margin-right: 10px;
						.icon-search {
							font-size: 16;
							color: #999;
						}
					}
					.navbar-search_text {
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>
