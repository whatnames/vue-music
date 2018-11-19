import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000'

export function getBanner(){
	return axios.get('/banner');
}
export function getRecommend(){
	return axios.get('/personalized')
}

export function getNewsong(){
	return axios.get('/personalized/newsong')
}
export function getSongUrl(id){
 	return axios.get(`/music/url?id=${id}`)
}
export function getLyric(id){
	return axios.get(`/lyric?id=${id}`)
}
export function getTop(idx){
	return axios.get(`/top/list?idx=${idx}`)
}

export function getHotSearch(){
	return axios.get('/search/hot')
}
export function getSearchSuggest(queryVal){
	return axios.get(`/search/suggest?keywords=${queryVal}`)
}

export function getSearchSong(queryVal,offset=0){
	return axios.get(`/search?keywords=${queryVal}&offset=${offset}`);

}

export function getSongDetail(id){
	return axios.get(`/song/detail?ids=${id}`)
}

export function getSingerDetail(id){
	return axios.get(`/artists?id=${id}`)
}


export function getSingerList(){
	return axios.get('toplist/artist')
}