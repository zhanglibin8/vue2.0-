<template>
	<div class="list_content">
        <ul>
            <li v-for="item in listRender">
                <a :href="item.href" v-if="item.type==1" class="list-1">
                    <img :src="item.img[0]">
                    <h3>
                        {{item.title}}
                    </h3>
                    <p>
                        <span>
                            {{item.info.readnum}}人阅读
                        </span>
                        {{item.info.tag}}
                    </p>
                </a>
                <a :href="item.href" v-else class="list-2">
                    <h3>
                        {{item.title}}
                    </h3>
                    <h4>
                        <span v-for="child in item.img">
                            <img :src="child" alt="">
                        </span>
                    </h4>
                    <p>
                       <span>
                            {{item.info.readnum}}人阅读
                        </span>
                        {{item.info.tag}} 
                    </p>
                </a>
            </li>
        </ul>
	</div>
</template>
<script type="ecmascript-6">
export default {
    name: 'list',
    components: {
    },
    mounted: function(){
    },
    props: {
      listRender:null
    },
    data () {
        return {}
    }
}
</script>
<style lang="sass">
.list_content{
    margin-top:10px;
    padding:0 14px;
    background:#FFF;
    ul{
        overflow:hidden;
    }
    li{
        border-top:1px solid #EEE;
        margin-top:-1px;
        padding:15px 0;
        a{
            display:block;
            &.list-1{
                padding-right:120px;
                position:relative;
                img{
                    position:absolute;
                    right:0;
                    top:0;
                    width:112px;
                    height:64px;
                }
            }
            &.list-2{
                overflow:hidden;
                h4{
                    margin:0 -4px;
                    padding:5px 0;
                    &:after{
                        content:'';
                        display:block;
                        clear:both;
                        height:0;
                        overflow:hidden;
                        visibility:hidden;
                    }
                    span{
                        float:left;
                        width:33.33%;
                        padding:0 4px;
                        -webkit-box-sizing:border-box;
                        box-sizing:border-box;
                        img{
                            width:100%;
                        }
                    }
                }
            }
            h3{
                font-size:17px;
                height:46px;
                line-height:23px;
                overflow:hidden;
                color:#333;
            }
            p{
                font-size:12px;
                color:#2873FF;
                height:18px;
                line-height:18px;
                span{
                    float:right;
                    color:#999;
                }
            }
        }
    }
}
</style>