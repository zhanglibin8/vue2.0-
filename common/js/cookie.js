const myCookie = {
	set:function(cname, cvalue, exdays){
		var d = new Date();
		exdays = exdays || 1;
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));  
	    var expires = "expires="+d.toUTCString();  
	    document.cookie = cname + "=" + cvalue + "; " + expires; 
	},
	get:function(cname){
		var name = cname + "=";  
	    var ca = document.cookie.split(';');
	    for(var i=0;i<ca.length;i++) {  
	        var c = ca[i];  
	        while (c.charAt(0) == ' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
	    }  
	    return "";  
	},
	del:function(cname){
		var d = new Date();
		d.setTime(d.getTime() -1);  
		var v = this.get(cname);
		if(v != null){
			document.cookie = cname + '=' + v + ';expires=' + d.toUTCString;
		}
	}
};
export default myCookie;