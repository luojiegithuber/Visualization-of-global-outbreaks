<template>
	<div id="globalpie">
		<p id="globalpie_title">海外病例比例图</p>
		<div id='globalpie_content'></div>
	</div>	
</template>

<script>
import axios from 'axios'
	
export default {
	  data () {
		  return {
                 globalPieData:[],
				 
				 currentConfirmedCount_change:'',
				 deadCount_change:'',
				 curedCount_change:'',
				 change:[]
		  }

	  },	  
	  created(){

	  },
	  
	  mounted () {
       this.initGlobalPie()//初始化图像
	   this.getGlobalPieData()
	  },
	  methods:{
		  
		//请求数据接口
		getGlobalPieData(){
			axios({
			     url: '/api/globalOutbreak/getInc',
			     method: 'get',
			 }).then((res) => {
			     this.globalPieData=[]
			     //console.log(res)
				 let obj = res.data.message.newslist[0]
			     if(obj.currentConfirmedCount!=0)this.globalPieData.push({value:obj.currentConfirmedCount,name:"现存确诊"})
			     if(obj.deadCount!=0)this.globalPieData.push({value:obj.deadCount,name:"累计死亡"})
			     if(obj.curedCount!=0)this.globalPieData.push({value:obj.curedCount,name:"累计治愈"})
			     
				 this.change.push(obj.currentConfirmedIncr)
				 this.change.push(obj.deadIncr)
				 this.change.push(obj.curedIncr)
				 
			     //console.log(this.pieData)*/
			     this.initGlobalPie()
				 
			 }) 
		},
		

		  
		//初始化/更新 图像  
		initGlobalPie(){
			 // 基于准备好的dom，初始化echarts实例
			        var myChart = this.$echarts.init(document.getElementById('globalpie_content'));
			 
			        myChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
                formatter:(a)=>{
					let index=a.dataIndex
					if(this.change[index]>0){
						return a.name+":"+a.value+'\n\n比较昨日：'+'+'+this.change[index]
					}else{
						return a.name+":"+a.value+'\n\n比较昨日：'+this.change[index]
					}
                    
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: this.globalPieData
        }
    ]
})
			}
	  }
}
</script>

<style>
		
	#globalpie_content{
		height: 80%;
		width: 100%;
		display: inline-block;
	}
	
	#globalpie_title{
		font-size: 20px;
		font-weight: 600;
		color:#ffffff;
	}
	
	#globalpie{
		height:45%;
		width:90%;
		
		margin: 0 auto;
		margin-top:5%; 
	}
	
	#globalpie_content canvas{
		height:100%;
		width:100%;
	}
</style>

