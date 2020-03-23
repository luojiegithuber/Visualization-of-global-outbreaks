<template>
	<div>
	  <my-piechart></my-piechart>
	  <my-worldmap></my-worldmap>
	  <my-linechart></my-linechart>
	  <button @click="getData()">测试按钮</button>
	</div>
</template>

<script>
	import WorldMap from '@/components/WorldMap';
	import PieChart from '@/components/PieChart';
	import LineChart from '@/components/LineChart';
	import axios from 'axios'
	export default {
		
		  components:{
		    'my-worldmap':WorldMap,
		    'my-piechart':PieChart,
			'my-linechart':LineChart,
		  },
		
		  data () {
			  return {

			  }
	
		  },
		  created () {
            //const chatTimer = setInterval(this.s , 1000);

           /* this.$once('hook:beforeDestroy', () => {
              clearInterval(chatTimer);
             })*/
		  },
		  methods:{
             getData(){
				 
				 new Promise(function (resolve,reject) {
			     axios({
			        url: '/Feiyanapi/txapi/ncovabroad/index?key=8904de751142e1a252a8e864174bb93d',
			        method: 'get',
			        }).then((res)=>resolve(res.data.newslist))
				 
				 }).then((p_res)=>this.postOutbreak(p_res))
			 },
             
			 //将最新数据发送给数据库
			 postOutbreak(newslist){
				 console.log(newslist)
                  axios({
                       url: '/api/outbreaks/newAll',
                       method: 'post',
                       data: {data:newslist},
                   }).then((res) => {
                       console.log(res)
                   })
			 },
			 
			 test(){
				 axios({
				      url: '/api/outbreaks/',
				      method: 'get',
				  }).then((res) => {
				      console.log(res)
				  })
			 },
			 
			 s(){
				 console.log(new Date())
			 }
			 
		  }
	}
	
</script>

<style>
	my-worldmap{
		display: inline-block;
	}
	my-piechart{
		display: inline-block;
	}
</style>
