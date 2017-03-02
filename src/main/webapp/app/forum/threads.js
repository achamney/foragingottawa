var hasLoaded;


define([
    'forage/forum/mthread',
    'server/getFactData',
    'helper/helper'
], function (Thread, Board) {
    return ng.core.Component({
        selector: 'threads',
        templateUrl: 'app/forum/threads.html',
        outputs: ["changePage"],
        directives: []
    }).Class({
        constructor: function () {
            this.changePage = new ng.core.EventEmitter();
            this.boardName = "";
            this.token = getCookie("token");
            if (!hasLoaded) {
                quickforms.loadCss('app/forum/css/forum.css');
                hasLoaded = true;
            }
            if (QueryString('board')) {
                this.board = parseInt(QueryString('board'));
            }
            var _this = this;
            quickforms.getFactData({
                queryName: "getThreads",
                params: "board=" + this.board,
                callback: function (data) {
                    var json = JSON.parse(data);
                    _this.threads = json.map(function (datum) {
                        return new Thread(datum);
                    })
                    _this.boardName = json[0].boardName;
                }
            });
        },

        openThread: function (thread) {
            window.location = "#?page=6&thread=" + thread.id;
            this.changePage.next({ page: 6, thread: thread.id });
        },

        startNewThread: function () {
            this.newThread = true;
        },

        goToLatest: function (thread, e) {
            window.location = "#?page=6&thread=" + thread.id + "&post=" + thread.replyKey;
            e.stopImmediatePropagation();
        }
    });

});