<template>
	<div>
	  <my-piechart></my-piechart>
	  <my-worldmap></my-worldmap>
	</div>
</template>

<script>
	import WorldMap from '@/components/WorldMap';
	import PieChart from '@/components/PieChart'
	export default {
		
		  components:{
		    'my-worldmap':WorldMap,
		    'my-piechart':PieChart,
		  },
		
		  data () {
			  return {
	
			  }
	
		  },
		  mounted () {

		  },
		  methods:{

		  }
	}
	
</script>

<style>
	my-worldmap{
		display: inline-block;
	}
	my-piechart{
		display: inline-block;
	}
</style>
