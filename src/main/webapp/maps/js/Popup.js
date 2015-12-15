
define([
    "dojo/_base/declare",
    "dojo/Deferred"
			
],function(declare, Deferred) {
	
var Popup = declare([], {
	
	dom: null,
	retDeferred: null,
	blocker:null,
	
	constructor:function(domId){
		this.dom = $('#'+domId);
		$('.ok',this.dom).on('click',dojo.hitch(this,this.ok));
		$('.cancel',this.dom).on('click',dojo.hitch(this,this.cancel));
	},
	
	show: function (event) {
		this.dom.removeClass("hide");
		var top = event.screenPoint.y,
			left = event.screenPoint.x;
		if(left+this.dom.width()-12 > this.dom.parent().width())
			left =  this.dom.parent().width() - this.dom.width()-12;
		if(top+this.dom.height()-12 > this.dom.parent().height())
			top =  this.dom.parent().height() - this.dom.height()-12;
		this.dom.css({left:left,
					  top: top});
					  
		this.blocker = $('<div class="blocker"></div>');
		$('body').append(this.blocker);
		this.blocker.click(dojo.hitch(this,this.cancel));
		
		this.retDeferred = new Deferred();
		return this.retDeferred.promise;
	},
	
	populate: function(attributes) {
		for( var key in attributes) {
			var attr = $('.popup-'+key,this.dom),
				raw = attr.get(0);
			if(!raw || attributes[key]=="null") continue;
			
			if(raw.tagName === "IMG")
				attr.attr('src',attributes[key]);
			else if(raw.tagName === "INPUT")
				attr.value(attributes[key]);
			else 
				attr.html(attributes[key]);
		}	
	},
	
	appendData: function(attributeList, data) {
		attributeList.forEach(dojo.hitch(this,function(attr) {
			var val = $('#'+attr,this.dom).val();
			if(val)
				data += "&"+val;
		}));	
		return data;
	},
	
	hide: function() {
		this.dom.addClass("hide");
		this.blocker.remove();
	},
	
	ok: function() {
		this.hide();
		this.retDeferred.resolve(true);
	},
	
	cancel: function() {
		this.hide();
		this.retDeferred.resolve(false);
	}
	
});
	return Popup;
});