var _AutoDown = function(opt){
    var  isPlatform = {
        UA : navigator.userAgent,
        isAndroid : function(){
            return this.UA.indexOf('Android') > -1 || this.UA.indexOf('Adr') > -1;
        },
        isIos : function(){
            return {
                ios:!!this.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                version: !!this.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? parseInt((navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1],10) : 0
            };
        },
        isCanUseYYB : function(){
            return this.UA.toLowerCase().indexOf('micromessenger') > -1;
        }
    };
    var config = {
        scheme_Ios: 'autohome://',
        scheme_Adr: 'autohome://',
        scheme_YYB_Ios : 'http://comm.app.autohome.com.cn/go/',
        scheme_YYB_Adr: '',
        download_url_ios: '',
        download_url_andorid: '',
        download_url_YYB_ios: '',
        download_url__YYB_andorid:'',
        timeout:1500
    };
    for(var key in opt){
        config[key] = opt[key];
    };
    function getIos9Scheme(s){
        if(isPlatform.isCanUseYYB()){
            return config.scheme_YYB_Ios + config.scheme_Ios.substr(s.length)+'&downsrc='+encodeURIComponent(config.download_url_YYB_ios);
        }else{
            return config.scheme_YYB_Ios + config.scheme_Ios.substr(s.length) +'&downsrc='+encodeURIComponent(config.download_url_ios);
        };
    };
    var platform_type = 0;
    if(isPlatform.isCanUseYYB()){
        if(isPlatform.isIos().ios&&isPlatform.isIos().version>=9){
            /*ios9+ 应用宝*/
            platform_type = 1;
        }else if((isPlatform.isIos().ios && isPlatform.isIos().version<9)||isPlatform.isAndroid()){
            /*ios9-或android 应用宝*/
            platform_type = 2;
        }else{
            return;
        };
    }else{
        if(isPlatform.isIos().ios&&isPlatform.isIos().version>=9){
            /*ios9+ 浏览器*/
            platform_type = 1;
        }else if((isPlatform.isIos().ios && isPlatform.isIos().version<9)||isPlatform.isAndroid()){
            /*ios9-或android 浏览器*/
            platform_type = 3;
        }else{
            return;
        }
    };
    function godown(type){
        if(type==1){
            return function(){
                window.location.href = getIos9Scheme('autohome://');
            };
        }else if(type==2){
            var _url;
            if(isPlatform.isIos().ios){
                _url = config.download_url_YYB_ios;
            }else{
                _url = config.download_url__YYB_andorid;
            };
            return function(){
                window.location.href = _url;
            };
        }else{
            var schemeUrl,downUrl;
            if(isPlatform.isIos().ios){
                schemeUrl = config.scheme_Ios;
                downUrl = config.download_url_ios;
            }else{
                schemeUrl = config.scheme_Adr;
                downUrl = config.download_url_andorid;
            };
            function openApp(openUrl, callback) {
                var intHandle = null, clearIntHandle = function () {
                    clearInterval(intHandle);
                };
                function checkOpen(cb) {
                    var timeout = config.timeout,
                    cycleCount = 20,
                    timeoutCount = timeout / cycleCount,
                    threshold = timeout + timeoutCount + 650;
                    var _clickTime = +(new Date());
                    function check(elsTime) {
                        if (elsTime > threshold || document.hidden || document.webkitHidden){
                            cb(true);
                        } else {
                            cb(false);
                        }
                    };
                    var _count = 0;
                    intHandle = setInterval(function () {
                        _count++;
                        var elsTime = +(new Date()) - _clickTime;
                        if (_count >= timeoutCount || elsTime > threshold){  
                            clearIntHandle();
                            check(elsTime);
                        };
                    }, cycleCount);
                };
                var aLink = null;
                if(navigator.userAgent.toLowerCase().indexOf('huawei')>-1){
                    aLink = document.createElement("iframe"),
                    body = document.body;
                    aLink.style.cssText = "display:none;width:0px;height:0px;";
                    aLink.src = openUrl;
                    body.appendChild(aLink);
                }else{
                    aLink = document.createElement("a"),
                    body = document.body;
                    aLink.style.cssText = "display:none;width:0px;height:0px;";
                    aLink.href = openUrl;
                    body.appendChild(aLink);
                    aLink.click();
                };
                if (callback) {
                    checkOpen(function (opened) {
                        callback && callback(opened);
                    });
                };
                var visibilitychange = function () {
                    var tag = document.hidden || document.webkitHidden;
                    tag && clearIntHandle();;
                };
                document.addEventListener('visibilitychange', visibilitychange, false);
                document.addEventListener('webkitvisibilitychange', visibilitychange, false);
                window.addEventListener('pagehide', function () {
                    clearIntHandle();
                }, false);
                window.addEventListener('blur', function () {
                    clearIntHandle();
                }, false);
            };
            return function(){
                openApp(schemeUrl, function (opend) {
                    if (!opend){
                        window.location.href = downUrl;
                    };
                });
                /*window.location.href = downUrl;*/
            };
        }
    };
    return godown(platform_type);
};

export default _AutoDown;