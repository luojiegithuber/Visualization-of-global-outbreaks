<template>
	<div id="home_div">
	  
	  <div class="pie_line_contain1">
	  <my-globalpie></my-globalpie><br/>
	  <my-globalchart></my-globalchart>
	  </div>
	  
	  <div class="pie_line_contain2">
	    <my-clock></my-clock>

	  <my-worldmap v-if="isMap"></my-worldmap>
	  <my-scatter v-if="isScatter"></my-scatter>
	  </div>
	  <div class="pie_line_contain1">
	  <my-piechart></my-piechart><br/>
	  <my-linechart></my-linechart>
	  </div>
	  
	</div>
</template>

<script>
	import WorldMap from '@/components/WorldMap';
	import Scatter from '@/components/scatter-plot';
	import PieChart from '@/components/PieChart';
	import LineChart from '@/components/LineChart';
	import GlobalChart from '@/components/GlobalChart';
	import GlobalPie from '@/components/GlobalPie';
	import clock from '@/components/clock'
	
	import axios from 'axios'
	export default {
		
		  components:{
		    'my-worldmap':WorldMap,
		    'my-piechart':PieChart,
			'my-linechart':LineChart,
			'my-globalchart':GlobalChart,
			'my-globalpie':GlobalPie,
			'my-clock':clock,
			'my-scatter':Scatter
		  },
		
		  data () {
			  return {
                 isMap:true,
				 isScatter:false,
				 radio:1
			  }
	
		  },
		  created () {
			  var that=this

            document.onkeydown = function(e) {

            let e1 = e || event || window.event || arguments.callee.caller.arguments[0]

            if (e1 && e1.keyCode == 113) {

                 var person = prompt("请输入你的操作：");
                 if (person=="手动更新") {
                     that.getNewData();
					 alert("手动更新操作执行")
                 } else if(person=="删除重复"){
					 that.deleteRepeat()
					 alert("删除重复")
					 
				 } else{
                     alert("无用的操作")
                 }
				 
				 
            }
         }
		  },
		  methods:{
			  
			  changeMain(val){
				 if(val=='1'){
					 this.isMap=true
					 this.isScatter=false
				 }else{
					 this.isMap=false
					 this.isScatter=true
				 }
			  },
			  
			 //消耗接口的操作，慎用 
			 getNewData(){
				this.getData()
				this.getData3()
			 },
			  
			  
			  
			 //获得疫情最新消息,同时更新地图
             getData(){
				 
			 new Promise(function (resolve,reject) {
			     //请求的是newslist
			     axios({
			        url: '/Feiyanapi/txapi/ncovabroad/index?key=8904de751142e1a252a8e864174bb93d',//*****************************************
			        method: 'get',
			        }).then((res)=>resolve(res.data.newslist))
				 
				 }).then((p_res)=>{console.log("得到网络上的数据了，现在第二次请求");this.postOutbreak(p_res);this.updateNewslist(p_res)})
			 },
			 
			 //获得疫情最新消息————————用于更新worldmap
			 getData2(){
			 				 
			 new Promise(function (resolve,reject) {
			     //请求的是newslist
			     axios({
			        url: '/Feiyanapi/txapi/ncovabroad/index?key=8904de751142e1a252a8e864174bb93d',
			        method: 'get',
			        }).then((res)=>resolve(res.data.newslist))
			 				 
			 				 }).then((p_res)=>{this.updateNewslist(p_res)})
			 },
             
			 //获得疫情最新消息————————用于更新GlobalPie
			 getData3(){
			 		
			 new Promise(function (resolve,reject) {
			     //请求的是全球的总趋势数据
			     axios({
			        url: '/Feiyanapi/txapi/ncov/index?key=8904de751142e1a252a8e864174bb93d',//****************************************
			        method: 'get',
			        }).then((res)=>resolve(res.data.newslist[0].desc.foreignStatistics))//obj
			 				 
			 	}).then((p_res)=>{this.updateInc(p_res)})
			 },
			 
			 //更新globalOutbreak数据库的newslist
			 updateNewslist(newslist){
			 	axios({
			 	     url: '/api/globalOutbreak/updateNewslist',
			 	     method: 'post',
					 data: {data:newslist},
			 	 }).then((res) => {
                     console.log(res)
			 	 }) 
			 },
			 
			 
			 //更新globalOutbreak数据库的inc
			 updateInc(inc_data){
			 	axios({
			 	     url: '/api/globalOutbreak/updateInc',
			 	     method: 'post',
			 		 data: {data:inc_data},
			 	 }).then((res) => {
			         console.log(res)
			 	 }) 
			 },
			 
			 
			 //将最新数据发送给outbreak数据库并更新数据库outbreak
			 postOutbreak(newslist){
				 //console.log(newslist)
                  axios({
                       url: '/api/outbreaks/newAll',
                       method: 'post',
                       data: {data:newslist},
                   }).then((res) => {
                       console.log(res)
                   })
			 },
			 
			 //看一下后台
			 seeBack(){
			      axios({
			           url: '/api/outbreaks/hello',
			           method: 'get',
			       }).then((res) => {
			           console.log(res)
			       })
			 },
			 
		  }
	}
	
</script>

<style>
	
	
	
	
.pie_line_contain1{
	border-color:#fff;
	border-style: solid;
	border-width: 2px;
	text-align: center;
    
	flex:1 1 400px;/***/
	
	height: 100%;

}

.pie_line_contain2{
	border-color:#fff;
	border-style: solid;
	border-width: 2px;
	text-align: center;

    flex:2 1 800px;/*****/
    
    height: 100%;
}

#home_div{
	width: 100%;
	height:100%;

    display: flex;/*关键*/
    border: 2px solid #ccc;

    flex-direction: row;
    justify-content: flex-start;
}

</style>
