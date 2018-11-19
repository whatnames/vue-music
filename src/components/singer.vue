<template>
	<div class="singer" ref='singer'>
		<listview :lists='lists' :category='category' @selectSinger='gotoSingerDetail' ref='list'></listview>
    <router-view></router-view>
	</div> 
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import listview from '@/base/listview'
import {getSingerList} from '@/api'
import Scroll from '@/base/scroll'
import {listMixin} from '@/common/mixin'
const pinyin=require('pinyin')
export default {
  mixins:[listMixin],
  data(){
  	return {
  		lists:[],
  		category:[]
  	}
  },
  computed:{
    ...mapState(['playList'])
  },
  created(){
  	this._getData();
  },
  methods:{
    ...mapMutations(['setCoverImg']),
  	_getData(){
  		getSingerList().then(res=>{
  			this.lists=this.normalize(res.data.list.artists);
  			this.category=this.lists.map(val=>val.title.slice(0,1))
  		})
  	},
  	normalize(list){
  		let data={
  			hot:{
  				title:'热门',
  				items:[]
  			}
  		};
  		list.forEach((val,index)=>{
  			let letter=pinyin(val.name.charAt(0),{
  				style:pinyin.STYLE_FIRST_LETTER
  			})[0][0];
  			if(val.name.charAt(0)=='蔡'){
  				letter='c'
  			}
  			val.category=letter.toUpperCase();
  			if(index<10){
  				data.hot.items.push({
  					id:val.id,
  					img:val.img1v1Url,
  					name:val.name
  				})
  			}
  			let key=val.category;
  			if(!data[key]){
  				data[key]={
  					title:key,
  					items:[]
  				}
  			}
  			data[key].items.push({
  				id:val.id,
  				img:val.img1v1Url,
  				name:val.name
  			});
  		})
  		let first=[],
  			last=[];
  		for(let key in data){
  			let val=data[key];
  			if(val.title!=='热门'){
  				last.push(val);
  				last.sort((a,b)=>{
  					return a.title.charCodeAt(0)-b.title.charCodeAt(0);
  				})
  			}else{
  				first.push(val)
  			}
  		}
  		return first.concat(last)
  	},
    gotoSingerDetail(item){
      this.$router.push(`/singer/${item.id}`);
      this.setCoverImg(item.img)
    },
    toBottom(playList){
      let bottom=0;
      playList.length>0?bottom='65px':0;
      this.$refs.singer.style.bottom=bottom;
      this.$refs.list.$refs.scroll.refresh();
    }
  },
  components:{
    listview,
    Scroll
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped="scoped">
.singer
  position fixed
  top 93px
  bottom 0
  width 100%
  z-index 1000
</style>