<template>
    <div>
        <v-banner v-if="renderData.banner" :banner="renderData.banner"></v-banner>
        <v-listcenter :listCenter="renderData.listCenter"></v-listcenter>
        <v-listbottom :listBottom="renderData.listBottom"></v-listBottom>
        <v-toast :toastmsg="toastmsg"></v-toast>
        <v-load :loadingflog="loadingflog"></v-load>
    </div>
</template>

<script type="ecmascript-6">
import banner from './banner.vue';
import listCenter from './list_center.vue';
import listBottom from './list_bottom.vue';
import loading from './loading.vue';
import toast from './toast.vue';

export default {
    name: 'app',
    components: {
        'v-banner':banner,
        'v-listcenter':listCenter,
        'v-listbottom':listBottom,
        'v-load':loading,
        'v-toast':toast,
    },
    mounted: function(){
        this.getData();
    },
    data () {
        return {
            loadingflog:true,
            toastmsg:'',
            renderData:{
                banner:null,
                listCenter:null,
                listBottom:null
            }
        }
    },
    methods:{
        getData:function(){
            var that = this;
            this.$http.get('//activity.app.autohome.com.cn/api/actiCommon/queryActi?actiid=activityCenter').then((response) => {
                response = response.body;
                console.log(response);
                if (response.returncode === 0) {
                    that.$data.renderData.banner = response.result.children[0].children;
                    that.$data.renderData.listCenter = response.result.children[1].children;
                    that.$data.renderData.listBottom = response.result.children[2].children;
                    that.$data.loadingflog=false;
                }else{
                    that.toastmsg = '获取数据失败'
                }
            },(response) => {
                that.toastmsg = '请检查网络'
            });
        }
    }
}
</script>
<style lang="sass">
html,body{
    height:100%;
    background:#f7f7f7;
}
</style>