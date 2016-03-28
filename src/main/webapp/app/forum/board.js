define(['dojo/_base/declare'], function (declare) {
    return declare(null, {
        constructor: function(json) {
            this.icon = json.icon || "board";    
            this.name = json.name || "Name";
            this.description = json.description || "Description";
            this.topicCount = json.topicCount || 0;
        }
    });
});