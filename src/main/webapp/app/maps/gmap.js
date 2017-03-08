define([], function() {
    var component = ng.core.Component({
        selector: 'map',
        template: '',
        inputs: ['data']
    }).Class({
        
        constructor: function (ref) {
            this.ref = ref.nativeElement;
        },
        
        ngOnInit: function () {
            if(!this.mapImpl) {
                $(this.map).css({ "height": 300, "width":"100%" });
                var coords = { lat: 45.3768482, lng: -75.7100154 };
                this.mapImpl = new google.maps.Map(this.ref, {
                    zoom: 12,
                    center: coords,
                    scrollwheel: false
                });
                if (this.data) {
                    for(var datum of this.data) {
                        var marker = new google.maps.Marker({
                            position: { lat: datum.lat, lng: datum.long },
                            map: this.mapImpl,
                            title: 'Hello World!'
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