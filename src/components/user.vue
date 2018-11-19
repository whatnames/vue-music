<template>
	<transition name='slide'>
		<div class='user'>
			<div class="tabwrapper">
				<i class="iconfont icon-fanhui icon" @click='back'></i>
				<Tab :currentIndex='currentIndex' :switches='switches' @switch='go'></Tab>
			</div>
			<div class="playall">
				<i class='iconfont icon-bofang bofang'></i>
				<span class='text'>播放全部(共{{count}}首)</span>
			</div>
			<div class="content" ref='content'>
				<Scroll class='scroll' v-if='currentIndex==0' ref='favorate_scroll'>
					<div>
						<songList :songs='favorate_songs' @selected='play' v-if='favorate_songs.length'></songList>
					</div> 
				</Scroll>
				<Scroll class='scroll' v-if='currentIndex==1' ref='playHistory_scroll'>
					<div>
						<songList :songs='playHistory' v-if='playHistory.length' @selected='play'></songList>
					</div>
				</Scroll>
			</div>
			<div class="no_result" v-if='if_result'>
				{{msg}}
			</div>		
		</div>
	</transition>
</template>

<script type="text/javascript">
	import Tab from '@/base/tab'
	import songList from '@/base/songList/songList'
	import {mapState,mapActions} from 'vuex'
	import Scroll from '@/base/scroll'
	import Song from '@/common/song'
	import {listMixin} from '@/common/mixin'
	export default{
		mixins:[listMixin],
		data () {
		  return {
		    currentIndex: 0,
		    switches: [
		      {title: '我的收藏'},
		      {title: '最近播放'}
		    ]
		  }
		},
		computed:{
			...mapState(['favorate_songs','playHistory']),
			count(){
				if(this.currentIndex==0){
					return this.favorate_songs.length;
				}else{
					return this.playHistory.length;
				}
			},
			msg(){
				if(this.currentIndex==0){
					return '你还没有收藏过歌曲！'
				}else{
					return '你还没有听过歌！'
				}
			},
			if_result(){
				if(this.currentIndex==0){
					return !this.favorate_songs.length
				}else{
					return !this.playHistory.length
				}
			}
		},
		methods:{
			...mapActions(['insertSong']),
			go(index){
				this.currentIndex=index;
			},
			back(){
				this.$router.back();
			},
			play(song,index){
				this.insertSong(new Song(song))
			},
			toBottom(playlist){
				let bottom=playlist.length>0 ? '65px' : 0;
				this.$refs.content.style.bottom=bottom;
				this.$refs.favorate_scroll&&this.$refs.favorate_scroll.refresh();
				this.$refs.playHistoryt_scroll&&this.$refs.playHistory_scroll.refresh();
			}

		},
		components:{
			Tab,
			songList,
			Scroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter,slide-leave-to
		opacity 0
		transform translate(100%,0)
	.slide-enter-active,slide-leave-active
		transition all .5s
	.user
		position fixed
		top 0
		bottom 0
		width 100%
		z-index 1000
		.playall
			background #f7f7f7
			display flex
			align-items center
			height 40px
			border-bottom 1px solid #e4e4e4
			.bofang
				font-size 25px
				padding 0 10px
		.content
			position absolute
			width 100%
			top 91px
			bottom 0
			.scroll
				height 100%
				overflow hidden
		.no_result
			position absolute
			top 91px
			bottom 0
			width 100%
			color blue
			display flex
			align-items center
			justify-content center
		.tabwrapper
			height 50px
			background blue
			.icon
				position absolute
				top 10px
				left 10px
				color #fff
				font-size 20px
</style>