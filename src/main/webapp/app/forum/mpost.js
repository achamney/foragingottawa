define([], function () {
    return function(json) {
            this.title = json.name || "Name";
            this.body = json.body;
            this.createdDate = json.createdDate;
            this.username = json.username;
            this.thread = json.threadsKey;
            this.id = json.postsKey;
        };
});