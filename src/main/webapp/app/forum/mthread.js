define(['dojo/_base/declare'], function (declare) {
    return declare(null, {
        constructor: function(json) {
            this.icon = json.icon || "board";    
            this.name = json.name || "Name";
            this.user = json.user;
            this.views = json.views || 0;
            this.replies = json.replies || 0;
            this.replyDate = json.replyDate;
            this.replyUser = json.replyUser;
            this.replyKey = json.replyKey;
            this.board = json.board;
            this.id = json.threadsKey;
        }
    });
});