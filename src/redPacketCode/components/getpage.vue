<template>
  <div class="getpage">
    <div class="input">
      <input type="text" v-model="codetext" placeholder="请输入兑换码">
    </div>
    <div class="btn_box">
      <a href="javascript:;" @click="useCode">立即兑换</a>
    </div>
    <p class="info">
      <span>活动规则</span>
      1、每个兑换码仅能兑换一次。<br>
      2、每个汽车之家账号仅能兑换一次。<br>
      3、因活动火爆，现金红包到账可能有最多2小时的延迟，请您耐心等待。
    </p>
    <v-wait :waitingflog="waitingflog"></v-wait>
    <div class="layer" v-if="alertflog">
      <div class="alert">
        <img src="<%route%>/images/alert_info.png" alt="">
        <p v-html="alertTxt"></p>
        <a href="javascript:;" @click="href">
          立即查看
        </a>
        <i @click="closeAlert"></i>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import waiting from './waiting.vue';
import gouse from './gouse.vue';
import myCookie from '../../../common/js/cookie.js';
export default {
    name: 'app',
    components: {
      'v-wait':waiting,
      'v-gouse':gouse
    },
    mounted: function(){
    },
    data() {
        return {
          waitingflog:false,
          codetext:'',
          alertflog:false,
          alertTxt:'',
          url:'',
          isLogin:myCookie.get('pcpopclub') && (myCookie.get('pcpopclub').toString() !== ''), //是否登录
          deviceid:myCookie.get('deviceid')
        }
    },
    methods:{
      //兑换
      useCode:function(){
        trackCustomEvent('auto_common_event',{'biz':'auto','scene':'activity','type':'click','action':'auto_activity_11_first_click','ctime':new Date().getTime(),'area':'middle','element':'first','pmark':'0'});
        this.$data.waitingflog = true;
        if(this.$data.codetext == ''){
          this.$toast.show({
            text:'请输入兑换码'
          });
          this.$data.waitingflog = false;
          return;
        };
        //判断是否登录;
        if(!this.$data.isLogin){
          this.login();
        };
        this.$http.get('//activity.app.autohome.com.cn/api/actiRedeem/redeemRedPacket',{
          params:{
            'device_id':this.$data.deviceid,
            'redeem_code':this.$data.codetext
          },
          timeout:3000
        }).then((response) => {
          response = response.body;
          if (response.result.is_success === "T") {
            this.$data.url = response.result.redirect_url;
            this.$data.alertTxt = "恭喜获得现金红包<br>您需要先开通汽车之家钱包<br>才能提现噢~";
            this.$data.alertflog = true,
            this.$data.waitingflog = false;
          }else{
            if(response.result.is_success === "F" && response.returncode == 1 && !response.result.redirect_url){
              this.$data.url = response.result.redirect_url;
              this.$data.alertTxt = "您已经兑换过红包啦<br />把机会留给别人吧~";
              this.$data.alertflog = true,
              this.$data.waitingflog = false;
            }else{
              this.$toast.show({
                text:response.message
              });
              this.$data.waitingflog = false;
            }
          }
        },(response) => {
          this.$toast.show({
            text:'兑换失败,请检查网络'
          });
          this.$data.waitingflog = false;
        });
      },
      closeAlert:function(){
        this.$data.alertflog = false;
      },
      login:function(){
        var that = this;
        AHAPP.openLogin({
          success: function(result) {
            that.$data.isLogin = true;
            that.useCode();
          },
          fail: function(result) {
             console.log('调起登陆失败');
          }
        });
      },
      href:function(){
        window.location.href=this.$data.url;
      }
    }
}
</script>
<style lang="sass">
@import  "../../../common/sass/mixin.sass";
.getpage{
  .btn_box,.input{
    padding:toRem(30) toRem(64) 0 toRem(64);
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
    input{
      display:block;
      height:toRem(120);
      line-height:toRem(120);
      width:100%;
      background:#ffd527;
      font-size:toRem(30);
      color:#de520e;
      text-align:center;
      -webkit-border-radius:toRem(10);
      border-radius:toRem(10);
      border:none;
    }
  }
  p.info{
    padding:toRem(30) toRem(70);
    font-size:toRem(26);
    color:#4e2d1c;
    line-height:1.8em;
    span{
      display:block;
      width:100%;
      text-align:center;
      font-weight:bold;
    }
  }
  .layer{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.8);
    z-index:999;
    top:0;
    left:0;
    .alert{
      width:toRem(580);
      position:absolute;
      left:50%;
      top:50%;
      transform:translate3D(-50%,-50%,0);
      img{
        width:100%;
      }
      a{
        display:block;
        width:toRem(440);
        height:toRem(98);
        text-align:center;
        line-height:toRem(98);
        background:#de520e;
        font-size:toRem(34);
        color:#fbee50;
        border-radius:toRem(20);
        position:absolute;
        bottom:toRem(58);
        left:50%;
        transform:translateX(-50%);
      }
      p{
        position:absolute;
        width:100%;
        text-align:center;
        left:0;
        top:0;
        font-size:toRem(30);
        color:#4e2d1c;
        padding-top:toRem(76);
        line-height:1.5em;
      }
      i{
        position:absolute;
        width:toRem(66);
        height:toRem(66);
        background:url(<%route%>/images/close_icon.png) no-repeat;
        background-size:100% 100%;
        left:50%;
        margin-left:toRem(-33);
        bottom:toRem(-150);
      }
    }
  }
}
</style>