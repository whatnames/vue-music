<template>
	<div class="suggest">
		<h1 class='title'>匹配结果</h1>
		<div class="singer items" v-if='suggest.artists' @click='selectSinger(suggest.artists[0])'>
			<img :src="suggest.artists[0].img1v1Url" width='50' height='50'>
			<span class="name">歌手：{{suggest.artists[0].name}}</span>
		</div>
		<div class="gedan items" v-if='suggest.mvs'>
			<img :src="suggest.mvs[0].cover" width='50' height='50'>
			<div class="txt">
				<p>视频：{{suggest.mvs[0].name}}</p>
				<p>{{suggest.mvs[0].artists[0].name}}</p>
			</div>
		</div>
		<div class="lists">
			<ul>
				<li class='list' v-for='(song,index) in songs' @click='select(song,index)' :key='index'>
					<p class="name">{{song.name}}</p>
					<p>{{song.artists[0].name}}</p>
				</li>				
			</ul>
			<Loading v-show='query&&hasMore'></Loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getHotSearch,getSearchSuggest,getSearchSong,getSongDetail} from '@/api'
import {mapActions,mapMutations} from 'vuex'
import {createSearchSong} from '@/common/song'
import Loading from '@/base/loading/loading'
export default{
	data(){
		return {
			suggest:{},
			songs:[],
			hasMore:true,
			offset:0
		}
	},
	props:{
		query:{
			type:String,
			default:''
		}
	},
	methods:{
		...mapActions(['insertSong']),
		...mapMutations(['setCoverImg']),
		search(){
			this.hasMore=true;
			getSearchSong(this.query,this.offset).then((res)=>{
				if(!res.data.result.songs){
					this.hasMore=false;
					return
				}
				this.songs=res.data.result.songs;
			})
			this.offset+=30;
			getSearchSuggest(this.query).then(res=>{
				this.suggest=res.data.result;
			})
		},
		searchMore(){
			if(!this.hasMore){
				return 
			}
			getSearchSong(this.query,this.offset).then((res)=>{
				if(!res.data.result.songs){
					this.hasMore=false;
					return
				}
				this.songs=this.songs.concat(res.data.result.songs);
			})
			this.offset+=30;
		},
		async select(song,index){
			this.insertSong(await createSearchSong(song));
			this.$emit('select');
		},
		selectSinger(item){
			this.$router.push(`/search/singer/${item.id}`);
			this.$emit('select');
			this.setCoverImg(item.img1v1Url)
		}
	},
	watch:{
		query(newVal){
			this.suggest={},
			this.songs=[],
			this.hasMore=true,
			this.offset=0;
			if(newVal===''){
				return
			}
			this.search();
		}
	},
	components:{
		Loading
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.suggest
		width 100%
		height 100%
		margin 10px 0
		font-weight 200	
		font-size 14px
		.items
			display flex
			align-items center
			border-bottom 1px solid #e4e4e4
			padding 10px 0
			.txt
				padding 0 10px
			.name
				padding 0 10px
		.title
			font-size 14px
			margin-bottom 10px
			font-weight 200	
		.lists
			.list	
				padding 10px 0	
				border-bottom 1px solid #e4e4e4
				.name
					padding-bottom 5px
					
</style>