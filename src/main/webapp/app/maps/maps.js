define([
    'forage/bbcode',
    'forage/nls',
    'forage/clickoutside',

    'forage/maps/map',
    'forage/maps/visit',
    'forage/maps/edit-visit',
    'forage/maps/gmap'
    ], function (BBCode, Nls, Clickoutside, 
    Map, Visit, EditVisit, GMap
    ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [Map, GMap, Clickoutside, Visit, EditVisit],
            exports: [Map, EditVisit]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});