define(['dojo/_base/declare'], function (declare) {
    return declare(null, {
        constructor: function(json) {
            this.icon = json.icon || "board";    
            this.name = json.name || "Name";
            this.posts = json.posts || 101;
            this.threads = json.threads || 12;
            this.latestPost = json.latestPost || "Post 101";
            this.description = json.description || "Description";
            this.topicCount = json.topicCount || 0;
        }
    });
});