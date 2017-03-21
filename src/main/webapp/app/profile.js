define([
    "server/getFactData",
    'dom/form/text'
], function () {
    return ng.core.Component({
        selector: 'profile',
        templateUrl: 'app/profile.html',
        directives: []
    }).Class({
        constructor: function () {
        },
        
        ngOnInit: function () {
            this.id = QueryString("id");
            this.username = getCookie("username");
            this.user = { id: this.id };
            
            quickforms.getFactData({
                queryName: 'users_get_row',
                params: 'id='+this.id,
                callback: this.userResponse.bind(this)
            });
        },

        onEdit: function() {
            this.edit=true;
            window.setTimeout(function() {
                quickforms.parseForm( //formId*, app, fact*, callback
                                {formId:'editProfileForm',
                                fact:'users'});
            }, 200);
        },

        submitForm: function (el) {
            var redir = quickforms.formRedirect;
            var _this = this;
            quickforms.formRedirect = this.onFinish.bind(this);
            quickforms.currentFormeditProfileForm.childMap['token'].currentVal = getCookie('token');
            var pass1 = quickforms.currentFormeditProfileForm.childMap['password1'].currentVal;
            if(pass1 && pass1 === quickforms.currentFormeditProfileForm.childMap['confirmPass'].currentVal) {
                quickforms.currentFormeditProfileForm.childMap['password'].currentVal = pass1;
            }
            quickforms.putFact(el, "/");
            quickforms.formRedirect = redir;
            quickforms.serverQueries[quickforms.serverQueries.length-1].addErrorListener(function(e) {
                _this.onError(e);
            });
            this.loading = true;
            this.username = "";
        },
        
        userResponse: function(data) {
            if(isJSONString(data)) {
                var json = JSON.parse(data);
                this.user = json[0];
                this.user.avatar = this.user.avatar === "null" ? null : this.user.avatar;
            }
        },

        onFinish: function(data) {
            if (data.indexOf("[") !== 0) return this.onError(data);
            window.location.reload();
        },

        onError: function(data) {
            if(~data.indexOf("Duplicate entry")) {
                this.duplicate = true;
                grecaptcha.reset();
                this.loading = false;
            }
        }
    });

});