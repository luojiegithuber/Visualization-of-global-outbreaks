<template>
	<div>
		<div id='linechart'></div>
	</div>	
</template>

<script>
export default {
	  data () {
		  return {
                LineChart:[],//数据里所有的信息 名字带七天的情况
				name:'',//国家名称
				sevenday_data:[],
				option:{
 title: {
        text: '折线图堆叠',
		textStyle: {
		color: '#fff' ,
		}
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['现存病例', '治愈病例', '死亡病例']
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '现存病例',
            type: 'line',
            stack: '总量',
            data: [120, 132,  210]
        },
        {
            name: '死亡病例',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '治愈病例',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
    ]
			        }
		  }

	  },	  
	  created(){

	  },
	  
	  mounted () {
       this.initLine()
	  },
	  methods:{
		initLine(){
			 // 基于准备好的dom，初始化echarts实例
			        var myChart = this.$echarts.init(document.getElementById('linechart'));
			 
			        myChart.setOption(this.option)
			}
	  }
}
</script>

<style>
		
	#linechart{
		height: 400px;
		width: 600px;
		display: inline-block;
	}
	
</style>