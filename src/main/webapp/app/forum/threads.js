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
            var _this = this;
            quickforms.getFactData({
                queryName: "getThreads",
                callback: function (data) {
                    var json = JSON.parse(data);
                    _this.threads = json.map(function(datum) {
                        return new Thread(datum);
                    })
                }
            });
        },
        openBoard: function(board) {
            window.location = "#?page=5&board="+board.id;
            this.changePage({ page: 5, board: board.id });
        }
    });

});