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
                    var _this = this;
                    if (this._data) {
                        for(var datum of this._data) {
                            datum.map = this.mapImpl;
                            var popupObj = {
                                content: "<h1>"+datum.title+"<small class='pull-right'>"+datum.date+"</small></h1>"+
                                "<p>by "+datum.username+"</p>"+
                                "<p>"+datum.description+"</p>"
                            };
                            if(datum.img) {
                                popupObj.content += "<img src='"+datum.img+"' width=200>";
                            }
                            var username = getCookie("username");
                            if(datum.username === username) {
                                popupObj.content += "<br><button class='btn btn-primary' onclick='window.location=\"#?page=2&id="+datum.id+"\";location.reload();'>Edit</button>";
                            }
                            var infowindow = new google.maps.InfoWindow(popupObj);
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