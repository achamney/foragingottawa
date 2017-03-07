define([
    'forage/forum/boards',
    'forage/forum/threads',
    'forage/forum/thread',
    'forage/forum/new-thread',
    'forage/forum/bbcodeEditor',
    'forage/bbcode',
    'forage/nls',
    ], function (Boards, Threads, Thread, NewThread, bbcodeEditor, BBCode, Nls ) {
        var module = ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [ Boards, Threads, Thread, NewThread, BBCode, bbcodeEditor, Nls],
            exports: [ Boards, Threads, Thread, BBCode, Nls]
        })
        .Class({
            constructor: function() { }
        });
        return module;
});