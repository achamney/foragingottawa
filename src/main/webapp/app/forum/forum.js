var hasLoaded;
define(['foragingottawa/forum/board'], function (Board) {
    return ng.core.Component({
        selector: 'forum',
        templateUrl: 'app/forum/forum.html'
    }).Class({
        constructor: function () {
            if(!hasLoaded) {
                quickforms.loadCss('app/forum/css/forum.css');
                hasLoaded = true;
            }
            this.boards = [new Board({}),new Board({}),new Board({})]
        }
    });

});