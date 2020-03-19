<template>
	<div>
		<div id='piechart'></div>
	</div>	
</template>

<script>
export default {
	  data () {
		  return {
                 pieData:[      
			                        {value:235, name:'A'},
			                        {value:274, name:'联盟广告'},
			                        {value:310, name:'B'},
			                        {value:335, name:'直接访问'},
			                        {value:400, name:'搜索引擎'}
			              ],
				option:{
			            series : [
			                {
			                    name: '访问来源',
			                    type: 'pie',    // 设置图表类型为饼图
			                    radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
			                    data:this.pieData
			                }
			            ]
			        }
		  }

	  },	  
	  created(){
	    this.bus.$on("toPie", msg => {
			 this.pieData=[]
			 this.pieData.push({value:msg.currentConfirmedCount,name:"现存确诊"})
			 this.pieData.push({value:msg.deadCount,name:"死亡病例"})
			 this.pieData.push({value:msg.curedCount,name:"治愈病例"})
			 
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
			        var myChart = this.$echarts.init(document.getElementById('piechart'));
			 
			        myChart.setOption({
			            series : [
			                {
			                    name: '访问来源',
			                    type: 'pie',    // 设置图表类型为饼图
			                    radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
			                    data:this.pieData
			                }
			            ]
			        })
			}
	  }
}
</script>

<style>
		
	#piechart{
		height: 400px;
		width: 400px;
		display: inline-block;
	}
	
</style>
