<template>
	<ul class="switches" :style='{background:bgcolor}'>
	  <li class="switch-item"
	  v-for="(item, index) in switches"
	  :key="index"
	  :class="{'active': currentIndex === index}"
	  @click='selectItem(index)'
	  >
	    <span>{{item.title}}</span>
	  </li>
	</ul>
</template>

<script type="text/javascript">
	export default{
		props:{
			switches:{
				type:Array
			},
			currentIndex:{
				type:Number,
				default:0
			},
			bgcolor:{
				type:String,
				default:'blue'
			}
		},
		methods:{
			selectItem(index){
				this.$emit('switch',index);
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.switches
		width 250px
		margin 0 auto
		height 100%
		display flex
		align-items center
		color #fff	
		.switch-item
			flex 1
			text-align center
			span
				padding-bottom 8px
			&.active
				span
					border-bottom 2px solid #fff
						
</style>