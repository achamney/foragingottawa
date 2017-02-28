var root=location.pathname.replace(/\/[^/]+$/, "");
window.dojoConfig = { 
	paths: { quickforms:  "/quickforms/js/",
			js: root+"app/",
			"dom":  "/quickforms/js/dom",
			"server":  "/quickforms/js/server",
			"helper":  "/quickforms/js/helper",
			"jquery":  "/quickforms/js/jquery",
			"google":  "/quickforms/js/google", 
			'foragingottawa':  root+"app/",
			'jq': '/quickforms/js/jquery/jquery-1.7.1.min'
	}	
};
require.config && require.config( {
	// 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.3.min")
	packages : [
		{name : "dom", location: "/quickforms/js/dom"},
		{name : "server", location: "/quickforms/js/server"},
		{name : "helper", location: "/quickforms/js/helper"},
		{name : "jquery", location: "/quickforms/js/jquery"},
		{name : "google", location: "/quickforms/js/google"},
		{name : "quickforms", location: "/quickforms/js/" },
		{name : "forage", location: root+"app/" },
		{name : "js", location: root+"app/" },
		{name : "jq", location: '/quickforms/js/jquery/jquery-1.7.1.min' },
	],
	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {
		"jqm": {
				"deps": [ "jq"]
		}
	}
} );