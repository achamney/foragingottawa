define([], function () {
    return ng.core.Component({
        selector: 'nav',
        templateUrl: 'app/nav.html',
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
                    title: "Maps",
                    disabled: true
                }, {
                    id:3,
                    title: "About",
                    disabled: true
                }, {
                    id:4,
                    title: "Forum",
                    disabled: true
                }];
        },
        ngOnInit: function() {
            this.username = quickforms.username;
        },
        changeTab: function(nav, e) {
            if(nav.disabled) return;
            this.page = nav.id;
            this.changePage.next({ page : nav.id });
        }
    });

});