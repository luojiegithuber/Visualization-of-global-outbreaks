import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WorldMap from '@/components/WorldMap'
import Home from '@/components/Home'
import PieChart from '@/components/PieChart'
import clock from '@/components/clock'
import Scatter from '@/components/scatter-plot';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
	{
	  path: '/Scatter',
	  name: 'Scatter',
	  component: Scatter
	},
	{
	  path: '/PieChart',
	  name: 'PieChart',
	  component: PieChart
	},
	{
	  path: '/clock',
	  name: 'clock',
	  component: clock
	},
  ]
})
