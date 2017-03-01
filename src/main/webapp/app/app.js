require([
    'forage/nav',
    'forage/home',
    'forage/text',
    'forage/map',
    'forage/subscribe',
    'forage/captcha',
    'forage/nls',

    'forage/forum/forum'
], function (Nav, Home, Text, Map, Subscribe, Captcha, Nls, Forum) {

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
            this.changePage({ page: parseInt(QueryString('page')) });
        }
    })
    Main = Reflect.decorate([
        Reflect.metadata("design:paramtypes", [/*ng.router.ActivatedRoute, ng.common.Location*/])
    ], Main);
    var routes = [{ path: '', component: Home },
                { path: 'forum', component: Forum }];
    var module = ng.core.NgModule({
        imports: [ng.platformBrowser.BrowserModule, Forum],
        declarations: [Main, Home, Text, Map, Nav, Subscribe, Nls, Captcha],
        bootstrap: [Main]
    })
        .Class({
            constructor: function () { }
        });
    ng.platformBrowserDynamic
        .platformBrowserDynamic()
        .bootstrapModule(module);
});


window.QueryString = function (name) {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.href.substr(window.location.href.indexOf("?") + 1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string[name];
};
