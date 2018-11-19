import {getStorage,get_collect,get_play_history} from '@/common/cache'
export default {
  orderList:[],
  playList:[],
  index:-1,
  topList:[],
  playing:false,
  fullPage:false,//显示miniplayer
  mode:0,// 0顺序播放 1单曲循环 2随机播放
  searchHistory:getStorage(),
  coverImg:'',
  topName:'',
  favorate_songs:get_collect(),
  playHistory:get_play_history()
}