<template>
	<div>
		<div class='chart' id='chart'></div>
	</div>	
</template>

<script>
	import axios from 'axios'
	export default {
	  data () {
		  return {
	         worldData:[],
		     simple_worldData:[],
			 namemap:[],
			 myChart:''
		  }

	  },
	  mounted () {
	    this.getWorld()
		
	  },
	  methods: {
		  //***************************************************
	    getWorld () {
	      var that = this
		  //本地静态文件
	      axios.get('static/world.json').then(function (res) {
	      	that.namemap = res.data.namemap
	      })
		  
		  new Promise(function (resolve,reject) {
		      axios.get('static/world.json')
		          .then(function(res){
		              let namemap = res.data.namemap
		              resolve();
		          })
		  }).then(function (){
		      return axios.get('/api/globalOutbreak/getNewslist') // 重要，注意添加了return
		          .then(function(res){
					  console.log(res)
		              let newslist=res.data.message//代表对象数组
					  that.worldData=res.data.message
					  
					  
					  //遍历对象，生成仅仅包含值和value的
					  newslist.forEach(function(val,index,arr){
						  //val是一个对象
						  let name = val.provinceName//国家名称
						  let value = val.currentConfirmedCount//现存确诊
						  let obj=new Object()
						  obj.name=name
						  obj.value=value
						  that.simple_worldData.push(obj)
					  })
					  let namemap = that.namemap
					  let dataArr = that.simple_worldData
					  that.drawChart(namemap, dataArr)
					  
		          })
		  })
	    },
		
		//********************************************************
	    drawChart (name, data) {
	      // 基于准备好的dom，初始化echarts实例
	      let chart = this.$echarts.init(document.getElementById('chart'))
	      // 监听屏幕变化自动缩放图表
	      window.addEventListener('resize', function () {
	        chart.resize()
	      })
		  
	      // 绘制图表
	      chart.setOption({
	        // 图表主标题
	        /*title: {
	          text: '世界疫情地图', // 主标题文本，支持使用 \n 换行
	          top: 20, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
	          left: 'center', // 值: 'left', 'center', 'right' 同上
	          textStyle: { // 文本样式
	            fontSize: 24,
	            fontWeight: 600,
	            color: '#fff'
	          }
	        },*/
			
	        // 提示框组件
	        tooltip: {
	          trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
	          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
	          // 使用函数模板  传入的数据值 -> value: number | Array
	          formatter: function (val) {
	            return val.data.name + ': ' + val.data.value
	          }
	        },
			
	        // 视觉映射组件
	        visualMap: {
	          type: 'continuous', // continuous 类型为连续型  piecewise 类型为分段型
	          show: false, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
	          // 指定 visualMapContinuous 组件的允许的最小/大值。'min'/'max' 必须用户指定。
	          // [visualMap.min, visualMax.max] 形成了视觉映射的『定义域』
	          min: 0,
	          max: 60000,
	          // 文本样式
	          textStyle: {
	            fontSize: 14,
	            color: '#fff'
	          },
	          realtime: false, // 拖拽时，是否实时更新
	          calculable: true, // 是否显示拖拽用的手柄
	          // 定义 在选中范围中 的视觉元素
	          inRange: {
	            color: ['#eae0e0', '#e60003'] // 图元的颜色
	          }
	        },
	        series: [
	          {
	            type: 'map', // 类型
	            // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
	            name: '世界地图',
	            mapType: 'world', // 地图类型
	            // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
	            roam: true,
	            // 图形上的文本标签
	            label: {
	              show: false // 是否显示对应地名
	            },
	            // 地图区域的多边形 图形样式
	            itemStyle: {
	              areaColor: '#65ff42', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
	              borderWidth: 0.5, // 描边线宽 为 0 时无描边
	              borderColor: '#000', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
	              borderType: 'solid' // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
	            },
	            // 高亮状态下的多边形和标签样式
	            emphasis: {
	              label: {
	                show: true, // 是否显示标签
	                color: '#fff' // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
	              },
	              itemStyle: {
	                areaColor: '#4b81ff' // 地图区域的颜色
	              }
	            },
				
	            // 自定义地区的名称映射
	            nameMap: name,
	            // 地图系列中的数据内容数组 数组项可以为单个数值
	            data: data,
				
				
	          }
	        ]
	      })
	      // 定时显示提示框和高亮效果
	      /*let index = -1
	      setInterval(function () {
	        // 隐藏提示框
	        chart.dispatchAction({
	          type: 'hideTip',
	          seriesIndex: 0,
	          dataIndex: index
	        })
	        // 显示提示框
	        chart.dispatchAction({
	          type: 'showTip',
	          seriesIndex: 0,
	          dataIndex: index + 1
	        })
	        // 取消高亮指定的数据图形
	        chart.dispatchAction({
	          type: 'downplay',
	          seriesIndex: 0,
	          dataIndex: index
	        })
	        // 高亮指定的数据图形
	        chart.dispatchAction({
	          type: 'highlight',
	          seriesIndex: 0,
	          dataIndex: index + 1
	        })
	        index++
	        if (index > data.length - 1) {
	          index = -1
	        }
	      }, 2000)*/
		  
		  //用箭头函数，this指向函数定义时的作用域
		  chart.on('click', (params)=>{
			//console.log(this)
			this.findObjByName(params.name);//此处写点击事件内容
		})
		
	    },
	  
	  //**********************************
	  findObjByName(name){
		  //把名字给LineChart让他自己处理事务
		  this.toLine(name)
		  
		  //把结果给PieChart 数据可视化
		  let Pie_result = this.worldData.find(function (obj) { if (obj.provinceName== name) { return obj;}});
		  this.toPie(Pie_result)
	  },
	  
	  //给兄弟组件PieChart一个对象
	  toPie(obj) {
	     this.bus.$emit("toPie", obj);
	  },
	  
	  //给兄弟组件LineChart一个名字
	  toLine(name){
		 this.bus.$emit("toLine", name);  
	  }
	  //************************************

	  }
	}
</script>

<style>
		
	#chart{
		width:900px;
		height:700px;
	/*border-color:#fff;
	border-style: solid;
	border-width: 4px;*/
		margin: 0 auto;
		display: inline-block;
	}
</style>
