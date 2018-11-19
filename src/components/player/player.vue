<template>
  <div class="player_wrapper">
    <playList ref='playlist'></playList>
    <audio 
    ref='audio'
    @timeupdate='time'
    @ended='ended'
    @play='ready'
    ></audio>
    <transition 
    enter-active-class='animated jackInTheBox'
    leave-active-class='animated zoomOut'
    >
      <div class='player' ref='player' v-show='playList.length>0&&fullPage'>
          <div class="filterbg">
            <img :src="`${currentSong.image}`"  alt="" width='100%' height='100%'>
          </div>
          <div class="top">
            <i class="back" @click='back'>
              <img src="./back.svg" alt="" width="100%" height='100%'>
            </i>
            <h1 class="name">{{currentSong.name}}</h1>
            <p class="singer">{{currentSong.singer}}</p>
          </div>
          <div class="middle"  @click='lyric_show=!lyric_show'>
            <div class="cd" v-show='!lyric_show'>
              <img :src="`${currentSong.image}`" alt="" width='100%' height='100%' class='img' :class='cdRotateClass'>
              <p class="lyric_p">{{txt}}</p>
            </div>
            <transition 
            enter-active-class='animated rubberBand'
            >
            <Scroll class="lyric_wrapper" v-show='lyric_show' :data='currentLyric&&currentLyric.lines' ref='scroll'>
              <div>
                <div v-if='currentLyric'>
                  <p class="list"
                   v-for='(line,index) in currentLyric.lines'
                  :class='{current:current_lineNum==index}'
                  ref='list'
                  >{{line.txt}}</p>
                </div>
              </div>
              <div class='no_lyric' v-show='no_lyric'>
                  暂无歌词！
              </div>
            </Scroll>
          </transition>
          </div>
          <div class="bottom">
            <div class="barWrapper">
              <span class='time_progress'>{{format(curretTime)}}</span>
              <progressBar
               :progress='progress' 
               @click_change_time='change_time'
               @drag_change_time='change_time'
              ></progressBar>
              <span class='time_duration'>{{format(currentSong.duration/1000)}}</span>
            </div>
            <div class="cotrol">
            <i :class="modeClass" @click='toggleMode'></i>
            <i class="prev" @click='prev'></i>
            <i :class="playingClass" @click='togglePlayState'></i>
            <i class="next" @click='next'></i>
            <i :class='collect_class' @click='toggle_collect'></i>
            </div>
          </div>
      </div> 
    </transition>
    <transition
    enter-active-class='animated flipInX'
    leave-active-class='animated flipOutX'
    >
      <div class="mini_player" v-show='playList.length>0&&!fullPage' @click='closeMini'>
      <div class="icon-image">
        <img :src="currentSong.image" :class='cdRotateClass' width='100%' height='100%'>
      </div>
      <div class="text_msg">
        <h1 class="name">{{currentSong.name}}</h1>
        <p class="singer">{{currentSong.singer}}</p>
      </div>
      <div class="play_btn">
        <i :class='playingClass' @click.stop='togglePlayState'></i>
      </div>
      <div class="list">
        <i class='mode-list' @click.stop='showList'></i>
      </div>
    </div>
    </transition>       
  </div>
 
</template>

<script>
import Scroll from '@/base/scroll'
import progressBar from '@/base/progress-bar'
import playList from '@/components/playlist'
import Lyric from 'lyric-parser'
import {getLyric,getSongUrl} from '@/api'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import {shuffle} from '@/common/shuffle'
import {set_collect_history,remove_collect_one,set_play_history} from '@/common/cache'
export default {
  data(){
    return {
     curretTime:0,
     canplay:false,
     currentLyric:null,
     current_lineNum:0,
     txt:'',
     lyric_show:false,
     no_lyric:false
    }
  },
  computed:{
    ...mapState(['playList','orderList','fullPage','playing','mode','index','favorate_songs']),
    ...mapGetters(['currentSong']),
    playingClass(){
      return this.playing ? 'pause' :  'play'
    },
    modeClass(){
      switch (this.mode) {
        case 0:
          return 'mode-list'
          break;
        case 1:
          return 'mode-loop'
        case 2:
          return 'mode-random'
      }
    },
    cdRotateClass(){
      return this.playing ? 'playing' :'playing paused'
    },
    progress(){
      return this.curretTime/(this.currentSong.duration/1000)
    },
    collect_class(){
      if(this.isLike(this.currentSong)){
        return 'loving'
      }else{
        return 'love'
      }
      
    }
  },
  methods:{
    ...mapMutations(['setFullPage','setPlaying','setMode','setIndex','setPlayList','setFavorateSongs','setPlayHistory']),
    isLike(song){
      return this.favorate_songs.some((item)=>item.id==song.id)
    },
  	back(){
  		this.setFullPage(false);
  	},
    togglePlayState(){
      this.setPlaying(!this.playing);
      if(this.currentLyric){
        this.currentLyric.togglePlay();
      }
    },
    toggleMode(){
      let num=this.mode;
      let mode=(++num)%3;
      this.setMode(mode);
      let list=null;
      if(this.mode==2){//随机播放
        list=shuffle(this.orderList);
      }else{
        list=this.orderList;
      }
      let song=this.currentSong;
      this.setPlayList(list);
      this.normalIndex(song);
      if(!this.playing){
        this.setPlaying(true);
      }
    },
    normalIndex(song){
      let index=this.playList.findIndex(val=>val==song);
      this.setIndex(index);
    },
    ready(){
      this.canplay=true;
      let arr=set_play_history(this.currentSong);
      this.setPlayHistory(arr);
    },
    prev(){
      if(!this.canplay){
        return 
      }
      if(this.playList.length==1){
        this.loop();
        return 
      }
      let index=this.index;
      index= --index<0 ? this.playList.length-1 : index;
      this.setIndex(index);
      if(!this.palying){
        this.setPlaying(true);
      }
      this.canplay=false;
    },
    next(){
      if(!this.canplay){
        return
      }
      if(this.playList.length==1){
        this.loop();
        return 
      }
      let index=this.index;
      index= ++index>this.playList.length-1 ? 0 :index;
      this.setIndex(index);
      if(!this.palying){
        this.setPlaying(true);
      }
      this.canplay=false;
  

    },
    loop(){
      this.$refs.audio.currentTime=0;
      if(this.currentLyric){
        this.currentLyric.seek(0);
      }
      this.$refs.audio.play();
    },
    toggle_collect(){
      if(!this.isLike(this.currentSong)){
        let arr=set_collect_history(this.currentSong);
        this.setFavorateSongs(arr);
      }else{
        console.log('not_like')
        let arr=remove_collect_one(this.currentSong);
        this.setFavorateSongs(arr);
      }
    },
    closeMini(){
      this.setFullPage(true);
    },
    time(e){
      this.curretTime=e.target.currentTime;
    },
    format(val){
      let time=val|0;
      let minute=(time/60)|0;
      let second=time%60;
      if(second.toString().length<2){
        second='0'+second;
      }
      return `${minute}:${second}`;
    },
    change_time(percent){
      this.$refs.audio.currentTime=percent*(this.currentSong.duration/1000);
      if(!this.playing){
        this.setPlaying(true);
      }
      if(this.currentLyric){
        this.currentLyric.seek(this.$refs.audio.currentTime*1000)
      }
    },
    ended(){
      if(this.mode==1){//单曲循环
        this.$refs.audio.currentTime=0;
        if(this.currentLyric){
          this.currentLyric.seek(0);
        }
        this.$refs.audio.play();
      }else{
        this.next();
      }
    },
    showList(){
      this.$refs.playlist.showlist();
    },
    get_Lyric(song){
      song.getLyric().then(res=>{
        this.no_lyric=false;
        this.currentLyric=new Lyric(res,({lineNum,txt})=>{
          this.current_lineNum=lineNum;
          this.txt=txt;
          if(lineNum>4){
            let index=lineNum-4;
            this.$refs.scroll.scrollToElement(this.$refs.list[index],1000)
          }else{
            this.$refs.scroll.scrollTo(0,0,1000)
          }
        });
        if(this.playing){
          this.currentLyric.play();
        }
      }).catch(e=>{
        this.no_lyric=true;
        this.txt='暂无歌词！'
      })
    },
    getUrl(song){
      getSongUrl(song.id).then(res=>{
        let url=res.data.data[0].url;
        if(!url){
          this.canplay=true;
          this.next();
          return
        }
        this.$refs.audio.src=url;
        this.$refs.audio.play();
      })
    }
  },
  watch:{
    currentSong(newsong,oldsong){
      if(newsong.id==oldsong.id){
        return
      }
      if(!newsong.id){
        return
      }
      if(this.currentLyric){
        this.currentLyric.stop();
        this.current_lineNum=0;
        this.currentTime=0;
        this.currentLyric=null;
      }
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        this.get_Lyric(newsong);
        this.getUrl(newsong);
      },1000)
    },
    playing(val){
      this.$nextTick(()=>{
        val ? this.$refs.audio.play() : this.$refs.audio.pause();
      })
    }
  },
  components:{
    progressBar,
    Scroll,
    playList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.current
  color #3333ff !important
.move-enter-active,.move-leave-active
  transition all 1s
.move-enter,.move-leave-to
  opacity 0
.mode-list
  background url(./list.svg)
  background-size 40px 40px
.mode-loop
  background url(./loop.svg)
  background-size 40px 40px
.mode-random
  background url(./random.svg)
  background-size 40px 40px
.love
  background url(./love.svg)
  background-size 40px 40px
.loving
  background url(./loving.svg)
  background-size 40px 40px
.prev
  background url(./prev.svg)
  background-size 40px 40px
.next
  background url(./next.svg)
  background-size 40px 40px
.back
  background url(./back.svg)
  background-size 40px 40px
.play
  background url(./play.svg)
  background-size 40px 40px
.pause
  background url(./pause.svg)
  background-size 40px 40px
.player
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background #EEEEEE
  z-index 1005
  .filterbg
  	z-index -1
  	position absolute
  	top 0
  	left 0
  	right 0
  	bottom 0
  	filter blur(20px)
  	opacity 0.5
  .top
  	height 12%
  	.name
      font-size 18px
      text-align center
      color #648bdb
      margin-bottom 5px
    .singer
      text-align center
      color #6067e5
    .back
      position absolute
      display block
      width 40px
      height 40px
      left 10px
      top 5px
  .middle
  	position relative
   z-index 100 
  	height 55% 
  	.cd
  	  position absolute
  	  top 0
  	  left 10%
  	  width 80%
  	  .lyric_p
       color #3333ff
       margin 20px 10px
       text-align center   
  	  .img
    	  box-sizing border-box
    	  border-radius 50%
    	  border 24px solid hsla(0,0%,100%,.1)
       &.playing
         animation: rotate 10s linear infinite
       &.paused
         animation-play-state: paused
    .lyric_wrapper
      position relative
      width 100%
      height 100%  
      overflow hidden
      z-index 100
      .no_lyric
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
      div
        .list
          margin-bottom 15px
          text-align center  
          color #274141
          opacity 1                
  .bottom
  	height 33%
   .barWrapper
     margin-top 40px 
     display flex
     align-items center
     justify-content space-between
  	.cotrol
     width 100%
     height 40px 
     position absolute
     bottom 50px
  	  display flex
  	  justify-content space-around
  	  i
	    display block
	     width 40px
	     height 40px
.mini_player
  position fixed
  left 0
  bottom 0
  height 65px
  width 100%
  background  #E6E6FA
  z-index 1001
  display flex
  align-items center
  .icon-image
    flex 0 0 45px
    width 45px
    margin 0 20px 0 15px
    img
      border-radius 50%
      &.playing
        animation: rotate 10s linear infinite
      &.paused
        animation-play-state: paused 
  .text_msg
    width 45%
    h1
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      font-size 13px
    p
      font-size 10px
  .play_btn
    flex 0 0 40px
    margin-right 10px
    i
      display block
      width 40px
      height 40px
  .list
    flex 0 0 40px
    margin-right 10px
    i
      display block
      width 40px
      height 40px 
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>