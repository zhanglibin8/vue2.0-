<template>
	<div class="header">
		<img :src="headerinfo.bg" alt="">
        <p>
            {{headerinfo.txt}}
        </p>
	</div>
</template>
<script type="ecmascript-6">
export default {
    name: 'header',
    components: {
    },
    mounted: function(){
    },
    props: {
      headerinfo: {
        type: Object
      }
    },
    data () {
        return {}
    }
}
</script>
<style lang="sass">
.header{
    position:relative;
    img{
        display:block;
        width:100%;
    }
    p{
        position:absolute;
        top:20px;
        left:15px;
        font-size:17px;
        height:52px;
        line-height:26px;
        color:#2873FF;
        width:70%;
        overflow : hidden;
    }
}
</style>