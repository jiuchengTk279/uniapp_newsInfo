<template>
	<view class="label">
		<!-- 我的标签 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content_item" v-for="(item,index) in labelList" :key="item._id">{{ item.name }}
				<text class="iconfont icons-close" v-if="is_edit" @click="del(index)">&#xe608;</text>
				</view>
				<view class="no-data" v-if="labelList.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
		
		<!-- 推荐标签 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content_item" v-for="(item,index) in list" :key="item._id">{{ item.name }}
				<text class="iconfont icons-close" v-if="is_edit" @click="add(index)">&#xe645;</text>
				</view>
				<view class="no-data" v-if="list.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
			<!-- <button type="default" @click="emit">发送事件</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: false
			}
		},
		onLoad() {
			// 自定义事件， uni.$emit() 是全局的自定义事件
			// this.$emit()   uni.$emit()
			// 自定义事件只能在打开的页面触发
			this.getLabel()
		},
		methods: {
			editLabel() {
				// this.is_edit = !this.is_edit
				// is_edit 为 true，表示正在编辑
				if (this.is_edit) {
					this.is_edit = false
					this.setUpdateLabel(this.labelList)
				} else {
					this.is_edit = true
				}
			},
			getLabel() {
				this.loading = true
				this.$api.get_label({
					type: 'all'
				}).then((res) => {
					// console.log(res)
					const { data } = res
					// current 为 true 的数据
					this.labelList = data.filter(item => item.current)
					// current 为 false 的数据
					this.list = data.filter(item => !item.current)
					this.loading = false
				})
			},
			del (index) {
				if (!this.is_edit) return
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			add (index) {
				if (!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			setUpdateLabel(label) {
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				uni.showLoading()
				console.log(newArrIds)
				this.$api.update_label({
					label
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: none
					})
					// console.log(res)
					uni.$emit('labelChange')
				})
			},
			// emit () {
			// 	uni.$emit('labelChange', 'uni-app')
			// }
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f5f5f5;
	}
	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
						font-size: 20px;
						color: red;
					}
				}
			}
		}
	}
	
	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
