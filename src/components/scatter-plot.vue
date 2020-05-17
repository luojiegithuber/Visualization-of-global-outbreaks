<template>
	<div>
		<div id='scatter'></div>
	</div>	
</template>

<script>
import axios from 'axios'
	
export default {
	  data () {
		  return {
                 scatterData:[],
		  }

	  },	  
	  created(){

	  },
	  
	  mounted () {
       this.initScatterPlot()//初始化图像
	   this.getScatterPlotData()
	  },
	  methods:{
		  
		//传给WorldMap的名字
		 toWorldMap(name) {
		      this.bus.$emit("toWorldMap", name);
		    },
		  
		  
		//请求数据接口
		getScatterPlotData(){
			axios({
			     url: '/api/outbreaks/getAll_CAGR',
			     method: 'get',
			 }).then((res) => {
			     this.scatterData=[]
			     //console.log(res)
				 this.scatterData = res.data.message
                 console.log(this.scatterData)
			     this.initScatterPlot()
				 
			 }) 
		},
		

		  
		//初始化/更新 图像  
		initScatterPlot(){
			 // 基于准备好的dom，初始化echarts实例
			        var myChart = this.$echarts.init(document.getElementById('scatter'));
			 
			        myChart.setOption({
    grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        // trigger: 'axis',
        showDelay: 0,
        formatter: function (params) {
             if (params.value.length > 1){
                return params.value[2] + ' :<br/>'
                + "复合增长率："+params.value[1] +'%<br/>' 
                + "现存确诊："+params.value[0] ;
             }else{
                 return params.value;
             }
        },
        axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
                type: 'dashed',
                width: 1
            }
        }
    },
    toolbox: {
        feature: {
            dataZoom: {},
            brush: {
                type: ['rect', 'polygon', 'clear']
            }
        }
    },
    brush: {
    },
    legend: {
        left: 'center'
    },
    xAxis: [
        {
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value} ',
				textStyle:{
				   color:"#fff"
				}
            },
			lineStyle: {
			    color: "#fff",
			},
			color:'#fff',
            splitLine: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
			lineStyle: {
			    color: "#fff",
			},
            axisLabel: {
                formatter: '{value}% ',
				textStyle:{
				   color:"#fff"
				}
            },
			color:'#fff',
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            type: 'scatter',
            data: this.scatterData,
			 itemStyle: {
				 normal:{ 
					label:{ 
						show: false, 
						formatter: '{c}' 
						 }, 
								            
					 } 
				 },            

            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                lineStyle: {
                    type: 'solid'
                },
                data: [
                    {type: 'average', name: '平均值'},
                    { xAxis: 50000 }
                ]
            }
        },

    ]
})

      myChart.on('click', (params)=>{
			let name=params.data[2]
            this.toWorldMap(name)
		})
			}
	  }
}
</script>

<style>
		
	#scatter{
		width:900px;
		height:700px;
		margin: 0 auto;
		display: inline-block;
	}
	
	#scatter_title{
		font-size: 20px;
		font-weight: 600;
		color:#ffffff;
	}
</style>