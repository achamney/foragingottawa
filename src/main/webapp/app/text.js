define([], function() {
    return ng.core.Component({
        selector: 'text',
        template: '<ng-content></ng-content>',
        inputs: ['textContainer', 'text']
    }).Class({
        
        constructor: function () {
        },
        
        ngOnInit: function () {
            $(this.textContainer).html(this.text);
        }
    });
});