

define([
    "dojo/_base/declare",
    "dojo/_base/Deferred",
    "foragingottawa/Popup"

], function (declare, Deferred,
    Popup) {

var RecentManager=declare([],{
        
    dom:null,
         
    constructor:function(){
        this.dom = $('#recentView');
    },
    
    renderRecent: function(data){
        var _this = this;
        data.forEach(function(datum){
            _this.dom.append(JSON.stringify(datum.attributes));
        })
    }

});
     return RecentManager
});