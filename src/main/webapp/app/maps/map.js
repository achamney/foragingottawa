var hasLoaded = false;
define(['server/getFactData','dom/form/text'],
                function(){
    return ng.core.Component({
        selector: 'maps',
        templateUrl: 'app/maps/map.html'
    }).Class({

        constructor: function () {
            if(!hasLoaded) {
                quickforms.loadCss('app/maps/css/map.css');
                hasLoaded = true;
            }

        },
        ngOnInit: function () {
        }
    });
});