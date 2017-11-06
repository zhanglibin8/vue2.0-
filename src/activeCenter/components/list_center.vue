<template>
    <div class="list_center">
        <ul>
            <li v-for ="(item, index) in listCenter">
                <a :href="item.url"  @click="auto_tj(index)">
                    <img :src="item.image" alt="">
                </a>
            </li>
        </ul>
    </div>
</template>
<script type="ecmascript-6">
export default {
    name: 'listCenter',
    components: {
    },
    mounted: function(){
    },
    props: {
      listCenter: {
        type: Object
      }
    },
    data () {
        return {}
    },
    methods:{
        auto_tj:function(index){
            var _pmark = (index + 1).toString();
            trackCustomEvent('auto_common_event',{'biz':'auto','scene':'activity','type':'click','action':'auto_activity_6_first_click','ctime':new Date().getTime(),'area':'middle','element':'first','pmark':_pmark});
        }
    }
}
</script>
<style lang="sass">
.list_center{
    padding:0.12rem 0.06rem;
    background:#FFF;
    ul:after{
        content:'';
        display:block;
        height:0;
        visibility:hidden;
        clear:both;
    }
    li{
        float:left;
        width:33.33%;
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
        padding:0 0.06rem;
        a{
            display:block;
        }
        img{
            display:block;
            width:100%;
            -webkit-border-radius:50%;
            border-radius:50%;
        }
    }
}
</style>