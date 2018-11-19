<template>
  <div class='rankContent'>
  <Scroll class="rank"  ref='rank'>
    <ul class='toplist'>
      <li class="item" v-for='item in topList' @click='goRankList(item)'>
        <div class="icon">
          <img :src="item.coverImgUrl" width='100%' height='100%'>
        </div>
        <ul class="songlist">
          <li class='song' v-for='(song,index) in item.top'>
            <span>{{index+1}}.</span>
            <span class='a'>{{song.name}}-{{song.ar[0].name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
  <router-view></router-view>
</div>
</template>

<script>
import {getTop} from '@/api'
import Scroll from '@/base/scroll'
import {mapMutations,mapState} from 'vuex'
import {listMixin} from '@/common/mixin'
const topListType=[0,1,2,3,4,5,6,14,15,23,20,17]
export default {
  mixins:[listMixin],
  data(){
  	return {
      topList:[]
  	}
  },
  created(){
    this.getTopList();
  },
  computed:{
  
  },
  mounted(){

  },
  methods:{
    ...mapMutations(['setTopList','setCoverImg','setTopName']),
    getTopList(){
      topListType.forEach(val=>{
        getTop(val).then(res=>{
          let list=res.data.playlist;
          list.top = res.data.playlist.tracks.slice(0, 3);
          this.topList.push(list);
        })
      })
    },
    goRankList(item){
      this.$router.push(`/rank/${item.id}`);
      this.setTopList(item.tracks);
      this.setTopName(item.name);
      this.setCoverImg(item.coverImgUrl);
    },
    toBottom(){
      let bottom=0;
      this.playList.length>0?bottom='65px':0;
      this.$refs.rank.$el.style.bottom=bottom;
      this.$refs.rank.refresh();
    }
  },
  components:{
    Scroll
  },
  watch:{

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.rank
  position fixed
  width 100%
  top 93px
  bottom 0
  background #F7F7F7
  overflow hidden
  .item
    display flex
    height 100px
    border-bottom 1px solid #e4e4e4
    padding 5px 0
    margin 0 12px
    .icon
      flex 0 0 100px
      width 100px
      height 100px
      img
        border-radius 3px
    .songlist
      flex 1
      display flex
      flex-direction column
      justify-content center
      padding 0 6px
      .song 
        border none
        width 90%
        height 30px
        line-height 30px
        font-size 12px
        white-space nowrap
        text-overflow ellipsis
        overflow hidden         
</style>