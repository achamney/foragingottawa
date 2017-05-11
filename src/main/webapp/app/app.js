require([
    'forage/nav',
    'forage/home',
    'forage/text',
    'forage/subscribe',
    'forage/captcha',
    'forage/about',
    'forage/heartbeat',
    'forage/profile',
    'forage/common',

    'forage/maps/maps',
    'forage/forum/forum'
], function (
    Nav, Home, Text, Subscribe, Captcha, About, Heartbeat, Profile, Common,
    Maps, Forum) {

    var Main = ng.core.Component({
        selector: 'app',
        templateUrl: 'app/app.html',
        providers: []
    })
    .Class({
        constructor: function () {
            this.page = 1;
            this.location = location;
            if (QueryString('page')) {
                this.page = parseInt(QueryString('page'));
            }
            window.addEventListener("hashchange", this.changeHash.bind(this));
        },
        changePage: function (event) {
            this.page = event.page;
        },
        changeHash: function() {
            this.changePage({ page: parseInt(QueryString('page') || "1") });
        }
    })
    Main = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [/*ng.router.ActivatedRoute, ng.common.Location*/])
    ], Main);
    var module = ng.core.NgModule({
        imports: [ng.platformBrowser.BrowserModule, Forum, Maps, Common],
        declarations: [Main, Home, Text, Nav, Subscribe, Captcha, About, Heartbeat, Profile],
        exports: [],
        bootstrap: [Main],
    })
        .Class({
            constructor: function () { }
        });
    ng.platformBrowserDynamic
        .platformBrowserDynamic()
        .bootstrapModule(module);
});

