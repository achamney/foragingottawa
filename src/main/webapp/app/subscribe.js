define([
    'foragingottawa/captcha',
    "quickforms/server/getFactData",
    'quickforms/dom/form/text'
], function (Captcha) {
    return ng.core.Component({
        selector: 'subscribe',
        templateUrl: 'app/subscribe.html',
        directives: [Captcha]
    }).Class({
        constructor: function () {
        },
        
        ngOnInit: function () {
            quickforms.parseForm( //formId*, app, fact*, callback
							{formId:'formTemplate',
							fact:'users'});
        },

        submitForm: function (el) {
            if(!this.captchad) return;
            var redir = quickforms.formRedirect;
            quickforms.formRedirect = this.success;
            quickforms.putFact(el, "/");
            quickforms.formRedirect = redir;
        },
        
        resolveCaptcha: function(cap) {
            this.captchad = cap;
            var captcha = quickforms.currentFormformTemplate.children.filter(function(c){return c && c.id==="captcha"})[0];
            captcha.currentVal = cap;
        },

        success: function(data) {
            var username = quickforms.currentFormformTemplate.children.filter(function(c){return c && c.id==="username"})[0];
            setCookie("username", username.currentVal);
            var dataJson = JSON.parse(data);
            setCookie("token", dataJson[0].token);
            window.location.href="/";
        }
    });

});