<template>
  <div>
    <v-header :headerinfo="renderData.headerinfo"></v-header>
    <v-list :listRender="renderData.listRender"></v-list>
    <v-load :loadingflog="loadingflog"></v-load>
    <v-toast :toastmsg="toastmsg"></v-toast>
  </div>
</template>
<script type="ecmascript-6">
import header from './header.vue';
import list from './listcontent.vue';
import loading from './loading.vue';
import toast from './toast.vue';
export default {
    name: 'app',
    components: {
        'v-header':header,
        'v-list':list,
        'v-load':loading,
        'v-toast':toast
    },
    mounted: function(){
        this.getData();
    },
    data () {
        return {
            loadingflog:true,
            toastmsg:'',
            renderData:{
                headtitle:'',
                headerinfo:'',
                listRender:null
            }
        }
    },
    methods:{
        getQuery:function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            var q = window.location.pathname.substr(1).match(reg_rewrite);
            if(r != null){
                return unescape(r[2]);
            }else if(q != null){
                return unescape(q[2]);
            }else{
                return null;
            }
        },
        getData:function(){
            var that = this;
            var id = that.getQuery('articleid');
            if(!id){
                that.toastmsg = '请检查链接是否正确'
                return;
            };
            this.$http.get('https://activity.app.autohome.com.cn/api/actiCommon/queryActi?actiid='+id).then((response) => {
                response = response.body;
                console.log(response);
                if (response.returncode === 0) {
                    var _data = eval('(' + response.result.introduction + ')');
                    that.$data.renderData.headtitle = _data.headtitle;
                    that.$data.renderData.headerinfo = _data.headerinfo;
                    that.$data.renderData.listRender = _data.listRender;
                    document.title = that.$data.renderData.headtitle;
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
    background:#f8f8f8;
}
</style>