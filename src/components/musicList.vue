<template>
  <div class="music-list">
    <div class="back" @click='back'>
      <i class="iconfont icon-fanhui fanhui"></i>
      <span class='title'>{{title}}</span>
    </div>
    <div class="bg-image" :style='image' ref='image'>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll :data="songs" class='list' ref='list' :listenScroll="listenScroll" :probeType='probeType' @scroll=scroll>
      <div class="song-list-wrapper" >
        <SongList :songs='songs' @selected='selectItem'></SongList>
      </div>
    </Scroll> 
  </div>
</template>

<script type="text/javascript">
  import SongList from '@/base/songList/songList'
  import Scroll  from '@/base/scroll'
  import {mapActions} from 'vuex'
  const Height=40;
  export default{
    props:{
      title:{
        type:String,
        default:''
      },
      bgImage:{
        type:String,
        default:''
      },
      songs:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {
        scrollY:0
      }
    },
    created(){
      this.listenScroll=true;
      this.probeType=3;
    },
    computed:{
      image(){
          return `background-image:url('${this.bgImage}')`
      }
    },
    mounted(){
      this.$refs.list.$el.style.top=this.$refs.image.clientHeight+'px';
      this.imgHeight=this.$refs.image.clientHeight;
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      scroll(pos){
        this.scrollY=pos.y;
      },
      selectItem(song,index){
        this.init_player({
          list:this.songs,
          index
        });
      },
      ...mapActions([
        'init_player',
        ]),
    },
    watch:{
      scrollY(newV){
        let fixedY=-this.imgHeight+Height;
        let maxTranslateY=Math.max(fixedY,newV);
        let scale=1,
            zIndex = 0;
        this.$refs.layer.style['transform']=`translate(0,${maxTranslateY}px)`
        if(newV<fixedY){
          zIndex =20;
          this.$refs.image.style.height=`${Height}px`;
          this.$refs.image.style.paddingTop = 0;
        }else{
          this.$refs.image.style.height=0;
          this.$refs.image.style.paddingTop = '70%';
        }
        if(newV>0){
          zIndex = 20;
          let percent=newV/this.imgHeight;
          scale=1+percent;

        }
        this.$refs.image.style['transform']=`scale(${scale})`;
        this.$refs.image.style.zIndex =zIndex;
      }
    },
    components:{
      SongList,
      Scroll
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .back
      position absolute
      height 40px
      top: 0
      left: 6px
      z-index: 50
      line-height 40px
      color #fff
      font-size 20px
      .fanhui
        font-size 20px
        padding-right 10px
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: #fff
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: #fff
      .song-list-wrapper
        padding: 0 0 0 10px
</style>