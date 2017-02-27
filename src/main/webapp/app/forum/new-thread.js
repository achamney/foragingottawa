define([
    "quickforms/server/getFactData",
    'quickforms/dom/form/text'
], function () {
    return ng.core.Component({
        selector: 'new-thread',
        templateUrl: 'app/forum/new-thread.html'
    }).Class({

        constructor: function () {
        },
        
        ngOnInit: function () {
            quickforms.parseForm( //formId*, app, fact*, callback
							{formId:'formTemplate',
							fact:'thread'});
        },

        submitForm: function (el) {
            if(!this.captchad) return;
            var redir = quickforms.formRedirect;
            var _this = this;
            quickforms.formRedirect = this.onFinish.bind(this);
            quickforms.putFact(el, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            })
        },

        onFinish: function(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            var username = quickforms.currentFormformTemplate.children.filter(function(c){return c && c.id==="username"})[0];
            setCookie("username", username.currentVal);
            var dataJson = JSON.parse(data);
            setCookie("token", dataJson[0].token);
            window.location.href="/";
        },

        onError: function(data) {
            if(~data.indexOf("Duplicate entry")) {
                this.duplicate = true;
            }
        }
    });

});