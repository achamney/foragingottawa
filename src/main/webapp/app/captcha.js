define([], function() {
    var Recaptcha = ng.core.Component({
        selector: 'captcha',
        template: '<ng-content></ng-content>',
        inputs: ['val'],
        outputs: ['cb']
    }).Class({
        
        constructor: function (ref) {
            this.cb = new ng.core.EventEmitter();
            this.container = ref.nativeElement;
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
    Recaptcha = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], Recaptcha);
    return Recaptcha;
    
});