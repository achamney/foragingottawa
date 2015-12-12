
require(['/quickforms/js/quickforms.js'],function(){
	quickforms.registerReadyFunction(function()
	{
		require(['server/getFactData','server/putFact'],
			function(){
				quickforms.getFactData({queryName:'test123',callback:function(){console.log(arguments);}});
				//quickforms.putFactServer("app=foragingottawa&factTable=foragelocations&shape=Point(10 10)",function(){console.log(arguments)});
			});

	});
});
require(['esri/map', "dojo/domReady!"],function(Map){
	var map = new Map("mainMap", {
		center: [-75.696188,45.419714],
		zoom: 13,
		basemap: "streets"
	});
	
	map.on("load", function() {
		map.disableRubberBandZoom();
		map.disableScrollWheelZoom();
		map.disablePan();
	});
});