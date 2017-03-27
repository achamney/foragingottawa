define([], function() {
    var center = { lat: 45.3858482, lng: -75.7100154 };
    var zoom = 12;
    var component = ng.core.Component({
        selector: 'map',
        template: '',
        inputs: ['data', 'newMarker', 'newPoint'],
        outputs: ['create']
    }).Class({
        
        constructor: function (ref) {
            this.ref = ref.nativeElement;
            this.create = new ng.core.EventEmitter(); 
            this.createSetters();
        },
        
        ngOnInit: function () {
        },
        ngOnChanges: function (changes) {
            var _this = this;
            if(this.mapImpl && !changes.newPoint) return;
            this.mapImpl = {}; // Temp map impl
            window.setTimeout(function() {
                _this.initMap();
            });
        },

        initMap: function() {
            var _this = this;
            this.mapImpl = new google.maps.Map(this.ref, {
                zoom: zoom,
                center: center,
                scrollwheel: !this.newPoint
            });
            this.tempMarker = null;
            if(this.newPoint) {
                this.mapImpl.addListener("click", function(e) {
                    _this.create.next(e.latLng);
                });
            }
            this.mapImpl.addListener("center_changed", function(e) {
                center.lat = _this.mapImpl.center.lat();
                center.lng = _this.mapImpl.center.lng();
            });
            this.mapImpl.addListener("zoom_changed", function(e) {
                zoom = _this.mapImpl.zoom;
            });
            this.addDataToMap();
        },

        createSetters: function() {    
            Object.defineProperty(this, 'newMarker', { 
                set: function (newMarker) { 
                    if(!newMarker) return;
                    var _this = this;
                    this._newMarker = newMarker;
                    if (this.tempMarker) {
                        this.tempMarker.setMap(null);
                    }
                    newMarker.map = this.mapImpl;
                    this.tempMarker = new google.maps.Marker(newMarker);    
                    this.tempMarker.addListener('dragend', function(e) {
                        _this.create.next(e.latLng);
                    });
                }, 
                get: function() { return this._newMarker; }
            });
            Object.defineProperty(this, 'data', { 
                set: function (data) { 
                    this._data = data;
                    if (this._data) {
                        this.addDataToMap();
                    }
                }, 
                get: function() { return this._data; }
            });
        },

        registerClick: function(marker, mapImpl, popupObj) {
            var infowindow = new google.maps.InfoWindow(popupObj);
            marker.addListener('click', function() {
                infowindow.open(mapImpl, marker);
            });
        },

        addDataToMap: function() {
            var _this = this;
            if(!this._data) return;
            for(var datum of this._data) {
                datum.map = this.mapImpl;
                var popupObj = {
                    content: "<h3>"+datum.title+"</h3>"+
                    "<p><small>"+datum.date+"</small></p>"+
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
                var marker = new google.maps.Marker(datum);
                _this.registerClick(marker, _this.mapImpl, popupObj);
            }
        }
    });
    component = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], component);
    return component;
});