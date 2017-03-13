define([
    'forage/captcha',
    "server/getFactData",
    'dom/form/text'
], function (Captcha) {
    return ng.core.Component({
        selector: 'subscribe',
        templateUrl: 'app/subscribe.html',
        directives: [Captcha]
    }).Class({
        constructor: function () {
        },
        
        ngOnInit: function () {
            window.setTimeout(function() {
                quickforms.parseForm( //formId*, app, fact*, callback
                                {formId:'formTemplate',
                                fact:'users'});
            }, 200);
        },

        submitForm: function (el, captcha) {
            if(!this.captchad) return;
            var redir = quickforms.formRedirect;
            var _this = this;
            quickforms.formRedirect = this.onFinish.bind(this);
            quickforms.putFact(el, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            });
            this.loading = true;
            this.username = "";
        },
        
        resolveCaptcha: function(cap) {
            this.captchad = cap;
            var captcha = quickforms.currentFormformTemplate.children.filter(function(c){return c && c.id==="captcha"})[0];
            captcha.currentVal = cap;
        },

        onFinish: function(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            var username = quickforms.currentFormformTemplate.children.filter(function(c){return c && c.id==="username"})[0];
            setCookie("username", username.currentVal);
            var dataJson = JSON.parse(data);
            setCookie("token", dataJson[0].token);
            window.location.href="/";
            this.loading = false;
        },

        onError: function(data) {
            if(~data.indexOf("Duplicate entry")) {
                this.duplicate = true;
                grecaptcha.reset();
                this.loading = false;
            }
        }
    });

});