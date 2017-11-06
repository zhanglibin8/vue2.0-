import Vue from 'vue';
import app from './components/app.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueFontSize from '../../common/js/changeFontSize.js';
//toast全局组件
import Toast from '../../common/components/toast.js';
Vue.use(Toast);
import $ from 'zepto-browserify';
Vue.use(VueRouter);
Vue.use(VueResource);
//字体初始化(html width:320 fontSize:12)
Vue.use(VueFontSize);

//状态分支
import countDown from './components/countdown.vue';
import quantity from './components/quantity.vue';
import getpage from './components/getpage.vue';
//路由配置
const routes = [
	{ path: '/countdown', component: countDown },
	{ path: '/quantity', component: quantity },
	{ path: '/getpage', component: getpage }
]
// 路由实例化
const router = new VueRouter({
  routes  
});

new Vue({
	router,
	el: '#app',
	render: function(func){
	    return func(app);
	}
})