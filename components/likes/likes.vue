<template>
	<view class="icons" @click.stop="likeTap">
		<text class="iconfont icon-shoucang">&#xe60d;</text>
		<!-- <uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				like: false
			};
		},
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		watch: {
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods: {
			likeTap() {
				this.like = !this.like
				this.setUpdateLikes()
				console.log('点击收藏成功')
			},
			setUpdateLikes() {
				uni.showLoading()
				this.$api.update_likes({
					user_id: '5e76254858d922004d6c9cdc',
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: this.like?'收藏成功':'取消收藏',
						icon: 'none'
					})
					console.log(res)
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="less">
.icons {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		// border: 1px solid red;
		.icon-shoucang {
			font-size: 20px;
			color: #f07373;
		}
	}
</style>
