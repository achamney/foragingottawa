define([], function () {
    var counter = 0;
    var component = ng.core.Directive({
        selector: '[clickOutside]',
        outputs: ['outside']
    }).Class({

        constructor: function (ref) {
            this.ref = $(ref.nativeElement);
            this.outside = new ng.core.EventEmitter();
            this.counter = counter++;
            var _this = this;
        },
        ngOnInit: function () {
            var _this = this;
            window.setTimeout(function() {
                $(document).on("click.outside" + _this.counter, function(event) {
                    if(!$(event.target).closest(_this.ref).length) {
                        _this.outside.next();
                    }        
                });
            })
        },
        ngOnDestroy: function() {
            $(document).off("click.outside" + this.counter);
        }
    });
    component = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], component);
    return component;
});