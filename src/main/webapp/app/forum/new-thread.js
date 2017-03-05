define([
    "quickforms/server/getFactData",
    'quickforms/dom/form/text'
], function () {
    return ng.core.Component({
        selector: 'new-thread',
        templateUrl: 'app/forum/new-thread.html',
        inputs: ['board']
    }).Class({

        constructor: function () {
        },
        
        ngOnInit: function () {
            quickforms.parseForm( //formId*, app, fact*, callback
							{formId:'formTemplate',
							fact:'threads'});
            this.token = getCookie('token');
        },

        submitForm: function (el, body) {
            var redir = quickforms.formRedirect;
            var _this = this;
            this.finishButton = el;
            this.body = body;
            quickforms.currentFormformTemplate.childMap['token'].currentVal = getCookie('token');
            quickforms.currentFormformTemplate.childMap['board'].currentVal = this.board;
            quickforms.formRedirect = this.onFinishThread.bind(this);
            quickforms.putFact(el, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            });
        },

        onFinishThread: function(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            var _this = this;
            var json = JSON.parse(data);
            this.thread = json[0].id;
            quickforms.currentFormformTemplate.fact="posts";
            quickforms.currentFormformTemplate.childMap['thread'].currentVal = json[0].id;
            quickforms.currentFormformTemplate.childMap['body'].currentVal = this.body;
            quickforms.formRedirect = this.onFinish.bind(this);
            quickforms.putFact(this.finishButton, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            });
        },
        
        onFinish: function(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            window.location="#?page=6&thread="+this.thread;
        },

        onError: function(data) {
            if(~data.indexOf("Duplicate entry")) {
                this.duplicate = true;
            }
        }
    });

});