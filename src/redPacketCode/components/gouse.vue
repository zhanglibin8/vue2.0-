<template>
  <div class="gouse" v-show=" codenum != '0' ">
    <h3>兑换码：</h3>
    <div class="code_copy" id="copy" v-if="copyresut" :data-clipboard-text="codenum">
     <span v-text="codenum"></span>
     <b class="copy_btn">点击复制</b>
    </div>
    <div class="code_copy" v-else>
     <span v-text="codenum"></span>
     <b class="copy_warn">选中兑换码后点击拷贝进行复制</b> 
    </div>
    <div class="btn_box">
      <a href="javascript:;" @click="goUse">去兑换</a>
    </div>
    <p class="info">下载打开汽车之家App -【我】-【精彩活动】中兑换</p>
  </div>
</template>

<script type="ecmascript-6">
import AutoDown from '../../../common/js/autodown.js';
export default {
    name: 'app',
    components: {
    },
    mounted: function(){
      var that = this;
      //复制功能
      setTimeout(function(){
        var clipboard = new Clipboard('#copy');
        $('.wrapper').on('click','#copy',function(){});
        clipboard.on('success', function(e) {
            that.$toast.show({
              text:'复制成功，快去兑换吧~'
            });
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
          that.$data.copyresut = false;
          that.$toast.show({
            text:'不支持快捷复制'
          });
        });
      },800);
    },
    data() {
        return {
          waitingflog:false,
          copyresut:true,
        }
    },
    props: {
      codenum:{
        type:String
      }
    },
    methods:{
      goUse:function(){
        var that = this;
        trackCustomEvent('auto_common_event',{'biz':'auto','scene':'activity','type':'click','action':'auto_activity_11_show_click','ctime':new Date().getTime(),'area':'middle','element':'show','pmark':'0'});
        setTimeout(function(){
          that.openApp();
        },300);
      },
      openApp:AutoDown({
        scheme_Ios: 'autohome://insidebrowser?url=%2f%2factivity.app.autohome.com.cn%2fstatic%2fredPacketCode%2findex.html%23%2fgetpage',
        scheme_Adr: 'autohome://insidebrowser?url=%2f%2factivity.app.autohome.com.cn%2fstatic%2fredPacketCode%2findex.html%23%2fgetpage',
        download_url_ios: 'http://www.baidu.com',
        download_url_andorid: 'http://www.baidu.com',
        download_url_YYB_ios: 'http://www.baidu.com',
        download_url__YYB_andorid:'http://www.baidu.com'
      })
    }
}
</script>
<style lang="sass">
@import  "../../../common/sass/mixin.sass";
.gouse{
  padding:toRem(10) 0;
  h3{
    font-size:toRem(50);
    text-align:center;
    font-weight:bold;
    color:#4e2d1c;
  }
  .btn_box{
    padding:0 toRem(64);
    a{
      display:block;
      width:100%;
      height:toRem(120);
      border-bottom:toRem(8) solid #af400a;
      font-size:toRem(42);
      color:#FFF;
      text-align:center;
      line-height:toRem(120);
      background:#de520e;
      -webkit-border-radius:toRem(10);
      border-radius:toRem(10);
    }
  }
  p.info{
    padding:toRem(20) 0;
    font-size:toRem(26);
    color:#4e2d1c;
    text-align:center;
  }
  .code_copy{
    padding:toRem(36) 0;
    text-align:center;
    span{
      font-size:toRem(56);
      color:#4e2d1c;
    }
    b{
      font-size:toRem(26);
      color:#de520e;
      &.copy_warn{
        display:block;
        padding-top:toRem(20);
      }
    }
  }
}
</style>