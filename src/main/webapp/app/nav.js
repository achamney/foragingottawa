define(['helper/md5'], function () {
    return ng.core.Component({
        selector: 'nav',
        templateUrl: 'app/nav.html',
        inputs: ['page'],
        outputs: ['changePage']
    }).Class({

        constructor: function () {
            this.username = null;
            this.changePage = new ng.core.EventEmitter();
            this.navs = [{
                id: 1,
                title: "Home"
            }, {
                id: 2,
                title: "Maps",
                disabled: true
            }, {
                id: 3,
                title: "About",
                disabled: true
            }, {
                id: 4,
                title: "Forum",
                disabled: true
            }];
        },
        ngOnInit: function () {
            this.username = getCookie('username');
        },
        ngAfterViewChecked: function () {
            if (!this.registeredLoginEvents) {
                var _this = this;
                this.registeredLoginEvents = true;
                $('nav li.dropdown a').on('click', function (event) {
                    _this.fail = false;
                    $(this).parent().toggleClass('open');
                });
                $('body').on('click', function (e) {
                    var loginDiv = $('li.dropdown');
                    if (!loginDiv.is(e.target)
                        && loginDiv.has(e.target).length === 0
                        && $('.open').has(e.target).length === 0
                    ) {
                        loginDiv.removeClass('open');
                    }
                });
            }
        },
        changeTab: function (nav, e) {
            if (nav.disabled) return;
            this.page = nav.id;
            this.changePage.next({ page: nav.id });
        },
        logIn: function () {
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
                this.username = json[0].username;
                $('li.dropdown').removeClass("open");
            }
            else {
                this.fail = true;
            }
        }, 
        checkEnter: function(e) {
            if(e.which === 13) {
                this.logIn();
            }
        },
        logOut: function() {
            setCookie("token", "");
            setCookie("username", "");
            this.username = null;
        }

    });

});