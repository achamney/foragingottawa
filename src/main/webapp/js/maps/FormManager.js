

define([
    "dojo/_base/declare",
    "dojo/_base/Deferred",
	
	'esri/layers/GraphicsLayer',
	
	"esri/graphic",
	"esri/geometry/Point", 
	"esri/symbols/SimpleMarkerSymbol",
	"esri/Color",
	
	"esri/renderers/SimpleRenderer",
	"foragingottawa/maps/Popup"
			
],function(declare,Deferred,
			GraphicsLayer,
			Graphic,Point,SimpleMarkerSymbol,Color,
			SimpleRenderer,
			Popup) {
				
	var FormManager = declare([], {
	
		dataManager:null,
	
		dom:null,
		lat:null,
		long:null,
		
		constructor: function(domId, dataManager){
			
			this.dataManager = dataManager;
			
			this.dom = $('#'+domId);
			this.lat = $('#addPointLat',this.dom);
			this.long = $('#addPointLong',this.dom);
			
			$('.ok', this.dom).click(dojo.hitch(this,this.submit));
		},
	
		setLatLong: function(projected){
			this.lat.val(projected.coordinates[0]).change();
			this.long.val(projected.coordinates[1]).change();
		},
		
		submit: function(){
			this.dataManager.submitPoint();
		}
	});
	return FormManager;
});