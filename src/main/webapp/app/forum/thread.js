var hasLoaded;
define([
    'server/getFactData'
], function (Board) {
    return ng.core.Component({
        selector: 'thread',
        templateUrl: 'app/forum/thread.html',
        outputs: ["changePage"]
    }).Class({
        constructor: function () {
            this._boards = [];
            this.changePage = new ng.core.EventEmitter();
            if(!hasLoaded) {
                quickforms.loadCss('app/forum/css/forum.css');
                hasLoaded = true;
            }
            var _this = this;
            /*quickforms.getFactData({
                queryName: "getBoards",
                callback: function (data) {
                    var json = JSON.parse(data);
                    _this.boards = json.map(function(datum) {
                        return new Board(datum);
                    })
                }
            });*/
        },
        openBoard: function(board) {
            window.location = "#?page=5&board="+board.id;
            this.changePage({ page: 5, board: board.id });
        }
    });

});