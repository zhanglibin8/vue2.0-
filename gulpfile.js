var gulp = require('gulp');
var webpack = require('webpack-stream');
var vinylName = require('vinyl-named');
var webpackConfig = require("./webpack.config.js");
var parseArgs  = require('minimist');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var browserSync=require("browser-sync");
var runSequence = require('run-sequence'); 
var replace = require('gulp-replace');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
//添加MD5戳
//var rev=require("gulp-rev");
//替换原始文件中的js引用
//var revCollect=require("gulp-rev-collector");
// 参数
var argv = parseArgs(process.argv.slice(2),{ //获取参数
    string: ['origin'],
    default: {
        'origin': 'nofound',
    }
});
var projectName = argv.origin == 'nofound' ? '**' : argv.origin;
var srcPath = 'src/' + projectName;//src文件路径;
// 不同执行方式对应路径
var buildPath = 'build/local/' + projectName;
function buildtype(runtype){
	buildPath = 'build/'+ runtype + '/' + projectName;
};
//本地环境
var localRoute = 'http://localhost:3000';
// 测试环境替换路径测试并输出 基于dev
var testRoute = '//x1.autoimg.cn/app/mainSoftware/activity/'+projectName;
// 线上环境替换路径并输出 基于test
var onlineRoute = '//x.autoimg.cn/app/mainSoftware/activity/'+projectName;
var nowRoute;
//创建项目
gulp.task('init',function(){
	//若文件不存在，则创建文件，否则打开已有文件
	fs.exists(srcPath, function(exists) {
	    if(exists){
	    	runSequence(['local','connect']);
	    }else{
	    	ensureDir(srcPath);
	    };
	});
});
//创建对应文件
function ensureDir(srcPath){
    fs.mkdirSync(srcPath);
    fs.mkdirSync(srcPath+'/components');
    fs.mkdirSync(srcPath+'/css');
    fs.mkdirSync(srcPath+'/js');
    fs.mkdirSync(srcPath+'/images');
    createIndexHtml(srcPath);
    createEntryJs(srcPath);  
    createApp(srcPath);
    createResetCss(srcPath);
};
//创建index.html的模板
function createIndexHtml(srcPath){
var str =
`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="Cache-Control" content="no-transform"/>
        <meta http-equiv="Cache-Control" content="no-siteapp"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta content="yes" name="apple-touch-fullscreen"/>
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
        <link rel="stylesheet" type="text/css" href="<%route%>/css/reset.css">
        <title></title>
    </head>
    <body>
        <div id="app"></div>
        <script src="<%route%>/js/main.js"></script>
    </body>
</html>`;
	fs.writeFileSync(srcPath + '/index.html', str);
};
//创建入口文件
function createEntryJs(srcPath){
    var str = 
`import Vue from 'vue';
import app from './components/app.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueFontSize from '../../common/js/changeFontSize.js';
import $ from 'zepto-browserify';
Vue.use(VueRouter);
Vue.use(VueResource);
//字体初始化(html width:320 fontSize:12)
Vue.use(VueFontSize);
new Vue({
   el: '#app',
   render: function(func){
        return func(app);
   }
})`
    fs.writeFileSync(srcPath + '/main.js', str);
};
//创建app.vue
function createApp(srcPath){
	var str = 
`<template>
  <div>Hello World!</div>
</template>

<script type="ecmascript-6">
export default {
    name: 'app',
    components: {
    },
    mounted: function(){
    },
    data () {
        return {
        }
    }
}
</script>
<style lang="sass">
@import  "../../../common/sass/mixin.sass";
</style>`
	fs.writeFileSync(srcPath + '/components/app.vue', str)
};
//创建reset.css
function createResetCss(srcPath){
    var str = 
`html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section {
    display: block;
}

body {
    line-height: 1;
}

blockquote, q {
    quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* custom */
a {
    color: #7e8c8d;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
}

li {
    list-style: none;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

html, body {
    width: 100%;
}

body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}`
    fs.writeFileSync(srcPath + '/css/reset.scss', str)
};
//css相关 
gulp.task('sass', function () {
    if(buildPath.indexOf('local')>-1){
        nowRoute = localRoute;
        return gulp.src(srcPath + '/css/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(replace('<%route%>',localRoute))
            .pipe(changed(buildPath+'/css'))
            .pipe(gulp.dest(buildPath+'/css'))
    }else if(buildPath.indexOf('test')>-1){
        nowRoute = testRoute;
        return gulp.src(srcPath + '/css/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(replace('<%route%>',testRoute))
            //.pipe(rev())
            .pipe(gulp.dest(buildPath+'/css'))
            // .pipe(rev.manifest())
            .pipe(gulp.dest(buildPath+'/css'))
    }else if(buildPath.indexOf('online')>-1){
        nowRoute = onlineRoute;
        return gulp.src(srcPath + '/css/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(replace('<%route%>',onlineRoute))
            //.pipe(rev())
            .pipe(gulp.dest(buildPath+'/css'))
            // .pipe(rev.manifest())
            .pipe(gulp.dest(buildPath+'/css'))
    };
});

gulp.task('prefixer', function () {
    return gulp.src(buildPath + '/css/*.css')
        .pipe(autoprefixer({
            browsers: ["last 20 versions"]
        }))
        .pipe(gulp.dest(buildPath+'/css'));
});

gulp.task('copy-html',function(){
    if(buildPath.indexOf('local')>-1){
        return gulp.src(srcPath + "/*.html").pipe(replace('<%route%>',localRoute)).pipe(gulp.dest(buildPath+'/'));
    }else if(buildPath.indexOf('test')>-1){
        return gulp.src(srcPath + "/*.html").pipe(replace('<%route%>',testRoute)).pipe(gulp.dest(buildPath+'/'));
    }else if(buildPath.indexOf('online')>-1){
        return gulp.src(srcPath + "/*.html").pipe(replace('<%route%>',onlineRoute)).pipe(gulp.dest(buildPath+'/'));
    }
});

gulp.task('copy-js',function(){
    if(buildPath.indexOf('local')>-1){
        return gulp.src(srcPath + "/js/*.js").pipe(gulp.dest(buildPath+'/js/'));
    }else if(buildPath.indexOf('test')>-1){
        return gulp.src(srcPath + "/js/*.js").pipe(gulp.dest(buildPath+'/js/'));
    }else if(buildPath.indexOf('online')>-1){
        return gulp.src(srcPath + "/js/*.js").pipe(gulp.dest(buildPath+'/js/'));
    }
});


gulp.task('imagesmin',function(){
    if(buildPath.indexOf('local')>-1){
        return gulp.src([srcPath + "/images/*.*"])
            .pipe(changed( buildPath+'/images' ))
            .pipe(gulp.dest( buildPath+'/images' ))
    }else{
        return gulp.src([srcPath + "/images/*.*"])
            .pipe(imagemin({
                progresssive:true
            }))
            .pipe(gulp.dest( buildPath+'/images/' ))
    }
});

gulp.task('connect', function() {

    browserSync.init({
        server: {
            baseDir: './build/local/' + projectName + '/',
            directory: true
        },
        reloadDelay:1000
    });

    gulp.watch(srcPath+'/**/*.*', ['local']);
    gulp.watch(buildPath+'/**/*.*').on("change", browserSync.reload);

});
// 实时监听
gulp.task('watch',function(){
    runSequence('local','connect');
});

gulp.task("cleantest",function(){
    gulp.src(['./build/test/'+projectName+'/**/*.*'])
        .pipe(clean());
});
gulp.task("cleanonline",function(){
    gulp.src('./build/online/'+projectName+'/**/*.*')
        .pipe(clean());
});

gulp.task("webpack",function(){
    if(buildPath.indexOf('local')>-1){
        return gulp.src(srcPath+"/main.js")
            .pipe(vinylName())
            .pipe(webpack(webpackConfig))
            .pipe(replace('<%route%>',nowRoute))
            .pipe(gulp.dest(buildPath+'/js'))
    }else{
        return gulp.src(srcPath+"/main.js")
            .pipe(vinylName())
            .pipe(webpack(webpackConfig))
            .pipe(replace('<%route%>',nowRoute))
            //.pipe(rev())
            .pipe(gulp.dest(buildPath+'/js'))
            // .pipe(rev.manifest())
            .pipe(gulp.dest(buildPath+'/js'));
    }
    
});
//更新html中旧的js引用
// gulp.task("rev",['webpack'],function(){
//     return gulp.src([buildPath+"/**/*.json",buildPath+"/index.html"])
//     .pipe(revCollect())
//     .pipe(gulp.dest(buildPath));
// });

//本地打包（本地预览使用）
gulp.task('local',function(){
	buildtype('local');
	runSequence('copy-html','copy-js','sass','prefixer','imagesmin','webpack');
});
//打包测试环境
gulp.task('test',function(){
    buildtype('test');
    // runSequence('cleantest','copy-html','sass','prefixer','imagesmin','webpack','rev');
    runSequence('cleantest','copy-html','copy-js','sass','prefixer','imagesmin','webpack');
});
//打包生产环境
gulp.task('online',function(){
    buildtype('online');
    // runSequence('cleanonline','copy-html','sass','prefixer','imagesmin','webpack','rev');
    runSequence('cleanonline','copy-html','copy-js','sass','prefixer','imagesmin','webpack');
});