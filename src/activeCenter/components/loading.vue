<template>
	<div class="loading-box" v-show="loadingflog">
		<div class="loading">
        <span></span>
    </div>
	</div>
</template>
<script type="ecmascript-6">
export default {
    name: 'loading',
    components: {
    },
    mounted: function(){
    },
    props: {
      loadingflog:{
        type:Boolean
      }
    },
    data () {
        return {}
    }
}
</script>
<style lang="sass">
.loading-box{
    position:fixed;
    width:100%;
    height:100%;
    background:#f8f8f8;
    left:0;
    top:0;
    z-index:999;
}
.loading{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    z-index:999;
    top: 50%;
    left: 50%;
    margin:-40px 0 0 -40px;
    border:5px solid lightgreen;
    -webkit-animation: turn 2s linear infinite;
}
.loading span{
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: lightgreen;
    position: absolute;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
    -webkit-animation: changeBgColor 2s linear infinite;
}
@-webkit-keyframes changeBgColor{
    0%{
        background: lightgreen;
    }
    100%{
        background: lightblue;
    }
}
@-webkit-keyframes turn{
    0%{
        -webkit-transform: rotate(0deg);
        border-color: lightgreen;
    }
    100%{
        -webkit-transform: rotate(360deg);
        border-color: lightblue;
    }
}
</style>