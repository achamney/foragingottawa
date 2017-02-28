define([
    'forage/map',
    'forage/text',
    "quickforms/server/getFactData"
], function (Map, Text) {
    return ng.core.Component({
        selector: 'home',
        templateUrl: 'app/home.html',
        directives: [Map, Text]
    }).Class({
        constructor: function () {
            var _this = this;
            quickforms.getFactData({
                queryName: "getBlogPosts", 
                callback: function(data) {
                    var blogPosts;
                    try {
                        blogPosts = JSON.parse(data);
                    } catch(e) { }
                    _this.blogPosts = blogPosts || [];
                }

            })
        }
    });

});