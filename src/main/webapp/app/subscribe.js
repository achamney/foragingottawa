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
            quickforms.putFact(el, "/");
            var username = quickforms.currentFormformTemplate.children.filter(function(c){return c && c.id==="username"})[0];
            setCookie("username", username.currentVal);
        },
        
        resolveCaptcha: function(cap) {
            this.captchad = cap;
        }
    });

});