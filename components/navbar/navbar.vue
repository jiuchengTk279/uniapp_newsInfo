<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :class="{search: isSearch}" :style="{ height: navBarHeight + 'px', width: windowWidth + 'px'}" @click.stop="open">
				<view v-if="isSearch" class="navbar-content_search-icons" @click="back">
					<text class="iconfont">&#xe612;</text>
				</view>
				<!-- 不在搜索页 -->
				<view class="navbar-search" v-if="!isSearch">
					<view class="navbar-search_icon">
						<!-- <uni-icons type="search"></uni-icons> -->
						<text class="iconfont icon-search"></text>
					</view>
					<view class="navbar-search_text">uniapp、vue</view>
				</view>
				<!-- 在搜索页 -->
				<view class="navbar-search" v-else>
					<!-- 搜索页显示内容 -->
					<input class="navbar-search_text" v-model="value" type="text" placeholder="请输入您要搜索的内容" @input="inputChange"/>
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
				windowWidth: 375,
				val: ''
			}
		},
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ''
			}
		},
		watch: {
			value(newValue) {
				this.val = newValue
			}
		},
		methods: {
			open() {
				// 如果在搜索页，就不跳转
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			inputChange (e) {
				const value = e.detail
				console.log(value)
				this.$emit('input', value)
			},
			back() {
				// this.$router.back()
				uni.switchTab({
					url: '../../pages/tabbar/index/index'
				})
			}
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
				.navbar-content_search-icons {
					font-size: 24;
					color: #fff;
					font-weight: 800;
					margin-left: 10px;
					margin-right: 10px;
				}
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
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search {
					padding-left: 0;
					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
