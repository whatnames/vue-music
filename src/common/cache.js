import storage from 'good-storage'
const MAX_LENGTH=12
const MAX_COLLECT=100

export function save_search_history(query){
	let arr=storage.get('search',[]);
	let index=arr.findIndex(val=>val==query);
	if(index==-1){
		arr.unshift(query);
	}
	if(index>0){
		arr.splice(index,1);
		arr.unshift(query);
	}
	if(arr.length>MAX_LENGTH){
		arr.pop();
	}
	storage.set('search',arr);
	return arr;
}
export function set_collect_history(song){
	let arr=storage.get('favorate',[]);
	arr.unshift(song);
	if(arr.length>MAX_LENGTH){
		arr.pop();
	}
	storage.set('favorate',arr);
	return arr;
}

export function get_collect(){
	return storage.get('favorate',[])
}

export function remove_collect_one(item){
	let arr=storage.get('favorate').filter(val=>val.id!=item.id);
	storage.set('favorate',arr);
	return arr;
}

export function getStorage(){
	return storage.get('search',[]);
}

export function removeItem(item){
	let arr=storage.get('search').filter(val=>val.id!=item.id);
	storage.set('search',arr);
	return arr;
}

export function removeAll(){
	storage.set('search',[]);
}
export function get_play_history(){
	return storage.get('playHistory',[])
}

export function set_play_history(song){
	let arr=storage.get('playHistory',[]);
	let index=arr.findIndex(val=>val.id==song.id);
	if(index==-1){
		arr.unshift(song);
	}
	if(index>0){
		arr.splice(index,1);
		arr.unshift(song);
	}
	if(arr.length>MAX_COLLECT){
		arr.pop();
	}
	storage.set('playHistory',arr);
	return arr;
}

