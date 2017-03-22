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
            this.type = "default";
            this.token = getCookie("token");


            if (!hasLoaded) {
                quickforms.loadCss('app/forum/css/forum.css');
                hasLoaded = true;
            }
            if (QueryString('board')) {
                this.board = parseInt(QueryString('board'));
            }
            if (QueryString('type')) {
                this.type = QueryString('type');
            }


            var queryName = "getThreads";
            var params = "board=" + this.board;
            if (this.type === 'recent') {
                queryName = "getRecentPosts"
                params = "";
            } else if (this.type === 'search') {
                return this.doSearch();
            }
            this.loading = true;
            quickforms.getFactData({
                queryName: queryName,
                params: params,
                callback: this.threadResponse.bind(this)
            });
        },

        threadResponse: function (data) {
            this.loading = false;
            if(isJSONString(data)) {
                var json = JSON.parse(data);
                this.threads = json.map(function (datum) {
                    return new Thread(datum);
                })
                this.boardName = json[0].boardName;
            } else {
                this.threads = [];
            }
        },

        openThread: function (thread) {
            var update = "updateid=" + thread.id + "&views=" + (thread.views + 1) + "&app=foragingottawa&factTable=threads";
            quickforms.putFactServer(update, function () { });
            window.location = "#?page=6&thread=" + thread.id;
            this.changePage.next({ page: 6, thread: thread.id });
        },

        startNewThread: function () {
            this.newThread = true;
        },

        goToLatest: function (thread, e) {
            var update = "updateid=" + thread.id + "&views=" + (thread.views + 1) + "&app=foragingottawa&factTable=threads";
            quickforms.putFactServer(update, function () { });
            window.location = "#?page=6&thread=" + thread.id + "&post=" + thread.replyKey;
            e.stopImmediatePropagation();
        },

        openSearch: function (searchTerm) {
            this.searchTerm = searchTerm;
            window.location = "#?page=5&type=search&search=" + searchTerm;
            this.doSearch();
        },

        doSearch: function() {
            queryName = "searchPosts";
            this.searchTerm = QueryString('search') || this.searchTerm;
            var s = "%" + this.searchTerm + "%";
            params = "1=" + s + ",2=" + s + ",3=" + s + ",4=" + s + ",5=" + s + ",6=" + s + ",7=" + s + ",8=" + s + ",9=" + s + ",10=" + s;

            quickforms.getFactData({
                queryName: queryName,
                params: params,
                callback: this.threadResponse.bind(this)
            });
        },

        blogBoard: function() { // Only allow new thread on blog board if:
            return this.board!==2 || getCookie('username')==="Austin";
        }
    });

});