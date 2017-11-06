<template>
  <div class="wrapper">
       <div class="banner">
            <v-scroll 
                v-if="scrollListData.length" 
                :scrollListData=scrollListData>
            </v-scroll>
            <img src="<%route%>/images/banner.jpg"/>
       </div>
       <div class="content">
           <router-view></router-view>
       </div>
       <div class="content_bottom">
           <img src="<%route%>/images/content_bottom.jpg">
       </div>
       <v-load :loadingflog="loadingflog"></v-load>
       <v-wait :waitingflog="waitingflog"></v-wait>
  </div>
</template>

<script type="ecmascript-6">
import loading from './loading.vue';
import waiting from './waiting.vue';
import messScoll from './scrollMessage.vue';
export default {
    name: 'app',
    components: {
        'v-load':loading,
        'v-wait':waiting,
        'v-scroll':messScoll
    },
    mounted: function(){
        var that =  this;
        setTimeout(function(){
            that.$data.scrollListData = [1,3,5,6,2];
            that.$data.loadingflog = false;
        },0)
    },
    data () {
        return {
            scrollListData:[],
            loadingflog:true,
            waitingflog:false,
        }
    }
}
</script>
<style lang="sass">
@import  "../../../common/sass/mixin.sass";
html,body{
    height:100%;
    background:#FBEF03;
    min-width:320px;
}
.wrapper{
    padding:toRem(22) 0;
}
.banner{
    position:relative;
    img{
        display:block;
        width:100%;
    }
}
.content{
    background:url(<%route%>/images/content_bg.jpg) repeat-y;
    background-size:100%;
}
.content_bottom{
    img{
        display:block;
        width:100%;
    }
}
</style>