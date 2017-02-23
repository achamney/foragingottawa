define([], function() {
    return ng.core.Component({
        selector: 'map',
        template: '<ng-content></ng-content>',
        inputs: ['coordinates', 'map']
    }).Class({
        
        constructor: function () {
        },
        
        ngOnInit: function () {
            if(!this.mapImpl) {
                $(this.map).css({ "height": 300, "width":"100%" });
                var coords = { lat: parseFloat(this.coordinates.latitude), lng: parseFloat(this.coordinates.longitude) };
                this.mapImpl = new google.maps.Map(this.map, {
                    zoom: 17,
                    center: coords
                });
            }
        }
    });
});