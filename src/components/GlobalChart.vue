<template>
	<div>
		<p id="globalchart_title">全球各病例较昨日增长柱状图</p>
		<div id='globalchart'></div>
	</div>	
</template>

<script>
import axios from 'axios'
	
export default {
	  data () {
		  return {
                 globalData:[],
				 confirmedIncr_Arr : [],
				 currentConfirmedIncr_Arr : [],
				 curedIncr_Arr : [],
				 deadIncr_Arr : [],
		  }

	  },	  
	  created(){

	  },
	  
	  mounted () {
       this.initGlobalChart()
	   this.getGlobalChartData()
	  },
	  methods:{
		  
		  
		getGlobalChartData(){
			axios({
			     url: '/api/globalOutbreak/getInc',
			     method: 'get',
			 }).then((res) => {
			     this.globalPieData=[]
			     console.log(res)
				 let obj = res.data.message
                 this.confirmedIncr_Arr=obj.confirmedIncr.slice(-7)
				 this.currentConfirmedIncr_Arr=obj.currentConfirmedIncr.slice(-7)
				 this.curedIncr_Arr=obj.curedIncr.map((val)=>-val).slice(-7)
				 this.deadIncr_Arr=obj.deadIncr.map((val)=>-val).slice(-7)
				 
			     //console.log(this.pieData)*/
			     this.initGlobalChart()
			 }) 
		},		  
		  
		initGlobalChart(){
			 // 基于准备好的dom，初始化echarts实例
			        var myChart = this.$echarts.init(document.getElementById('globalchart'));
			 
			        myChart.setOption({
    tooltip: {
        trigger: 'axis',
        extraCssText:'width:150px;height:100px;',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter:  (a)=> {
          let list = []
           let listItem = ''
           for (var i = 0; i < a.length; i++) {
             if(i==1||i==2){
             list.push(
               '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                 a[i].color +
                 ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                 a[i].seriesName +':'+-a[i].data+
                 '</span>&nbsp&nbsp'
             )}else{
                  list.push(
               '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                 a[i].color +
                 ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                 a[i].seriesName +':'+a[i].data+
                 '</span>&nbsp&nbsp'
             )}
           }
           listItem = list.join('<br>')
           return '<div class="showBox">' + listItem + '</div>'
        }
    },
    legend: {
        data: ['新增现存确诊', '新增死亡', '新增治愈','新增确诊'],
		
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
    xAxis: [
        {
            type: 'value',
			 axisLine: {
			                lineStyle: {
			                    color: "#fff",
			                }
			            }

        }
    ],
    yAxis: [
        {
            type: 'category',
			 axisLine: {
			                lineStyle: {
			                    color: "#fff",
			                }
			            },

            axisTick: {
                show: false
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    series: [
        {
            name: '新增现存确诊',
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            data: this.currentConfirmedIncr_Arr
        },
        {
            name: '新增死亡',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                formatter:  (params)=> {return -params.data }
            },
            data: this.deadIncr_Arr
        },

        {
            name: '新增治愈',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                position: 'left',
                formatter:  (params)=> {return -params.data }
            },
            data: this.curedIncr_Arr
        },
          {
            name: '新增确诊',
            type: 'bar',
            stack: '总量',
            label: {
                show: true
            },
            data: this.confirmedIncr_Arr
        },
    ]
})
			}
	  }
}
</script>

<style>
		
	#globalchart{
		height: 400px;
		width: 500px;
		display: inline-block;
	}
	
	#globalchart_title{
		font-size: 20px;
		font-weight: 600;
		color:#ffffff;
	}
</style>

