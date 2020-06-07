<template>
	<div id="piechart">
		<p id="piechart_title">{{name}}病例比例</p>
		<div id='piechart_content'></div>
	</div>	
</template>

<script>
export default {
	  data () {
		  return {
                 pieData:[],
				 name:''
		  }

	  },	  
	  created(){
	    this.bus.$on("toPie", msg => {
			 this.pieData=[]
			 this.name=msg.provinceName
			 
			 if(msg.currentConfirmedCount!=0)this.pieData.push({value:msg.currentConfirmedCount,name:"现存确诊"})
			 if(msg.deadCount!=0)this.pieData.push({value:msg.deadCount,name:"死亡病例"})
			 if(msg.curedCount!=0)this.pieData.push({value:msg.curedCount,name:"治愈病例"})
			 
			 //console.log(this.pieData)
			 this.initPie()
	    });
	  },
	  
	  mounted () {
       this.initPie()
	  },
	  methods:{
		initPie(){
			 // 基于准备好的dom，初始化echarts实例
			        var myChart = this.$echarts.init(document.getElementById('piechart_content'));
			 
			        myChart.setOption({
			            series : [
			                {
			                    name: '访问来源',
			                    type: 'pie',    // 设置图表类型为饼图
			                    radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
			                    data:this.pieData,
								                itemStyle: {
								                    emphasis: {
								                        shadowBlur: 10,
								                        shadowOffsetX: 0,
								                        shadowColor: 'rgba(0, 0, 0, 0.5)'
								                    },
								                    normal:{ 
								                        label:{ 
								                            show: true, 
								                            formatter: '{b} : {c} ({d}%)' 
								                        }, 
								                        labelLine :{show:true} 
								                    } 
								                }
			                }
			            ]
			        })
			}
	  }
}
</script>

<style>
		
	#piechart_content{
		height: 80%;
		width: 100%;
		display: inline-block;
	}
	
	#piechart_title{
		font-size: 20px;
		font-weight: 600;
		color:#ffffff;
	}
	
	#piechart{
		height:45%;
		width:90%;
		
		margin: 0 auto;
		margin-top:5%; 
	}
	

	#piechart_content canvas{
		height:100%;
		width:100%;
	}
</style>
