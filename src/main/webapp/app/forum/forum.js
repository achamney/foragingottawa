define([
    'foragingottawa/forum/boards',
    'foragingottawa/forum/threads',
    'foragingottawa/forum/thread',
    'dojo/domReady!'
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