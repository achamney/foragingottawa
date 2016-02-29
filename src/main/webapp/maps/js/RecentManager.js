

define([
    "dojo/_base/declare",
    "dojo/_base/Deferred",

    'esri/layers/GraphicsLayer',

    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Color",

    "esri/renderers/SimpleRenderer",
    "foragingottawa/Popup"

], function (declare, Deferred,
    GraphicsLayer,
    Graphic, Point, SimpleMarkerSymbol, Color,
    SimpleRenderer,
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