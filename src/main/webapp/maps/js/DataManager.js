
define([
    "dojo/_base/declare",
    "dojo/_base/Deferred",
	
	'esri/layers/GraphicsLayer',
	
	"esri/graphic",
	"esri/geometry/Point", 
	"esri/symbols/SimpleMarkerSymbol",
	"esri/Color",
	
	"esri/renderers/SimpleRenderer",
	"foragingottawa/Popup"
			
],function(declare,Deferred,
			GraphicsLayer,
			Graphic,Point,SimpleMarkerSymbol,Color,
			SimpleRenderer,
			Popup) {
				
var DataManager = declare([], {
	
	layer:null,
	showPopup:null,
	tempPoint:null,
	
	constructor: function(){
		this.showPopup = new Popup('showPointPopup');
	},
	getLayer: function(queryName){
		var dfd = new Deferred();
		quickforms.getFactData({queryName:queryName,callback:dojo.hitch(this,function(data){
			
			
			this.layer = new GraphicsLayer();
			if(data!="]") {
				data = JSON.parse(data);
				data.forEach(dojo.hitch(this,function(row,i){
					row.foragelocationsKey = parseInt(row.foragelocationsKey);
					var shape = new Point(row.latitude,row.longitude);
					this.layer.add(new Graphic(shape,null,row));
				}));
			}
			var renderer = new SimpleRenderer(new SimpleMarkerSymbol().setStyle(
					SimpleMarkerSymbol.STYLE_SQUARE).setColor(
					new Color([255,0,0,0.5])));
			
			this.layer.setRenderer(renderer);
			dfd.resolve(this.layer);
		})});
		return dfd.promise;
	},
	
	submitPoint: function() {
		var dfd = new Deferred(),
			data="app=foragingottawa&factTable=foragelocations",
			pt = new Graphic(this.tempPoint.geometry,null,{});
		
		data += "&"+quickforms.currentFormaddPointForm.serialize();
		
		this.layer.remove(this.tempPoint);
		quickforms.currentFormaddPointForm.children.forEach(function(child){
			pt.attributes[child.name] = child.currentVal;
		});
		this.layer.add(pt)
		
		quickforms.putFactServer(data,function(returnId){
			dfd.resolve(returnId);
		});
		return dfd.promise;
	},
	
	clickPoint: function(event) {
		if(event.graphic) {
			this.showPopup.show(event);
			this.showPopup.populate(event.graphic.attributes);
		}
		else {
			this.layer.remove(this.tempPoint);
			this.tempPoint = new Graphic(event.mapPoint);
			this.layer.add(this.tempPoint);
		}
	}
	
});
return DataManager;
});