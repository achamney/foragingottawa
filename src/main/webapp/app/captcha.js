define([], function() {
    return ng.core.Component({
        selector: 'captcha',
        template: '<ng-content></ng-content>',
        inputs: ['container', 'val'],
        outputs: ['cb']
    }).Class({
        
        constructor: function () {
            this.cb = new ng.core.EventEmitter();
        },
        
        ngOnInit: function () {
            var _this = this;
            this.captcha = window.grecaptcha.render(this.container, {
                    'sitekey': '6LfKlxYUAAAAANr8DKt2jskKv3mqYfxhwJXNlVXM',
                    callback: function(response) { _this.cb.next(response); }
            });
        },

        ngOnChanges: function() {
            if(this.savedVal !== this.val) {
                this.savedVal = this.val;
                if(this.captcha || this.captcha === 0) {
                    grecaptcha.reset();
                }
            }
        }
    });
});