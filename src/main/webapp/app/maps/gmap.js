define([], function() {
    var component = ng.core.Component({
        selector: 'map',
        template: '',
        inputs: ['data', 'newMarker'],
        outputs: ['create']
    }).Class({
        
        constructor: function (ref) {
            this.ref = ref.nativeElement;
            this.create = new ng.core.EventEmitter(); 
            this.createSetters();
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
                this.tempMarker = null;
                this.mapImpl.addListener("click", function(e) {
                    _this.create.next(e.latLng);
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "<h1>HelloWorld</h1>"
                });
            }
        },
        createSetters: function() {    
            Object.defineProperty(this, 'newMarker', { 
                set: function (newMarker) { 
                    if(!newMarker) return;
                    this._newMarker = newMarker;
                    if (this.tempMarker) {
                        this.tempMarker.setMap(null);
                    }
                    newMarker.map = this.mapImpl;
                    this.tempMarker = new google.maps.Marker(newMarker);    
                }, 
                get: function() { return this._newMarker; }
            });
            Object.defineProperty(this, 'data', { 
                set: function (data) { 
                    this._data = data;
                    if (this._data) {
                        for(var datum of this._data) {
                            datum.map = this.mapImpl;
                            var marker = new google.maps.Marker(datum);
                            marker.addListener('click', function() {
                                infowindow.open(_this.mapImpl, marker);
                            });
                        }
                    }
                }, 
                get: function() { return this._data; }
            });
        }
    });
    component = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], component);
    return component;
});