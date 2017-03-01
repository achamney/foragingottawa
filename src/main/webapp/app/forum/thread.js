var hasLoaded = window.hasLoaded || false;
define([
    'forage/forum/mpost',
    'forage/forum/new-thread',
    'server/getFactData'
], function (Thread, NewThread) {
    return ng.core.Component({
        selector: 'thread',
        templateUrl: 'app/forum/thread.html',
        outputs: ["changePage"],
        directives: [NewThread]
    }).Class({
        constructor: function () {
            this.changePage = new ng.core.EventEmitter();
            this.threadTitle = "";
            this.boardName = "";
            this.board;
            this.posts = [];
            if(QueryString('thread')) {
                this.thread = parseInt(QueryString('thread'));
            }

            if(!hasLoaded) {
                quickforms.loadCss('app/forum/css/forum.css');
                hasLoaded = window.hasLoaded = true;
            }
            var _this = this;
            quickforms.getFactData({
                queryName: "getPosts",
                params: "thread="+this.thread,
                callback: function (data) {
                    var json = JSON.parse(data);
                    _this.posts = json.map(function(datum) {
                        return new Thread(datum);
                    })
                    _this.threadTitle = json[0].title;
                    _this.boardName = json[0].boardName;
                    _this.board = json[0].boardsKey;
                }
            });
        }
    });

});