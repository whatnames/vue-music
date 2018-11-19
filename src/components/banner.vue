<template>
  <swiper :options="swiperOption" class='hello'>
    <swiper-slide v-for="(banner, index) in banners" :key="index">
      <img :src="banner.picUrl" alt="" width='100%'>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {getBanner} from '@/api'
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
  data(){
  	return {
      banners:[],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay:true
      },
  	}
  },
  created(){
    this.init();   
  },
  methods:{
    init(){
      getBanner().then(res=>{
         let {data}=res;
         if(data.code===200){
           this.banners=data.banners;
         }
       })
    }
  },
  components:{
  	swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .hello
    height 148px
    
</style>