export default{
	init_player({state,commit},{list,index}){
		commit('setPlaying',true);
		commit('setPlayList',list);
		commit('setOrderList',list);
		commit('setMode',0);
		commit('setIndex',index);
		commit('setFullPage',true);
	},
	insertSong({state,commit},song){
		let playlist=state.playList.slice();
		let orderlist=state.orderList.slice();
		let index=state.index;
		let currentSong=playlist[index];
		let songIndex=playlist.findIndex(val=>val.id==song.id);
		playlist.splice(++index,0,song);
		if(songIndex>-1){
			if(index>songIndex){
				playlist.splice(songIndex,1);
				index--;
			}else{
				playlist.splice(songIndex+1,1)
			}
		}
		let orderSongIndex=orderlist.findIndex(val=>val.id==song.id);
		let currentIndex=orderlist.findIndex(val=>val.id==currentSong.id);
		orderlist.splice(++currentIndex,0,song);
		if(orderSongIndex>-1){
			if(orderSongIndex>currentIndex){
				orderlist.splice(orderSongIndex,1);
			}else{
				orderlist.splice(orderSongIndex+1,1)
			}
		}
		commit('setPlayList',playlist);
		commit('setOrderList',orderlist);
		commit('setIndex',index);
		commit('setFullPage',true);
		commit('setMode',0);
		commit('setPlaying',true);
	},
	empty_list({commit}){
		commit('setOrderList',[]);
		commit('setPlayList',[]);
		commit('setPlaying',false);
		commit('setIndex',-1)
	},
	del_one({commit,state},{item,index}){
		let playlist=state.playList.slice();
		let orderlist=state.orderList.slice();
		let currentIndex=state.index;
		let pIndex=playlist.findIndex(val=>val.id==item.id);
		playlist.splice(pIndex,1);
		orderlist.splice(index,1);
		if(pIndex<currentIndex){
			currentIndex--
		}
		commit('setPlayList',playlist);
		commit('setOrderList',orderlist);
		commit('setIndex',currentIndex);
		commit('setPlaying',true);
		if(playlist.length==0){
			commit('setIndex',-1);
			commit('setPlaying',false);
		}
	}
}