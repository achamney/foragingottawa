define([
    'forage/forum/boards',
    'forage/forum/threads',
    'forage/forum/thread',
    'forage/forum/new-thread',
    'forage/forum/bbcodeEditor',
    'forage/common',
    ], function (Boards, Threads, Thread, NewThread, bbcodeEditor, Common ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule, Common],
            declarations: [ Boards, Threads, Thread, NewThread, bbcodeEditor],
            exports: [ Boards, Threads, Thread]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});