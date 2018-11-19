<template>
  <Scroll class="recommend" ref='demo'>
    <div>
      <Banner></Banner>
      <div class="remd-songs">
        <span class="title-des">推荐歌单</span>
        <div class="list-wrapper">
          <div class="remd_list" v-for='(list,index) in remd_lists' :key='index'>
            <div class="remd_img">
              <img :src="list.picUrl" alt="" width="105" height="105">
            </div>
            <p class="remd_text">{{list.name}}</p>
          </div>
        </div>
      </div>
      <SongList 
      :songs='songs' 
      :title-des="'最新音乐'"
      @selected='selected'
      ></SongList>
    </div>
  </Scroll>  
</template>

<script> 
import Scroll from '@/base/scroll'
import {mapState,mapMutations,mapActions} from 'vuex'
import Banner from '../banner' 
import {getRecommend,getNewsong,getSongUrl} from '@/api'
import SongList from '@/base/songList/songList'
import {createSong} from '@/common/song'
import {listMixin} from '@/common/mixin'
export default {
  mixins:[listMixin],
  data(){
    return {
      remd_lists:[],
      songs:[]
    }
  },
  created(){
    this.init(); 
  },
  mounted(){
    
  },
  computed:{
    ...mapState(['playList']),
  },
  methods:{
    ...mapActions(['init_player']),
    init(){
      getNewsong().then(res=>{
        if(res.data.code==200){
          this.nomalize(res.data.result);
        }
      });
      getRecommend().then(res=>{
       if(res.data.code==200){
        let resultArr=res.data.result;
        this.remd_lists=resultArr.slice(0,6);
       }
      });

    },
    nomalize(arr){
      arr.forEach((val)=>{
        this.songs.push(createSong(val.song))
      })
    },
    selected(song,index){
      this.init_player({list:this.songs,index});
    },
    toBottom(){
      let bottom=0;
      this.playList.length>0?bottom='65px':0;
      this.$refs.demo.$el.style.bottom=bottom;
      this.$refs.demo.refresh();
    }
  },
  components:{
    Banner,
    SongList,
    Scroll
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend
    background #FCFCFD
    width 100%
    position fixed
    bottom 0
    top 93px
    overflow hidden
</style>