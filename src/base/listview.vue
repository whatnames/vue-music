<template>
	<Scroll class="listview" ref='scroll' @scroll='scroll' :probeType='3'>
		<ul>
			<li class="list" v-for='list in lists' ref='lists'>
				<h2>{{list.title}}</h2>
				<ul>
					<li class="list-item" v-for='item in list.items' @click='selectItem(item)'>
						<img class='img' :src="item.img" width='50' height='50'>
						<span>{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<ul class="right_bar" @touchstart='start' @touchmove='move'>
			<li class="title" 
			v-for='(val,index) in category' 
			:class='{current:currentIndex===index}'
			:data-index='index'
			>{{val}}</li>
		</ul>
	</Scroll>
</template>
<script type="text/javascript">
	import Scroll from '@/base/scroll'
	const CATEGORY_HEIGHT=20
	export default{
		props:{
			lists:{
				type:Array,
				default:()=>[]
			},
			category:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return {
				currentIndex:0,
				scrollY:0,
				listsHeight:[]
			}
		},
		created(){
			this.touch={}
		},
		methods:{
			a(){
				console.log(1)
			},
			start(e){
				this.touch.y1=e.touches[0].pageY;
				this.touch.index=parseInt(e.target.getAttribute('data-index'));
				this.$refs.scroll.scrollToElement(this.$refs.lists[this.touch.index]);
				this.currentIndex=this.touch.index;
			},
			move(e){
				let index=(e.touches[0].pageY-this.touch.y1)/CATEGORY_HEIGHT | 0;
				let num=index+this.touch.index;
				if(num>21){num=21}
				if(num<0){num=0}
				this.currentIndex=num;
				this.$refs.scroll.scrollToElement(this.$refs.lists[num],0);
			},
			scroll(pos){
				this.scrollY=pos.y;
			},
			calculateHeight(){
				let height=0;
				this.listsHeight.push(height);
				this.$refs.lists.forEach(val=>{
					height+=val.offsetHeight;
					this.listsHeight.push(height);
				})
			},
			selectItem(item){
				this.$emit('selectSinger',item)
			},
		},
		watch:{
			scrollY(newv){
				this.listsHeight.forEach((val,index,arr)=>{
					if(newv>0){
						this.currentIndex=0;
						return
					}
					if(-newv>val&&-newv<arr[index+1]){
						this.currentIndex=index;
					}
				})
			},
			lists(){
				this.$nextTick(()=>{
					this.calculateHeight();
				})
			}
		},
		components:{
			Scroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.listview
		width 100%
		height 100%
		overflow hidden
		background #f7f7f7
		.list
			h2
				font-size 13px
				font-weight 400
				color #888888
				background #EEEEEE
				padding-left 20px
			.list-item
				display flex
				align-items center
				margin 10px 0 0 10px
				padding-bottom 10px
				border-bottom 1px solid #e4e4e4
				.img
					border-radius 3px
					padding-right 20px
		.right_bar
			position absolute
			top 50%
			right 5px
			transform translateY(-50%)
			.title
				font-size 11px
				padding 2px 0
				font-weight 700
				color #757575
				text-align center
				&.current
					color red
			
</style>