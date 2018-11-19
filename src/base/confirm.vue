<template>
	<transition name='fade'>
		<div class="confirm" v-show='is_show' @click.stop='hide'>
			<div class="wrapper" @click.stop>
				<div class="content">
					<p class="title">{{title}}</p>
					<div class="control">
						<span class="item" @click='cancel'>{{cancelText}}</span>
						<span class="item" @click='confirm'>{{confirmText}}</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{
		props:{
			title:{
				type:String,
				default:'是否清空历史记录？'
			},
			cancelText:{
				type:String,
				default:'取消'
			},
			confirmText:{
				type:String,
				default:'确定'
			}
		},
		data(){
			return {
				is_show:false
			}
		},
		methods:{
			show(){
				this.is_show=true;
			},
			hide(){
				this.is_show=false;
			},
			cancel(){
				this.hide();
				this.$emit('cancel');
			},
			confirm(){
				this.hide();
				this.$emit('confirm');
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.confirm
		position fixed
		top 0
		bottom 0
		width 100%
		background-color rgba(0,0,0,.3)
		&.fade-enter-active
			animation fadeIn .3s	
			.content
				animation zoomIn .3s
		.wrapper
			width 80%
			position absolute
			top 50%
			left 50%
			transform translate(-50%,-50%)
			.content
				background white
				border-radius 5px
				.title 
					text-align center
					padding 15px 0
				.control
					display flex
					padding 10px 0
					.item
						flex 1
						text-align center
						color red	
	@keyframes fadeIn
		0%
			opacity 0
		100%
			opacity 1	
	@keyframes zoomIn
		0%
			transform scale(0)
		50%
			transform scale(1.1)	
		100%
			transform scale(1)				
</style>