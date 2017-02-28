var hasLoaded;
define([
    'foragingottawa/forum/mthread',
    'server/getFactData'
], function (Thread, Board) {
    return ng.core.Component({
        selector: 'threads',
        templateUrl: 'app/forum/threads.html',
        outputs: ["changePage"]
    }).Class({
        constructor: function () {
            this.changePage = new ng.core.EventEmitter();
            if(!hasLoaded) {
                quickforms.loadCss('app/forum/css/forum.css');
                hasLoaded = true;
            }
            if(QueryString['board']) {
                this.board = parseInt(QueryString['board']);
            }
            var _this = this;
            quickforms.getFactData({
                queryName: "getThreads",
                params: "board="+this.board,
                callback: function (data) {
                    var json = JSON.parse(data);
                    _this.threads = json.map(function(datum) {
                        return new Thread(datum);
                    })
                }
            });
        },
        openThread: function(thread) {
            window.location = "#?page=6&thread="+thread.id;
            this.changePage({ page: 6, thread: thread.id });
        }
    });

});