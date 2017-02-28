require([
        'foragingottawa/nav',
        'foragingottawa/home',
        'foragingottawa/text',
        'foragingottawa/map',
        'foragingottawa/maps/map',
        'foragingottawa/subscribe',
        'foragingottawa/captcha',
        'foragingottawa/nls',

        'foragingottawa/forum/forum',
        'dojo/domReady!'
        ], function (Nav, Home, Text, Map, Maps, Subscribe, Captcha, Nls, Forum) {
            
    var Main = ng.core.Component({
        selector: 'app',
        templateUrl: 'app/app.html'
    }).Class({
        constructor: function () { 
            this.page = 1;
            if(QueryString['page']) {
                this.page = parseInt(QueryString['page']);
            }
        }, 
        changePage: function(event) {
            this.page = event.page;
        }
    });

    var module = ng.core.NgModule({
        imports: [ng.platformBrowser.BrowserModule, Forum],
        declarations: [ Main, Home, Text, Map, Maps, Nav, Subscribe, Nls, Captcha],
        bootstrap: [ Main ]
    })
    .Class({
      constructor: function() { }
    });
    ng.platformBrowserDynamic
      .platformBrowserDynamic()
      .bootstrapModule(module);
});


window.QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.href.substr(window.location.href.indexOf("?")+1); 
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();
