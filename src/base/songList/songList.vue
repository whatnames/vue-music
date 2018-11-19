<template>
	<div class="new-songs">
	  <p class='title-des'>{{titleDes}}(共{{songs.length}}首)</p>
	  <ul class='ul'>
	    <li class="song" v-for='(song,index) in songs' @click='select(song,index)'>
	      <div class="des">{{song.name}}
	        <span style='color:#888'>{{song.alias}}</span>
	      </div>
	      <p class="des singer p">{{song.singerdes}}</p>
	      <img src="./play.svg" alt="" width='30' class="icon-play">
	    </li>
	  </ul>
	</div>	
</template>

<script type="text/javascript">
	export default {
		props:{
			songs:{
				type:Array,
				default:()=>[]
			},
			titleDes:{
				type:String,
				default:'歌曲列表'
			}
		},
		methods:{
      select(song,index){
        this.$emit('selected',song,index);
      }
		}
	}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .title-des
    display block
    position relative
    font-size 17px
    color #555555
    padding 10px 0 10px 10px
    &:before
      content " "
      position absolute
      left 0
      top 50%
      margin-top -9px
      width 3px 
      height 16px
      background red
  .remd_list
    width 33.3%
    .remd_text
      text-overflow ellipsis
      font-size 13px
      padding:5px
  .list-wrapper
    display flex
    flex-wrap wrap
  .song
    position relative
    border-bottom 1px solid #d4d4d4
    margin-left 10px
    .p
      width 80%
    .icon-play
      position absolute
      right 10px
      top 20px
      margin-left 10px
    .des
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
      padding 5px
    .singer
      color #888	
</style>