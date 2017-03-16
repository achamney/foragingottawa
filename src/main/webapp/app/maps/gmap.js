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
        }
    });
    component = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], component);
    return component;
});