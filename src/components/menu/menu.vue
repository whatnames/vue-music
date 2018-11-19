<template>
  <div class="menu">
    <router-link to='/recommend' tag='div' class='item'>
      <span>推荐</span>
    </router-link>
    <router-link :to="{path:'/singer'}" tag='div' class='item' exact>
      <span>歌手</span>
    </router-link>
    <router-link to="/rank" tag='div' class='item'>
      <span>排行</span>
    </router-link>
  </div>
</template>

<script>  
export default {
  data(){
    return {

    }
  },
  components:{
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .menu
    position relative
    display flex
    justify-content space-around
    padding-bottom 10px 
    .router-link-active
      border-bottom 5px solid blue
    img
      margin-bottom 5px
</style>