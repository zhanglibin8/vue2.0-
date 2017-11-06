<template>
  <div>
    <div class="countdown" v-if=" duihuanCode == '0' ">
      <h3>距结束领取兑换码还有</h3>
      <div class="count_box">
        <span v-text="time.hour.split('')[0]"></span>
        <span v-text="time.hour.split('')[1]"></span>
        <b></b>
        <span v-text="time.min.split('')[0]"></span>
        <span v-text="time.min.split('')[1]"></span>
        <b></b>
        <span v-text="time.sec.split('')[0]"></span>
        <span v-text="time.sec.split('')[1]"></span>
      </div>
      <div class="btn_box">
        <a href="javascript:;" @click="getCode">领取兑换码</a>
      </div>
      <p class="info">凭兑换码可获得最高666元现金红包</p>
      <v-wait :waitingflog="waitingflog"></v-wait>
    </div>
    <v-gouse v-else :codenum="duihuanCode"></v-gouse>
  </div>
</template>

<script type="ecmascript-6">
import waiting from './waiting.vue';
import gouse from './gouse.vue';
export default {
    name: 'app',
    components: {
      'v-wait':waiting,
      'v-gouse':gouse
    },
    mounted: function(){
      //初始化页面
      this.init('//activity.app.autohome.com.cn/api/actiRedeem/getBasicInfo',{
        params:{
          timer:new Date().getTime()
        },
        timeout:3000
      });
    },
    data() {
        return {
          waitingflog:false,
          time:{
            hour:'00',
            min:'00',
            sec:'00'
          },
          duihuanCode:'0'
        }
    },
    methods:{
      //倒计时
      countdown:function(t){
        var that = this;
        var t = parseInt(t/1000),
            min=0,hour=0,sec=0;
        var chageTime = function(t){
          if(t==0){
            return;
          };
          t --;
          hour = parseInt(t / 60 / 60, 10);
          min = parseInt(t / 60 % 60, 10);
          sec = parseInt(t % 60, 10);
          that.$data.time.sec = sec > 9 ? '' + sec : '0' + sec;
          that.$data.time.min = min > 9 ? '' + min : '0' + min;
          that.$data.time.hour = hour > 9 ? '' + hour : '0' + hour;
          setTimeout(function(){
            chageTime(t);
          },1000)
        };
        chageTime(t);
      },
      init:function(apiurl,options){
        var that = this;
        if( localStorage._AutoCountDown ){
          this.$data.duihuanCode = localStorage._AutoCountDown;
          return;
        };
        options = options || null;
        this.$http.get(apiurl,options).then((response) => {
            response = response.body;
            if (response.returncode === 0) {
              that.$toast.show({
                text:'初始化页面成功'
              });
              var myDate = new Date(parseInt(response.result.serverTime));
              var year = myDate.getFullYear();
              var month = myDate.getMonth();
              var date = myDate.getDate();
              var _Date = new Date();
              _Date.setFullYear(year);
              _Date.setMonth(month);
              _Date.setDate(date);
              _Date.setHours(24);
              _Date.setMinutes(0);
              _Date.setSeconds(0);
              var cdown = _Date.getTime() - myDate;
              this.countdown(cdown);
            }else{
              that.$toast.show({
                text:'获取数据失败'
              });
            }
        },(response) => {
            that.$toast.show({
              text:'请检查网络'
            });
        })
      },
      //获取兑换码
      getCode:function(){
        this.$data.waitingflog = true;
        this.$http.get('//activity.app.autohome.com.cn/api/actiRedeem/getRedeemCode',{
          params:{},
          timeout:3000
        }).then((response) => {
          response = response.body;
          if (response.returncode === 0) {
            this.$toast.show({
              text:'获取兑换码成功'
            });
            localStorage._AutoCountDown = this.$data.duihuanCode = response.result.redeem_code;
            this.$data.waitingflog = false;
          }else{
            this.$toast.show({
              text:'获取兑换码失败'
            });
            this.$data.waitingflog = false;
          }
        },(response) => {
          this.$toast.show({
            text:'获取失败,请检查网络'
          });
          this.$data.waitingflog = false;
        });
        trackCustomEvent('auto_common_event',{'biz':'auto','scene':'activity','type':'click','action':'auto_activity_11_share_click','ctime':new Date().getTime(),'area':'middle','element':'share','pmark':'0'});
      }
    }
}
</script>
<style lang="sass">
@import  "../../../common/sass/mixin.sass";
.countdown{
  padding:toRem(10) 0;
  h3{
    font-size:toRem(34);
    text-align:center;
    font-weight:bold;
    color:#4e2d1c;
  }
  .count_box{
    padding:toRem(36) 0;
    text-align:center;
    span{
      display:inline-block;
      width:toRem(60);
      height:toRem(106);
      line-height:toRem(106);
      margin:0 toRem(10);
      background:url(<%route%>/images/number_bg.png) no-repeat;
      background-size:100% 100%;
      font-size:toRem(74);
      color:#fbee50;
      text-align:center;
      vertical-align:top;
    }
    b{
      display:inline-block;
      position:relative;
      width:toRem(8);
      height:toRem(106);
      vertical-align:top;
      &:after,&:before{
        content:'';
        display:block;
        width:toRem(8);
        height:toRem(8);
        background:#252525;
        position:absolute;
      }
      &:after{
        top:toRem(32);
      }
      &:before{
        bottom:toRem(32);
      }
    }
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
}
</style>