define([], function() {
    var component = ng.core.Component({
        selector: 'map',
        template: '',
        inputs: ['data'],
        outputs: ['newMarker']
    }).Class({
        
        constructor: function (ref) {
            this.ref = ref.nativeElement;
            this.newMarker = new ng.core.EventEmitter(); 
        },
        
        ngOnInit: function () {
            if(!this.mapImpl) {
                $(this.map).css({ "height": 300, "width":"100%" });
                var coords = { lat: 45.3768482, lng: -75.7100154 };
                var _this = this;
                this.mapImpl = new google.maps.Map(this.ref, {
                    zoom: 12,
                    center: coords,
                    scrollwheel: false
                });
                var tempMarker = null;
                this.mapImpl.addListener("click", function(e) {
                    if(tempMarker) {
                        tempMarker.setMap(null);
                    }
                    tempMarker = new google.maps.Marker({
                        position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
                        map: _this.mapImpl,
                        title: 'Hello World!'
                    });
                    _this.newMarker.next(e.latLng);
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "<h1>HelloWorld</h1>"
                });
                if (this.data) {
                    for(var datum of this.data) {
                        var marker = new google.maps.Marker({
                            position: { lat: datum.lat, lng: datum.long },
                            map: this.mapImpl,
                            title: 'Hello World!'
                        });
                        marker.addListener('click', function() {
                            infowindow.open(_this.mapImpl, marker);
                        });
                    }
                }
            }
        }
    });
    component = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], component);
    return component;
});