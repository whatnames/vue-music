export function shuffle(arr){
	let shuffled=Array(arr.length);
	let _arr=arr.slice();
	for(let i=0,rand;i<arr.length;i++){
		rand=~~(Math.random()*(i+1));
		if(rand!=i) shuffled[i]=shuffled[rand];
		shuffled[rand]=arr[i];
	}
	return shuffled;
}