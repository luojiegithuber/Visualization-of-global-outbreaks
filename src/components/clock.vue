<template>
	<div>
	<div class="clock">
		<p class="title">罗杰的疫情天眼<hr/></p>
	    <p class="date">{{ date }}</p>
	    <p class="time">{{ time }}</p>
	</div>
	
	<div class="clock">
		<p class="title">公告栏<hr/></p>
		<div style="text-align: left;">
	    <p class="text">● 请点击地图上的国家地区完成交互动作</p>
	    <p class="text">● 绿色部分不一定代表国家没有疫情，也有可能是没有收录数据</p>
		<p class="text">● 若有疑问联系作者1015779635@qq.com</p>
	    <p class="text">● 每日中午12:00以及23:55更新数据</p>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		  data () {
			  return {
                  date:'',
				  time:'',
				  week:['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
				  timerID:null
			  }
	
		  },	  
	      created(){
			  this.timerID = setInterval(this.updateTime, 1000);
			  this.updateTime();
	      },
		  methods:{

			  updateTime() {
			      var cd = new Date();
                  //中午12点更新数据
				  if(cd.getHours()==12&&cd.getMinutes()==22&&cd.getSeconds()==22){this.$parent.getNewData()}
				  
				  //去尾式更新
				  if(cd.getHours()==23&&cd.getMinutes()==55&&cd.getSeconds()==0){this.$parent.getNewData()}
				  
			      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
			      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
			      
			  },
			  
			  zeroPadding(num, digit) {
			      var zero = '';
			      for(var i = 0; i < digit; i++) {
			          zero += '0';
			      }
			      return (zero + num).slice(-digit);
			  }
		  }
		  }
</script>

<style>
	.clock p {
	  margin: 0;
	  padding: 0;
	}
	
	.clock {
		vertical-align: top;
	  display: inline-block;
	  font-family: 'Share Tech Mono', monospace;
	  color: #ffffff;
	  text-align: center;
	  height: 220px;
	  width: 500px;
	  /*position: absolute;
	  left: 50%;
	  top: 50%;*/
	  /*-webkit-transform: translate(-50%, -50%);
	          transform: translate(-50%, -50%);*/
	  color: #daf6ff;
	  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
	}
	.clock .time {
	  letter-spacing: 0.05em;
	  font-size: 80px;
	  padding: 5px 0;
	}
	.clock .title{
	  letter-spacing: 0.1em;
	  font-size: 50px;
	}
	
	.clock .date {
	  letter-spacing: 0.1em;
	  font-size: 24px;
	}
	.clock .text {
	  letter-spacing: 0.1em;
	  font-size: 12px;
	  padding: 20px 0 0;
	}
</style>
