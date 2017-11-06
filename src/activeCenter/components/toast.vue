<template>
	<div class="toast-box" v-show='flog'>
		<p>{{toastmsg}}</p>
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
      toastmsg:{
        type:String
      }
    },
    data () {
        return {
          flog:false
        }
    },
    watch:{
      toastmsg:function(){
        var that = this;
        if(!!this.toastmsg){
          this.$data.flog = true;
        };
        setTimeout(function(){
          that.$data.flog = false;
        },2000);
      }
    }
}
</script>
<style lang="sass">
.toast-box{
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:9999;
    p{
      position:absolute;
      width:200px;
      background:rgba(0,0,0,0.8);
      bottom:100px;
      left:50%;
      margin-left:-100px;
      text-align: center;
      font-size: 16px;
      color: #FFF;
      padding: 8px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      line-height: 1.4em;
      border-radius: 15px;
      -webkit-border-radius: 15px;
    }
}
</style>