
require(['/quickforms/js/quickforms.js'],function(){
	quickforms.registerReadyFunction(function()
	{
		require(['esri/map','foragingottawa/DataManager',
				'server/getFactData','dom/form/text'],
		function(Map, DataManager){
			var dm = new DataManager();
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
			});
			
			quickforms.parseForm( //formId*, app, fact*, callback
							{formId:'addPointPopup',
							fact:'foragelocations'});

		});
	});
});