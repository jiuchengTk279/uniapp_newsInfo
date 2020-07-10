<template>
	<view class="detail">
		<view class="detail-title">
			{{ formData.title }}
		</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">{{ formData.author.author_name }}</view>
				<view class="detail-header_content-info">
					<text>{{ formData.create_time }}</text>
					<text>{{ formData.browse_count }}浏览</text>
					<text>{{ formData.hand-thumbs_up_count }}赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<div class="detail-html">
				<!-- {{ formData.content }} -->
				<!-- 富文本渲染 -->
				<u-parse :content="formData.content" :noData="noData"></u-parse>
				<!-- rich-text，富文本渲染，但是太复杂  -->
				<!-- <rich-text></rich-text> -->
			</div>
		</view>
		<view class="detail-bottom">
			<!-- 底部左侧内容输入框 -->
			<view class="detail-bottom_input">
				<text @click="openComment">谈谈你的看法</text>
				<!-- <uni-icons type="compose" size="16" color="#f07373"></uni-icons> -->
			</view>
			<!-- 底部右侧图标 -->
			<view class="detail-bottom_icons">
				<!-- <view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
			<view class="detail-bottom__icons-box">
				<uni-icons type="heart" size="22" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons-box">
				<uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons> -->
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed="" placeholder="请输入评论的内容"></textarea>
					<view class="popup-count">{{ commentsValue.length }}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'
	
	export default {
		data() {
			return {
				formData: {},
				noData: '<p style="text-align:center;color:#666">详情加载中</p>',
				// 输入框中的值
				commentsValue: ''
			}
		},
		comments: {
			uParse
		},
		methods: {
			// 获取详情信息
			getDetail () {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const { data } = res
					this.formData = data
					console.log(res)
				})
			}
		},
		onLoad(query) {
			// popup.open() 打开弹出层
			this.$refs.popup.open()
			this.formData = JSON.parse(query.params)
			this.getDetail()
		},
		onReady() {
			// this.$refs.popup.open()
		},
		// 打开评论发布的窗口
		openComment () {
			this.$refs.popup.open()
		},
		// 关闭弹窗
		close () {
			this.$refs.popup.close()
		},
		// 发布
		submit() {
			console.log('关闭窗口')
			this.$refs.popup.close()
		}
	}
</script>

<style lang="less">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}
	
	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header__content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header__button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			color: #fff;
			background-color: #f07373;
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding:0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5ff solid;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
</style>
