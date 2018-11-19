<template>
  <div id="app">
  	<div class="search-box-wrapper" @click='goSearch'>
  	  <SearchBox></SearchBox>
      <i class="iconfont icon-liebiao" @click.stop='gotoUser'></i>
  	</div>
  	<Menu></Menu>
    <player></player>
    <keep-alive>
      <router-view></router-view> 
    </keep-alive> 	
  </div>
</template>

<script>
import SearchBox from './base/search-box/search-box'
import Menu from './components/menu/menu'
import Player from '@/components/player/player'
export default {
  name: 'App',
  components:{
  	SearchBox,
  	Menu,
    Player
  },
  methods:{
    goSearch(){
      this.$router.push('/search')
    },
    gotoUser(){
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-box-wrapper
    margin 10px
    display flex
    align-items center
    .icon-liebiao
      font-size 23px
      padding-left 10px

</style>
