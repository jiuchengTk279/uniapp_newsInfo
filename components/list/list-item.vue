<template>
	<ListScroll class="list-scroll" @loadmore="loadmore">
		<!-- <ListCard mode="base"></ListCard>
		<ListCard mode="image"></ListCard>
		<ListCard mode="column"></ListCard>
		<ListCard mode="base"></ListCard>
		<ListCard mode="image"></ListCard>
		<ListCard mode="column"></ListCard> -->
		
		<ListCard mode="base" v-for="(item, index) in list" :key="item._id" :item="item"></ListCard>
		<uni-load-more iconType="snow" status="load.loading" v-if="list.length=== 0 ||  list.length > 9"></uni-load-more>
	</ListScroll>
</template>

<script>
	import ListScroll from '../list-scroll/list-scroll.vue'
	import ListCard from '../list-card/list-card.vue'
	
	export default  {
		components: {
			ListCard,
			ListScroll
		},
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			load: {
				type: Object,
				default() {
					return {
						loading: 'loading'
					}
				}
			}
		},
		methods: {
			loadmore() {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="less">
	
	.list-scroll {
		height: 100%;
	}
</style>
