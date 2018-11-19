import {getSongUrl,getLyric,getSongDetail} from '@/api'

export default class Song{
	constructor({id,name,singerdes,singer,url,image,duration}){
		this.id=id;
		this.name=name;
		this.singer=singer;
		this.singerdes=singerdes;
		this.url=url;
		this.image=image;
		this.duration=duration;
	}
	getLyric(){
		if(this.lyric){
			return Promise.resolve(this.lyric);
		}else{
			return new Promise((resolve,reject)=>{
				getLyric(this.id).then(res=>{
					if(res.data.hasOwnProperty('lrc')){
						this.lyric=res.data.lrc.lyric;
						resolve(this.lyric)
					}else{
						reject('no lyric')
						console.log('没有歌词！')
					}
				})
			})
		}

	}
}

export function createSong(song){
	return new Song({
		id:song.id,
		name:song.name,
		singer:handleSinger(song).singer,
		singerdes:handleSinger(song).singerdes,
		image:song.album.blurPicUrl,
		duration:song.duration,
	})
}

export function createRankSong(song){
	return new Song({
		id:song.id,
		name:song.name,
		singer:rankSinger(song).singer,
		singerdes:rankSinger(song).singerdes,
		image:song.al.picUrl,
		duration:song.dt,
	})
}

export async function createSearchSong(song){
	let {data:{songs:[{al:{picUrl}}]}}=await getSongDetail(song.id);
	return new Song({
		image:picUrl,
		id:song.id,
		name:song.name,
		singer:song.artists[0].name,
		singerdes:song.artists[0].name,
		duration:song.duration,
	})
}

export function createSearchSinger(song){
	return new Song({
		id:song.id,
		name:song.name,
		singerdes:SearchSiner(song),
		singer:SearchSiner(song),
		image:song.al.picUrl,
		duration:song.dt,
	})
}

function handleSinger(song){
	return {
		singer:song.artists.map(val=>val.name).join('/'),
		singerdes:song.artists.map(val=>val.name).join('/')+'-'+song.name
	}
}
function rankSinger(song){
	return {
		singer:song.ar.map(val=>val.name).join('/'),
		singerdes:song.ar.map(val=>val.name).join('/')
	}
}

function SearchSiner(song){
	return song.ar.map(val=>val.name).join('/')
}

