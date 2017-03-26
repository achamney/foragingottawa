define([], function() {
    var BBCodeEditor = ng.core.Component({
        selector: 'bbcodeEditor',
        inputs: ['text'],
        templateUrl: 'app/forum/bbcodeEditor.html',
    }).Class({
        
        constructor: function (ref) {
            this.ref = ref.nativeElement;
        },
        
        ngOnChanges: function () {
            if(this.text) {
                $('textarea', this.ref)[0].value = this.text;
            }
        },
        updateText: function (textarea, key) {
            this.text = textarea.value.replace(/\n/g,'[br][/br]');
        },
        bbTag: function (tag, textarea) {
            if(tag === "img.big") {
                textarea.value += "[img=block][/img]";
            } else {
                textarea.value += "["+tag+"][/"+tag+"]";
            }
        }
    });
    BBCodeEditor = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [ng.core.ElementRef])
    ], BBCodeEditor);
    return BBCodeEditor;
});