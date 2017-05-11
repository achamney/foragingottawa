define([
    'forage/common',

    'forage/maps/map',
    'forage/maps/visit',
    'forage/maps/edit-visit',
    'forage/maps/gmap'
    ], function (Common, 
    Map, Visit, EditVisit, GMap
    ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule, Common],
            declarations: [Map, GMap, Visit, EditVisit],
            exports: [Map, EditVisit]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});