<template>
	<div class="singerList">
		<musicList :songs='list' :title="title" :bgImage='coverImg' ref='musicList'></musicList>
	</div>
	
</template>
	
<script type="text/javascript">
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import {getSingerDetail,getSongUrl} from '@/api'
import {createSearchSinger} from '@/common/song'
import {listMixin} from '@/common/mixin'
import musicList from '@/components/musicList'
export default{
	mixins:[listMixin],
	data(){
		return {
			list:[],
		}
	},
	created(){
		this.getData();
		if(!this.coverImg){
			this.$router.push('/singer')
		}
	},
	computed:{
		...mapState(['playing','coverImg','playList']),
		...mapGetters(['currentSong']),
		title(){
			if(this.list.length!=0){
				return this.list[0].singer;
			}
		}
	},
	methods:{
		getData(){
			getSingerDetail(this.$route.params.id).then(res=>{
				if(res.data.code===200){
					res.data.hotSongs.forEach(val=>{
						this.list.push(createSearchSinger(val))
					})
				}
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
	.singerList
		position fixed
		width 100%
		top 0
		bottom 0
		z-index 1000											
</style>