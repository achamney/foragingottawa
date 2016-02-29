var hasLoaded = false;
define(['esri/map','foragingottawa/maps/DataManager', 'foragingottawa/maps/FormManager',
				'server/getFactData','dom/form/text','dom/form/date'],
                function(Map, DataManager, FormManager){
    return ng.core.Component({
        selector: 'maps',
        templateUrl: 'js/maps/map.html'
    }).Class({

        constructor: function () {
            if(!hasLoaded) {
                quickforms.loadCss('js/maps/css/map.css');
                hasLoaded = true;
            }

        },
        ngOnInit: function () {
            var dm = new DataManager();
            var formManager = new FormManager('addPointForm', dm);
            var map = new Map("mainMap", {
                center: [-75.696188, 45.419714],
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
        }
    });
});