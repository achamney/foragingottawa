define([], function () {
    return ng.core.Component({
        selector: 'nav',
        templateUrl: 'js/nav.html',
        inputs: ['page'],
        outputs: ['changePage']
    }).Class({

        constructor: function () {
            this.changePage = new ng.core.EventEmitter();
            this.navs = [{
                    id:1,
                    title: "Home"
                }, {
                    id:2,
                    title: "Maps"
                }, {
                    id:3,
                    title: "About"
                }, {
                    id:4,
                    title: "Forum"
                }];
        },
        changeTab: function(nav) {
            this.page = nav.id;
            this.changePage.next(nav.id);
        }
    });

});