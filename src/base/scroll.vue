<template>
  <div class="wrapper" ref='wrapper'>
    <slot></slot>
  </div>
</template>

<script>
import Scroll from 'better-scroll'	
export default {
  props:{
    probeType:{
      type:Number,
      default:2
    },
    click:{
      type:Boolean,
      default:true
    },
    listenScroll:{
      type:Boolean,
      default:true
    },
    pullUp:{
    	type:Boolean,
    	default:false
    },
    data:{
      type:Array,
      default:()=>[]
    },
    delay:{
      type:Number,
      default:3000
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initBScroll();
    })
  },
  methods:{
    initBScroll(){
      if(!this.$refs.wrapper){
        return 
      }
      this.scroll=new Scroll(this.$refs.wrapper,{
        click:this.click,
        probeType:this.probeType
      })
      if(this.listenScroll){
        this.scroll.on('scroll',pos=>{
          this.$emit('scroll',pos);
        })
      }
   	  if(this.pullUp){
   	  	this.scroll.on('scrollEnd',()=>{
   	  		if(this.scroll.y<=(this.scroll.maxScrollY+50)){
   	  			this.$emit('scrollToEnd');
   	  		}
   	  	})
   	  }
    },
    refresh(){
      return this.scroll&& this.scroll.refresh();
    },
    scrollTo(){
      return this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
    },
    scrollToElement(){
      return this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
    }
  },
  watch:{
    data(){
      setTimeout(()=>{
        this.refresh();
      },this.delay)
    }
  },
  components:{
  	
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>