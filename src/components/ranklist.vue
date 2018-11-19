<template>
	<transition
	name='slide'
	>
	<musicList :title='topName' :bgImage='coverImg' :songs='list' ref='musicList'></musicList>
</transition>
</template>
	
<script type="text/javascript">
import {mapState,mapActions} from 'vuex'
import {createRankSong} from '@/common/song'
import {getTop} from '@/api'
import songList from '@/base/songList/songList'
import Scroll from '@/base/scroll'
import {listMixin} from '@/common/mixin'
import musicList from '@/components/musicList'
export default{
	mixins:[listMixin],
	data(){
		return {
			list:[]
		}
	},
	created(){
		this.getRankDetail();
		if(this.list.length==0){
			this.$router.push('/rank')
		}
	},
	computed:{
		...mapState(['topList','coverImg','topName'])
	},
	methods:{
		...mapActions(['init_player']),
		getRankDetail(){
			this.topList.forEach(song=>{
				this.list.push(createRankSong(song))
			
			})
		},
		toBottom(playList){
			let bottom=playList.length>0 ? '60px' :0;
			this.$refs.musicList.$refs.list.$el.style.bottom=bottom;
			this.$refs.musicList.$refs.list.refresh();
		}
	},
	components:{
		musicList
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter-active,.slide-leave-active
			transition all .3s
	.slide-enter,slide-leave-to
			opacity 0
			transform translate(50%,0)												
</style>