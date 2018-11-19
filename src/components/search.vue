<template>
	<div class="search">
		<div class="search-wrapper">
			<SearchBox @query=getQueryVal ref='box'></SearchBox>
			<span class='back' @click='back'>取消</span>
		</div>
		<Scroll class="search-content" v-show='queryVal' @scrollToEnd='scrollToEnd' :pullUp='true'>
			<div>
				<Suggest :query='queryVal' ref='suggest' @select='save_history'></Suggest>
			</div>
		</Scroll>
		<div class="hot-search">
			<p class="title">热门搜索</p>
			<ul>
				<li class='item' v-for='(hot,index) in hotSearch' :key='index' @click='hot_to_search(hot.first)'>{{hot.first}}</li>
			</ul>
		</div>
		<Scroll class="search-history" ref='history'>
			<div>
			<p class="title">
				<span class="des">搜索历史</span>
				<i class="iconfont icon-clear" @click='show_confirm'></i>
			</p>
			<ul>
				<li class="item" v-for='(item,index) in searchHistory' @click='search(item)'>
					<span class='songname'>{{item}}</span>
					<i class='iconfont icon-del2' @click.stop='remove(item)'></i>
				</li>			
			</ul>
			</div>
		</Scroll>
		<confirm ref='confirm' @confirm='delateAll'></confirm>
		<router-view></router-view>		
	</div>
</template>

<script type="text/javascript">
import SearchBox from '@/base/search-box/search-box'
import Suggest from '@/components/suggest'
import Scroll from '@/base/scroll'
import {getHotSearch} from '@/api'
import {save_search_history,removeItem,removeAll} from '@/common/cache'
import {mapMutations,mapState} from 'vuex'
import confirm from '@/base/confirm'
import {listMixin} from '@/common/mixin'
export default{
	mixins:[listMixin],
	data(){
		return {
			hotSearch:[],
			queryVal:'',
		}
	},
	created(){
		this.getHotSearch();
	},
	computed:{
		...mapState(['searchHistory'])
	},
	methods:{
		...mapMutations(['setSearchHistory']),
		back(){
			this.$router.push('/recommend');
		},
		getHotSearch(){
			getHotSearch().then(res=>{
				this.hotSearch=res.data.result.hots;
			})
		},
		getQueryVal(queryVal){
			this.queryVal=queryVal;
		},
		scrollToEnd(){
			console.log('end')
			this.$refs.suggest.searchMore();
		},
		hot_to_search(val){
			this.$refs.box.add(val);
		},
		save_history(){
			let history=save_search_history(this.queryVal);
			this.setSearchHistory(history);
		},
		remove(item){
			let history=removeItem(item);
			this.setSearchHistory(history);
		},
		show_confirm(){
			this.$refs.confirm.show();
		},
		delateAll(){
			removeAll();
			this.setSearchHistory([]);
		},
		toBottom(){
		  let bottom=0;
		  this.playList.length>0?bottom='65px':0;
		  this.$refs.history.$el.style.bottom=bottom;
		  this.$refs.history.refresh();
		},
		search(item){
			this.$refs.box.add(item);
		}
	},
	watch:{
	},
	components:{
		SearchBox,
		Suggest,
		Scroll,
		confirm
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.search
		position fixed
		width 100%
		top 0
		bottom 0
		z-index 100
		background #F7F7F7
		.search-wrapper
			display flex
			align-items center
			padding 10px
			.back
				display block
				font-size 16px
				width 40px
				margin-left 5px
		.hot-search
			padding 10px 20px
			ul li
				border 1px solid #cccc
				display inline-block
				margin 3px 5px
				padding 5px
				border-radius 5px
		.search-content
			position fixed
			top 52px
			padding 5px 15px
			bottom 0
			width 100%
			background #f7f7f7
			overflow hidden
			z-index 1000
		.search-history
			position absolute
			width 100%
			top 280px
			bottom 0
			overflow hidden 
			div
				padding 10px 20px
			.item
				display flex 
				align-items center
				margin 8px 0
				.songname
					flex 1
			.title
				display flex
				align-items center
				.des
					flex 1

</style>