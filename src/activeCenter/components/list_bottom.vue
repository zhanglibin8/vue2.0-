<template>
    <div class="list_bottom">
        <ul>
            <li v-for ="(item, index) in listBottom">
                <a :href="item.url" @click="auto_tj(index)">
                    <img :src="item.image" alt="">
                    <h3 v-text="item.title"></h3>
                    <p v-text="item.content"></p>
                    <span v-text="item.introduction || '立即参与'"></span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script type="ecmascript-6">
export default {
    name: 'listBottom',
    components: {
    },
    mounted: function(){
    },
    props: {
      listBottom: {
        type: Object
      }
    },
    methods:{
        auto_tj:function(index){
            var _pmark = (index + 1).toString();
            trackCustomEvent('auto_common_event',{'biz':'auto','scene':'activity','type':'click','action':'auto_activity_6_first_click','ctime':new Date().getTime(),'area':'bottom','element':'first','pmark':_pmark});
        }
    },
    data () {
        return {}
    }
}
</script>
<style lang="sass">
.list_bottom{
    li{
        margin-top:0.1rem;
        background:#FFF;
        a{
            display:block;
            padding:0.1rem 0.19rem 0.1rem 1.36rem;
            position:relative;
        }
        img{
            position:absolute;
            left:0.19rem;
            top:0.1rem;
            width:1.1rem;
            height:0.68rem;
        }
        h3{
            font-size:0.16rem;
            color:#333;
            height: 1.5em;
            line-height: 1.5em;
            overflow:hidden;
            text-align:center;
        }
        p{
            font-size:0.12rem;
            color:#999;
            height: 1.5em;
            line-height: 1.5em;
            overflow:hidden;
            text-align:center;
        }
        span{
            display:block;
            margin:0 auto;
            width:0.9rem;
            height:0.22rem;
            line-height:0.22rem;
            background:#2873FF;
            font-size:0.12rem;
            color:#FFF;
            text-align:center;
            -webkit-border-radius:0.11rem;
            border-radius:0.11rem;
            margin-top:0.04rem;
        }
    }
}
</style>