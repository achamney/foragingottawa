
require(['/quickforms/js/quickforms.js'],function(){
	quickforms.registerReadyFunction(function()
	{
		require(['esri/map','foragingottawa/DataManager', 'foragingottawa/FormManager',
				'server/getFactData','dom/form/text','dom/form/date'],
		function(Map, DataManager, FormManager){
			var dm = new DataManager();
			var formManager = new FormManager('addPointForm', dm);
			var map = new Map("mainMap", {
				center: [-75.696188,45.419714],
				zoom: 13,
				basemap: "streets"
			});
	
			map.on("load", function() {
				dm.getLayer('getForageLocations').then(function(layer){
					map.addLayer(layer);
				});
			});
			
			map.on('click',function(e){
				dm.clickPoint(e);
				var projected = Terraformer.ArcGIS.parse(e.mapPoint);
				formManager.setLatLong(projected);
			});
			
			quickforms.parseForm( //formId*, app, fact*, callback
							{formId:'addPointForm',
							fact:'foragelocations'});

		});
	});
});