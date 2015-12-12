var root=location.pathname.replace(/\/[^/]+$/, "");
window.dojoConfig = { 
	paths: { quickforms:  root+ "../quickforms/js/",
			js: root+"/js/",
			"dom":  "/quickforms/js/dom/",
			"server":  "/quickforms/js/server/",
			"helper":  "/quickforms/js/helper/",
			"jquery":  "/quickforms/js/jquery/",
			"google":  "/quickforms/js/google/", 
			'foragingottawa':  "js/",
			'jq': '/quickforms/js/jquery/jquery-1.7.1.min'
	}	
};