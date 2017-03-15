var hasMapLoaded = false;
define(['server/getFactData','dom/form/text', 'dom/form/date'],
                function(){
    return ng.core.Component({
        selector: 'maps',
        templateUrl: 'app/maps/map.html'
    }).Class({

        constructor: function () {
            if(!hasMapLoaded) {
                quickforms.loadCss('app/maps/css/map.css');
                hasMapLoaded = true;
            }

        },
        ngOnInit: function () {
            window.setTimeout(function() {
                quickforms.parseForm( //formId*, app, fact*, callback
                                {formId:'addPointForm',
                                fact:'forageLocations'});
            }, 200);
            this.username = getCookie("username");
        },
        setPosition: function (latLng) { 
            if(!this.username) return;
            var lat = quickforms.currentFormaddPointForm.childMap['addPointLat'],
                long = quickforms.currentFormaddPointForm.childMap['addPointLong'];
            lat.currentVal=latLng.lat();
            long.currentVal=latLng.lng();
            lat.dom.val(lat.currentVal);
            long.dom.val(long.currentVal);
        },
        submit: function(btn) {
            var redir = quickforms.formRedirect;
            var _this = this;
            quickforms.formRedirect = this.onFinish.bind(this);
            quickforms.currentFormaddPointForm.childMap['token'].currentVal = getCookie('token');
            quickforms.putFact(btn, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            });
            this.loading = true;
        },
        
        onFinish(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            window.location="#?page=2";
        }, 
        onError: function(data) {
            if(~data.indexOf("Duplicate entry")) {
                this.duplicate = true;
            }
        }
    });
});