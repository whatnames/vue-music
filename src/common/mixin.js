import {mapState} from 'vuex'

export const listMixin={
	computed:{
		...mapState(['playList'])
	},
	mounted(){
		//console.log('mounted')
		this.toBottom(this.playList);
	},
	activated(){
		//console.log('activated')
		this.toBottom(this.playList);
	},
	methods:{
		toBottom(){
			throw new Error('the component must have a method of toBottom')
		}
	},
	watch:{
		playList(newVal){
			//console.log('playlist change')
			this.toBottom(newVal);
		}
	}
}