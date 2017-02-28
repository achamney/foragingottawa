define([
    'forage/forum/boards',
    'forage/forum/threads',
    'forage/forum/thread'
    ], function (Boards, Threads, Thread) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [ Boards, Threads, Thread ],
            exports: [ Boards, Threads, Thread ]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});