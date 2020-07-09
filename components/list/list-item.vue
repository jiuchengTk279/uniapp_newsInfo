<template>
	<ListScroll class="list-scroll">
		<!-- <ListCard mode="base"></ListCard>
		<ListCard mode="image"></ListCard>
		<ListCard mode="column"></ListCard>
		<ListCard mode="base"></ListCard>
		<ListCard mode="image"></ListCard>
		<ListCard mode="column"></ListCard> -->
		
		<ListCard mode="base" v-for="(item, index) in list" :key="item._id" :item="item"></ListCard>
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
			}
		}
	}
</script>

<style lang="less">
	
	.list-scroll {
		height: 100%;
	}
</style>
