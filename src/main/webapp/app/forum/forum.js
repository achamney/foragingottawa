define([
    'forage/forum/boards',
    'forage/forum/threads',
    'forage/forum/thread',
    'forage/forum/new-thread'
    ], function (Boards, Threads, Thread, NewThread) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [ Boards, Threads, Thread, NewThread ],
            exports: [ Boards, Threads, Thread ]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});