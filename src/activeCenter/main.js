import Vue from 'vue';
import app from './components/app.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueFontSize from '../../common/js/changeFontSize.js';
import $ from 'zepto-browserify';
Vue.use(VueRouter);
Vue.use(VueResource);
//字体初始化
Vue.use(VueFontSize);
new Vue({
   el: '#app',
   render: function(func){
        return func(app);
   }
});