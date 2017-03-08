define([
    'forage/bbcode',
    'forage/nls',

    'forage/maps/map',
    'forage/maps/gmap'
    ], function (BBCode, Nls, 
    Map, GMap
    ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [Map, GMap],
            exports: [Map]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});