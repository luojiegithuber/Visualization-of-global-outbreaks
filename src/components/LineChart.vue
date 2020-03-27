<template>
	<div>
		<p id="linechart_title">{{name}}近7日病例增长趋势</p>
		<div id='linechart'></div>
	</div>	
</template>

<script>
import axios from 'axios'	
	
export default {
	  data () {
		  return {
                LineChart_data:[],//数据里所有的信息 名字带七天的情况
				
				name:'',//国家名称
				currentConfirmedCount:[],//该国家七天内的现存数据数组
				curedCount:[],//同理
				deadCount:[],//同理
				
				day_Arr:[],
				

		  }

	  },	  
	    computed: {
	      // 计算属性的 getter
	      
	      },
	  created(){
		  
		 this.dayArr()
         this.getSevendayData()
		 this.bus.$on("toLine", msg => {
			 console.log("传值成功啦")
			 
		 	 this.name=msg
			 
			 this.getCountByName(msg)
		 	 
		 	 this.initLine()
		 });
		 console.log(this.day_Arr)
	  },
	  
	  mounted () {
       this.initLine()
	  },
	  methods:{
		 //今天是周几？
		  dayArr() {
		       let dayarr=[]
		       let map = new Map()
		    
		       map.set(0,"周日")
		       map.set(1,"周一")
		       map.set(2,"周二")
		       map.set(3,"周三")
		       map.set(4,"周四")
		       map.set(5,"周五")
		       map.set(6,"周六")
		    
		       let today = new Date().getDay()
		    
		       let count=7
		    
		       while(count){
		       	today++
		        dayarr.push(map.get(today%7))
		       	count--
		       }
		    
		       this.day_Arr=dayarr
			   },
		
		//请求数据
		getSevendayData(){		   
			axios({
			     url: '/api/outbreaks/getAll',
			     method: 'get',
			 }).then((res) => {
			     this.LineChart_data=res
				 console.log(this.LineChart_data)
				 console.log("7天数据可以的")
			 })   
		} ,
		
		//根据 名字 得到三个数据数组
		getCountByName(name){
			let result = this.LineChart_data.data.message.find(function (obj) { if (obj.name== name) { return obj;}});
			console.log(result)
			
			//更新可视化的数组
			this.currentConfirmedCount=result.currentConfirmedCount.slice(-7)
			this.curedCount=result.curedCount.slice(-7)
			this.deadCount=result.deadCount.slice(-7)
		
		},
		
		  
		initLine(){
			 // 基于准备好的dom，初始化echarts实例
			 var myChart = this.$echarts.init(document.getElementById('linechart'));
			 myChart.setOption({
 title: {
	    show:false,
        text: this.name+"近七日疫情情况",
		x: 'center',
		y: 'bottom',
		textStyle: {
		color: '#fff' ,
		}
    },
    tooltip: {
        trigger: 'axis',

    },
    legend: {
        data: ['现存病例', '治愈病例', '死亡病例'],
		
		            textStyle:{
		                color:"#fff"
		            }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.day_Arr,
		color:'#fff',
		 axisLine: {
		                lineStyle: {
		                    color: "#fff",
		                }
		            }

    },
    yAxis: {
        type: 'value',
		 axisLine: {
		                lineStyle: {
		                    color: "#fff",
		                }
		            }

    },
    series: [
        {
            name: '现存病例',
            type: 'line',
            //stack: '总量',
            data: this.currentConfirmedCount
        },
        {
            name: '死亡病例',
            type: 'line',
            //stack: '总量',
            data: this.deadCount
        },
        {
            name: '治愈病例',
            type: 'line',
            //stack: '总量',
            data: this.curedCount
        },
    ]
			        })
			}
	  }
}
</script>

<style>
		
	#linechart{
		height: 400px;
		width: 500px;
		display: inline-block;
		/*border-style: solid;
		border-width: 5px;*/
	}
	
	#linechart_title{
		font-size: 20px;
		font-weight: 600;
		color:#ffffff;
	}
	
</style>