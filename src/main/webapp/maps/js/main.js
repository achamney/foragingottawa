
require(['/quickforms/js/quickforms.js'],function(){
	quickforms.registerReadyFunction(function()
	{
		require(['esri/map','foragingottawa/DataManager', 'foragingottawa/FormManager',
                'foragingottawa/RecentManager',
				'server/getFactData','dom/form/text','dom/form/date'],
		function(Map, DataManager, FormManager, RecentManager){
			var dm = new DataManager();
            var recentManager = new RecentManager();
			var formManager = new FormManager('addPointForm', dm);
			var map = new Map("mainMap", {
				center: [-75.696188,45.419714],
				zoom: 13,
				basemap: "streets"
			});
	
			map.on("load", function() {
				dm.getLayer('getForageLocations').then(function(layer){
					map.addLayer(layer);
                    recentManager.renderRecent(layer.graphics);
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
                            
            $('#mapTabs #recentTab').click(function(){
                $(this).addClass("active");
                $('#addLocationTab').removeClass("active");
                $('#recentView').show();
                $('#addLocationView').hide();
            });
            $('#mapTabs #addLocationTab').click(function(){
                $(this).addClass("active");
                $('#recentTab').removeClass("active");
                $('#recentView').hide();
                $('#addLocationView').show();
            });
		});
	});
});