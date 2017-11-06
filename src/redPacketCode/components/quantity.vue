<template>
  <div>
    <div class="quantity" v-if=" duihuanCode == '0' ">
      <h3>限量5000个 先到先得</h3>
      <div class="quantity_box">
        兑换码剩余数量:{{quantity}}
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
          'timer':new Date().getTime()
        },
        timeout:3000
      });
    },
    data() {
        return {
          waitingflog:false,
          quantity:'0',
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
        if( localStorage._AutoQuantity ){
          this.$data.duihuanCode = localStorage._AutoQuantity;
          return;
        };
        this.$http.get(apiurl,options).then((response) => {
            response = response.body;
            if (response.returncode === 0) {
                that.$toast.show({
                  text:'初始化页面成功'
                });
                that.$data.quantity = response.result.remainNumber;
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
            localStorage._AutoQuantity = this.$data.duihuanCode = response.result.redeem_code;
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
.quantity{
  padding:toRem(10) 0;
  h3{
    font-size:toRem(34);
    text-align:center;
    font-weight:bold;
    color:#4e2d1c;
  }
  .quantity_box{
    padding:toRem(36) 0;
    text-align:center;
    font-size:toRem(50);
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
}
</style>