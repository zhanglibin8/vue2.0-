<template>
	<div class="toast-box" v-if='toastmsg'>
		<p>{{toastmsg}}</p>
	</div>
</template>
<script type="ecmascript-6">
export default {
    name: 'toast',
    components: {
    },
    mounted: function(){
      var that = this;
      setTimeout(function(){
        that.$props.toastmsg = '';
        // that.$data.flog = false;
      },2000);
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
      // toastmsg:function(a,b){
      //   var that = this;
      //   if(!!that.$props.toastmsg){
      //     this.$data.flog = true;
      //   };
      //   setTimeout(function(){
      //     that.$props.toastmsg = '';
      //     that.$data.flog = false;
      //   },2000);
      // }
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
      top:50%;
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