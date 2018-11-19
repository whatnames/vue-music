<template>
　　<div class="progress" ref='progress'>
      <div class="progress_bg" ref='progress_bg' @click='click'>
          <div class="progress_bar" ref='bar'></div>
      </div>
      <div class="progress_btn"  @touchstart='start' @touchmove='move' ref='btn' @touchend='end'></div>
  </div>　 
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props:{
    progress:{
      type:Number,
      default:0
    },
    width:{
      type:Number,
      default:240
    }
  },
  created(){
    this.touch={}
  },
  mounted(){
    this.$refs.progress.style.width=`${this.width}px`;
  },
  methods:{
    start(e){
      this.touch.start=e.touches[0].clientX;
      this.touch.left=this.$refs.btn.offsetLeft;
    },
    move(e){
      this.touch.end=e.touches[0].clientX;
      let offsetX=this.touch.end-this.touch.start+this.touch.left;
      let total_width=this.$refs.progress_bg.offsetWidth;
      offsetX=Math.min(total_width-10,Math.max(-10,offsetX));
      let moveX=offsetX+10;
      let percent=moveX/total_width;
      this.$refs.btn.style.left=offsetX+'px';
      this.$refs.bar.style.width=moveX+'px';
    },
    end(e){
      let total_width=this.$refs.progress_bg.offsetWidth;
      let percent=(this.touch.end-this.touch.start+this.touch.left)/total_width;
      this.$emit('drag_change_time',percent);
    },
    click(e){
      let total_width=this.$refs.progress_bg.offsetWidth;
      let percent=e.offsetX/total_width;
      this.$emit('click_change_time',percent);
    }
  },
  watch:{
    progress(val){
      let width=val*this.$refs.progress_bg.offsetWidth;
      this.$refs.btn.style.left=`${width-10}px`;
      this.$refs.bar.style.width=`${width}px`;
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.progress
  position relative
  width 240px 
  .progress_bg
    height 10px
    border 1px solid  #ddd
    border-radius 5px
    overflow hidden
    background-color #f2f2f2
    .progress_bar
      background: #6699ff
      width 0
      height 10px
      border-radius 5px
  .progress_btn
    width 20px
    height 20px
    border-radius 5px
    position absolute
    background #fff
    left  30px
    left -10px
    top -4px
    cursor pointer
    border 1px #ddd solid
    box-sizing border-box
</style>