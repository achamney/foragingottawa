define([
    'forage/forum/boards',
    'forage/forum/threads',
    'forage/forum/thread',
    'forage/forum/new-thread',
    'forage/forum/bbcodeEditor',
    'forage/bbcode'
    ], function (Boards, Threads, Thread, NewThread, bbcodeEditor, BBCode ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [ Boards, Threads, Thread, NewThread, BBCode, bbcodeEditor],
            exports: [ Boards, Threads, Thread, BBCode]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});