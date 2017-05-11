define([
    'forage/nls',
    'forage/bbcode',
    'forage/clickoutside'
    ], function (Nls, Bbcode, Clickoutside) {
        var module = ng.core.NgModule({
            imports: [],
            declarations: [Nls, Bbcode, Clickoutside],
            exports: [Nls, Bbcode, Clickoutside]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});