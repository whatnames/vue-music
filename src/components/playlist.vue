<template>
	<transition name='slide'>
		<div class="playlistwrapper" v-show='show' @click='close'>
			<div class='playlist' @click.stop>
				<div class="header">
					<i class='iconfont icon-next' @click='changeMode'></i>
					<span class='text'>{{text_mode}}</span>
					<i class="iconfont icon-clear" @click='clear'></i>
				</div>
				<Scroll class="lists" ref='lists'>
					<ul>
						<li v-for='(item,index) in orderList' @click='selectItem(item,index)'>
							<i :class='getStyle(item,index)'></i>
							<span class="text">{{item.name}}</span>
							<i class="iconfont icon-del2" @click.stop='del(item,index)'></i>
						</li>					
					</ul>
				</Scroll>
				<p class='close' @click.stop='close'>关闭</p>
			</div>
			<Confirm :title='confrimTitle' ref='confirm' @confirm='del_list'></Confirm>	
		</div>
	</transition>
</template>

<script type="text/javascript">
	import Scroll from '@/base/scroll'
	import Confirm from '@/base/confirm'
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import {shuffle} from '@/common/shuffle'
	export default{
		data(){
			return {
				show:false,
				confrimTitle:'是否清空播放列表？'
			}
		},
		computed:{
			...mapState(['orderList','mode','playList','playing','index']),
			...mapGetters(['currentSong']),
			text_mode(){
				if(this.mode==0){
					return `顺序播放(${this.orderList.length})`
				}
				if(this.mode==1){
					return `单曲循环`
				}
				if(this.mode==2){
					return `随机播放(${this.orderList.length})`
				}

			}
		},
		methods:{
			...mapMutations(['setIndex','setPlaying','setPlayList','setMode','setOrderList']),
			...mapActions(['empty_list','del_one']),
			showlist(){
				this.show=true;
				this.$nextTick(()=>{
					this.$refs.lists.refresh();
				})
			},
			clear(){
				this.$refs.confirm.show();
			},
			close(){
				this.show=false;
			},
			del(item,index){
				this.del_one({item,index});
				if(this.playList.length==0){
					this.close();
				}
			},
			del_list(){
				this.empty_list();
				this.close();
			},
			getStyle(item,index){
				if(item.id==this.currentSong.id){
					return 'iconfont icon-shengyinyinliangxianxing voice'
				}
				return ''
			},
			selectItem(item,index){
				if(this.mode==2){//随机播放
					index=this.playList.findIndex((val)=>val.id==item.id);
				}
				this.setIndex(index);
				if(!this.playing){
					this.setPlaying(true);
				}
			},
			changeMode(){
				let mode=this.mode;
				mode=(++mode)%3;
				let list=null;
				let index=this.index;
				if(mode==2){
					list=shuffle(this.orderList);
					index=list.findIndex((val)=>val.id==this.currentSong.id)
				}else{
					list=this.orderList;
				}
				this.setPlayList(list);
				this.setIndex(index);
				this.setMode(mode);
			}
		},
		components:{
			Scroll,
			Confirm
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter,.slide-leave-to
	 opacity 0
	.playlist
		transform translate(0,100%)
.slide-enter-active,slide-leave-active
	transition opacity 0.4s
	.playlist
		transition transform 0.4s
.playlistwrapper
	position fixed
	top 0
	bottom 0
	width 100%
	background-color rgba(0,0,0,0.1)
	z-index 1500
	.playlist
		position absolute
		bottom 0
		width 100%
		border-radius 10px
		background white
		.header
			padding 10px 20px
			display flex
			align-items center
			.text
				padding 0 10px 0
				flex 1
		.close
			text-align center
			line-height 40px
			height 40px
			background-color #F7F7F7
		.lists
			padding 0 20px
			max-height 200px
			overflow hidden
			li
				display flex
				align-items center
				padding-bottom 10px
				.voice
					color red
				.text
					flex 1
					padding-left 10px
				
</style>