define([], function () {
    return function(json) {
            this.icon = json.icon || "board";    
            this.name = json.name || "Name";
            this.posts = json.posts || 101;
            this.threads = json.threads || 12;
            this.latestPost = json.latestThread || "Post 101";
            this.latestThreadId = json.latestThreadId || 1;
            this.latestPostId = json.latestPostId || 1;
            this.latestThreadUser = json.latestThreadUser || 1;
            this.latestPostDate = json.latestThreadDate || '2012-01-01';
            this.description = json.description || "Description";
            this.topicCount = json.topicCount || 0;
            this.id = json.boardsKey;
        };
});