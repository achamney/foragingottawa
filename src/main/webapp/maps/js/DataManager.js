
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
	addPopup:null,
	showPopup:null,
	
	constructor: function(){
		this.addPopup = new Popup('addPointPopup');
		this.showPopup = new Popup('showPointPopup');
	},
	getLayer: function(queryName){
		var dfd = new Deferred();
		quickforms.getFactData({queryName:queryName,callback:dojo.hitch(this,function(data){
			data = JSON.parse(data);
			
			this.layer = new GraphicsLayer();
			
			data.forEach(dojo.hitch(this,function(row,i){
				row.foragelocationsKey = parseInt(row.foragelocationsKey);
				var shape = new Point(Terraformer.ArcGIS.convert(Terraformer.WKT.parse(row.shape)));
				this.layer.add(new Graphic(shape,null,row));
			}));
			
			var renderer = new SimpleRenderer(new SimpleMarkerSymbol().setStyle(
					SimpleMarkerSymbol.STYLE_SQUARE).setColor(
					new Color([255,0,0,0.5])));
			
			this.layer.setRenderer(renderer);
			dfd.resolve(this.layer);
		})});
		return dfd.promise;
	},
	
	submitPoint: function(mapPoint) {
		var dfd = new Deferred(),
			primPoint = Terraformer.ArcGIS.parse(mapPoint),
			wkt = Terraformer.WKT.convert(primPoint),
			data="app=foragingottawa&factTable=foragelocations&shape="+wkt;
		
		data += "&"+quickforms.currentFormaddPointPopup.serialize();
		
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
			var gfx = new Graphic(event.mapPoint);
			this.layer.add(gfx);
			this.addPopup.show(event).then(dojo.hitch(this,function(submit) {
				if(submit) {
					this.submitPoint(event.mapPoint);
				}
				else {
					this.layer.remove(gfx);
				}
			}));
		}
	}
	
});
return DataManager;
});