<template>
 <transition name="fadeIn">
  <div class="alertBox" v-if="show">
    <p>{{text}}</p>
  </div>
 </transition>
</template>
 
<script>
export default {
 data() {
  return {
  }
 },
 props: {
  show: { // 是否显示此toast
   default: false
  },
  text: { // 提醒文字
   default: ''
  }
 },
 mounted() {
 },
 computed:{}
}
</script>
 
<style lang="sass">
.alertBox{
  position: fixed;
  width:100%;
  height:100%;
  z-index:9999;
  left:0;
  top:0;
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
    border-radius: 10px;
    -webkit-border-radius: 10px;
  }
}
.fadeIn-enter-active, .fadeIn-leave-active{
transition: opacity .3s;
}
.fadeIn-enter, .fadeIn-leave-active{
opacity: 0;
}
</style>