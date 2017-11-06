import Vue from 'vue';
import app from './components/app.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(VueResource);
new Vue({
   el: '#app',
   render: function(func){
        return func(app);
   }
});