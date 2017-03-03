define([], function() {
    var BBCodeEditor = ng.core.Component({
        selector: 'bbcodeEditor',
        inputs: ['text'],
        templateUrl: 'app/forum/bbcodeEditor.html',
    }).Class({
        
        constructor: function () {
        },
        
        ngOnInit: function () {
        },
        updateText: function (textarea) {
            this.text = textarea.value;
        },
        bbTag: function (tag, textarea) {
            textarea.value += "["+tag+"][/"+tag+"]";
        }
    });
    return BBCodeEditor;
});