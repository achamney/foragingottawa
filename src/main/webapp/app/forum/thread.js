var hasLoaded = window.hasLoaded || false;
define([
    'forage/forum/mpost',
    'forage/forum/new-thread',
    'server/getFactData',
    'dom/form/text'
], function (Post, NewThread) {
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
                        return new Post(datum);
                    })
                    _this.threadTitle = json[0].title;
                    _this.boardName = json[0].boardName;
                    _this.board = json[0].boardsKey;
                    window.setTimeout(function () {
                        var post = QueryString('post'); 
                        if(post) {
                            $('#'+post).attr('tabindex',0).focus();    
                        }
                    });
                }
            });
        },
        ngOnInit: function() {
            this.username = getCookie('username');
        },
        reply: function () {
            var _this = this;
            this.replyFlag = true;
            window.setTimeout(function() {
                quickforms.parseForm( //formId*, app, fact*, callback
                                {formId:'newPost',
                                fact:'posts'});
                quickforms.currentFormnewPost.updateId = _this.updateId;
                $('textarea').focus();
            }, 50);
            this.token = getCookie('token');
        },

        replySubmit: function (body, el) {
            var redir = quickforms.formRedirect;
            var _this = this;
            quickforms.currentFormnewPost.childMap['token'].currentVal = getCookie('token');
            quickforms.currentFormnewPost.childMap['thread'].currentVal = this.thread;
            quickforms.currentFormnewPost.childMap['body'].currentVal = body;
            quickforms.formRedirect = this.onFinishPost.bind(this);
            quickforms.putFact(el, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            });
        },

        onFinishPost: function(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            var json = JSON.parse(data);
            var post = json[0].id;
            location.reload();
        },

        editPost: function(post) {
            this.updateId = post.id;
            this.replyText = post.body;
            this.reply();
        },

        quotePost: function(post) {
            this.replyText = "[quote][small] by "+post.username+"[/small][br][/br]"+post.body+"[/quote]";
            this.reply();
        },

        deletePost: function() {
            quickforms.executeQuery(quickforms.app, 'posts_delete_row',
                    'id='+this.updateId, function(){location.reload();});
        }
    });

});