<template>
	<div class="search-box">
		<img src="./sousuo.svg" alt="" width='25' >
		<input type="text" placeholder="搜索歌曲丶歌手" class="box" v-model='queryVal'>
		<img src="./shanchu.svg" alt="" width='25' v-show='queryVal' @click='del'>
	</div>
</template>

<script>
import {debounce} from '@/common/debounce'
export default {
  data(){
    return {
      queryVal:'' 
    }
  },
  created(){
 	this.$watch('queryVal',debounce((newVal)=>{
 		this.$emit('query',newVal);
 	},300))
  },
  methods:{
    del(){
      this.queryVal='';
    },
    add(val){
      this.queryVal=val;
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .icon-sousuo
    font-size 20px
  .search-box
    position relative
    z-index 100
    display flex
    width 100%
    height 35px
    align-items center
    background #e3e4e6
    box-sizing border-box
    border-radius 6px
    padding 0 6px
    .box
      flex 1
      outline 0
      border none
      background #e3e4e6
          	
</style>
