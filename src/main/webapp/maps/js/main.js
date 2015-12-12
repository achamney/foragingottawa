var map;
require(['/quickforms/js/quickforms.js'],function(){
	quickforms.registerReadyFunction(function()
	{
		require(['esri/layers/FeatureLayer',"esri/graphic","esri/geometry/Point",
				"esri/symbols/SimpleMarkerSymbol","esri/Color","esri/renderers/SimpleRenderer",
				'server/getFactData','server/putFact'],
			function(FeatureLayer,Graphic,Point,SimpleMarkerSymbol,Color,SimpleRenderer){
				quickforms.getFactData({queryName:'getForageLocations',callback:function(data){
					data = JSON.parse(data);
					
					var featureCollection = {
						"layerDefinition": null,
						"featureSet": {
							"features": [],
							"geometryType": "esriGeometryPoint"
						}
					};
					featureCollection.layerDefinition = {
						"geometryType": "esriGeometryPoint",
						"objectIdField": "id",
						"fields": [{
							"name": "id",
							"alias": "id",
							"type": "esriFieldTypeOID"
						}]
					};
					
					var sms = new SimpleRenderer(new SimpleMarkerSymbol().setStyle(
						SimpleMarkerSymbol.STYLE_SQUARE).setColor(
						new Color([255,0,0,0.5])));
					data.forEach(function(row,i){
						row.id = i;
						var shape = new Point(Terraformer.ArcGIS.convert(Terraformer.WKT.parse(row.shape)));
						featureCollection.featureSet.features.push(new Graphic(shape,null,row));
					});
					var layer = new FeatureLayer(featureCollection,{
          				id: 'qfLayer'
					});
					layer.setRenderer(sms);
					map.addLayer(layer);
					window.layer = layer;
					map.on('click',function(e){
						var primPoint = Terraformer.ArcGIS.parse(e.mapPoint);
						var wkt = Terraformer.WKT.convert(primPoint);
						quickforms.putFactServer("app=foragingottawa&factTable=foragelocations&shape="+wkt,function(){
							console.log(arguments)
						});
					})
				}});
			});

	});
});
require(['esri/map', "dojo/domReady!"],function(Map){
	map = new Map("mainMap", {
		center: [-75.696188,45.419714],
		zoom: 13,
		basemap: "streets"
	});
	
	map.on("load", function() {
		//map.disableRubberBandZoom();
		//map.disableScrollWheelZoom();
		//map.disablePan();
	});
});