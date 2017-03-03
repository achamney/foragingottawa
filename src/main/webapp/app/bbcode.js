define([], function() {
    var BBCode = ng.core.Component({
        selector: 'bbcode',
        inputs: ['text'],
        template: ''
    }).Class({
        
        constructor: function (ref) {
            this.ref = ref;
        },
        
        ngOnInit: function () {
        },

        ngOnChanges: function() {
            var result = XBBCODE.process({
                text: this.text,
                removeMisalignedTags: true,
                addInLineBreaks: false
            });
            $(this.ref.nativeElement).html(result.html);
        }
    });
    BBCode = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], BBCode);
    return BBCode;
});