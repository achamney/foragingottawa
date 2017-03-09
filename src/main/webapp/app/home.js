define([
    'forage/text',
    "quickforms/server/getFactData"
], function (Text) {
    return ng.core.Component({
        selector: 'home',
        templateUrl: 'app/home.html',
        directives: [Text]
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
        },
        goToComments: function(thread) {
            window.location="#?page=6&thread="+thread.id;
        }
    });

});