define([
    'forage/bbcode',
    'forage/nls',
    'forage/clickoutside',

    'forage/maps/map',
    'forage/maps/gmap'
    ], function (BBCode, Nls, Clickoutside, 
    Map, GMap
    ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [Map, GMap, Clickoutside],
            exports: [Map]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});