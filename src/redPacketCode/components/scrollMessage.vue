<template>
	<div class="scroll-message">
		<ul>
            <li v-for="item in scrollListData">
                {{item}}
            </li>   
        </ul>
	</div>
</template>
<script type="ecmascript-6">
export default {
    name: 'scrollmessage',
    components: {
    },
    mounted: function(){
        if(this.scrollListData.length<=1){
            return;
        };
        var last = $('.scroll-message').find('li:last-child'),
            cloneLast = last.clone();
        // 分别添加首尾节点
        $('.scroll-message ul').prepend(cloneLast);

        var _curIndex = 0,
            oHeight =  $('.scroll-message li').height(),
            timer = 1000,
            dur = 500;

        var animateFn = function(value,time){
            $('.scroll-message ul').css({
                "transform":"translate3d(0px,"+value+"px, 0px)",
                "-webkit-transform":"translate3d(0px, "+value+"px, 0px)",
                "transition-duration":time+'ms',
                "-webkit-transition-duration":time+'ms'
            });
        };

        var totalTime = timer + dur,
            aLen = $('.scroll-message li').length;
        this.$data.moveid = setInterval(function(){
            _curIndex --;
            animateFn( _curIndex * oHeight,timer);
            if(_curIndex <= (aLen-1)*-1){
                _curIndex = 0;
                setTimeout(function(){
                    $('.scroll-message ul').css({
                        "transform":"translate3d(0px,0px, 0px)",
                        "-webkit-transform":"translate3d(0px, 0px, 0px)",
                        "transition-duration":'0ms',
                        "-webkit-transition-duration":'0ms'
                    });
                },timer);
            };
        },totalTime)

    },
    props: {
      scrollListData:{
        type:Array
      }
    },
    data () {
        return {
            moveid:null
        }
    },
    destroyed:function(){
        var that = this;
        clearInterval(that.$data.moveid);
    }
}
</script>
<style lang="sass">
@import  "../../../common/sass/mixin.sass";
.scroll-message{
    position:absolute;
    width:70%;
    height:toRem(42);
    left:15%;
    background:#000;
    overflow:hidden;
    border-radius:0 0 toRem(10) toRem(10);
    li{
        height:toRem(42);
        line-height:toRem(42);
        width:100%;
        text-align:center;
        overflow:hidden;
        color:#fbe63e;
    }
}
</style>