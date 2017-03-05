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
        updateText: function (textarea, key) {
            this.text = textarea.value.replace(/\n/g,'[br][/br]');
        },
        bbTag: function (tag, textarea) {
            textarea.value += "["+tag+"][/"+tag+"]";
        }
    });
    return BBCodeEditor;
});