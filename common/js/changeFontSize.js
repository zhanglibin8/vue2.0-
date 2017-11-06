const chageBaseFontSize = {};
chageBaseFontSize.install = function (Vue, options) {
	if (chageBaseFontSize.installed) return
	var baseSize = options || 12;
	var baseWidth = 320,nowWidth = document.documentElement.clientWidth;
	nowWidth = nowWidth >= 750 ? 750 : (nowWidth<=320 ? 320 : window.innerWidth);
	
	window.addEventListener('DOMContentLoaded',function(){
		document.documentElement.style.fontSize = nowWidth / baseWidth * baseSize + 'px';
	},false);
  Vue.prototype.changeSize = chageBaseFontSize
};

export default chageBaseFontSize;