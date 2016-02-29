require([
        'foragingottawa/nav',
        'foragingottawa/home',
        'foragingottawa/maps/map',
        'foragingottawa/forum/forum',
        '/quickforms/js/quickforms.js',
        'dojo/domReady!'
        ], function (Nav, Home, Maps, Forum) {
            
    var Main = ng.core.Component({
        selector: 'app',
        templateUrl: 'js/app.html',
        directives: [Nav, Home, Maps, Forum]
    }).Class({
        constructor: function () { 
            this.page = 1;
            if(QueryString['page']) {
                this.page=parseInt(QueryString['page']);
            }
        }
    });
    ng.platform.browser.bootstrap(Main);
});


var QueryString = function () {
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