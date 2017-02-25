define(function(){ 
	var config = {};
	config.jqueryVersion="1.7.1.min";
	config.jqueryMobileVersion="1.3.2.min";
	config.jqueryMobileCss = "/quickforms/css/jquery/jquery.mobile-1.3.2.min.css";
	config.jqueryDataTableCss = "/quickforms/css/jquery/jquery.dataTables.css";
	config.jqueryMobileTheme = "";
	config.jqueryUITheme = "";
	config.quickformsUrl = "/quickforms/";
	config.loginCss = "http://foragingottawa.ca/quickforms/css/quickforms/login.css";
	
	config.dataNativeMenu = false;
	config.dataTransferType = 'text';
	config.app = 'foragingottawa';             ////////////////////** Required//////////////////////////
	config.quickformsEnding = ""; // "" or ".asp"
	config.defaultPageTransition = "none"; // slide, pop, none
	config.defaultDialogTransition = "none"; // slide, pop, none
	
	config.version = '1.0';
	config.build = '1001';
	config.debug = false; // kills cache of js/css files if true
	
    config.jqueryMobileEnable = true;
	config.extraScripts = ["js/auth.js"]; // set to empty array if app does not require login
	
	config.offline = false;
	return config;
});