define(function(){ 
	var config = {};
	config.jqueryVersion="1.7.1.min";
	config.jqueryMobileVersion="1.3.2.min";
	config.jqueryMobileCss = "/quickforms/css/jquery/jquery.mobile-1.3.2.min.css";
	config.jqueryDataTableCss = "/quickforms/css/jquery/jquery.dataTables.css";
	config.jqueryMobileTheme = "";
	config.jqueryUITheme = "";
	config.quickformsUrl = "http://foragingottawa.ca/quickforms/";
	config.loginCss = "quickforms/login.css";
	
	config.dataNativeMenu = false;
	config.dataTransferType = 'jsonp';
	config.app = 'foragingottawa';             ////////////////////** Required//////////////////////////
	config.quickformsEnding = ""; // "" or ".asp"
	config.defaultPageTransition = "none"; // slide, pop, none
	config.defaultDialogTransition = "none"; // slide, pop, none
	
	config.version = '1.0';
	config.build = '1001';
	config.debug = true; // kills cache of js/css files if true
	
    config.jqueryMobileEnable = true;
	config.extraScripts = []; // set to empty array if app does not require login
	
	config.offline = false;
	return config;
});