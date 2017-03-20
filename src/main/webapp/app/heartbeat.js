define([
    "quickforms/server/getFactData"
], function () {
    return ng.core.Component({
        selector: 'heartbeat',
        templateUrl: 'app/heartbeat.html',
        host: { "[class.open]": "login" }
    }).Class({
        constructor: function () {
            var _this = this;
            window.setInterval(function () {
                if(getCookie('token')) {
                    quickforms.getFactData({
                        queryName: 'heartbeat',
                        params: 'token=' + getCookie('token'),
                        callback: _this.response.bind(_this)
                    });
                }
            }, 60000);
        },
        response: function (data) {
            if (!isJSONString(data)) {
                this.triggerLogin();
            }
        },
        triggerLogin: function() {
            this.username = getCookie('username');
            this.login = true;
        },
        submitLogin: function () {
            var md5edPass = '';
            var cookiePass = null;
            var typedPass = md5($('#password').val());
            if ($('#password').val().length === 32) {
                typedPass = $('#password').val();
            }
            md5edPass = typedPass;
            var username = $('#username').val();
            var prms = "username=" + username + ",password=" + md5edPass;
            quickforms.getFactData({
                queryName: 'getLogin',
                params: prms,
                callback: this.loginSuccess.bind(this)
            });
        },
        loginSuccess: function (data) {
            if (isJSONString(data)) {
                this.fail = false;
                var json = JSON.parse(data);
                setCookie("token", json[0].token);
                setCookie("username", json[0].username);
                setCookie("userId", json[0].usersKey);
                this.login = false;
                if(!this.username) {
                    location.reload();
                }
            }
            else {
                this.fail = true;
            }
        }, 
        checkEnter: function(key) {
            if(key.which === 13) {
                this.submitLogin();
            }
        },
        logOut: function() {
            setCookie("token", "");
            setCookie("username", "");
            location.reload();
        }
    });
});