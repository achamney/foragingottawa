define(['helper/md5'], function () {
    return ng.core.Component({
        selector: 'nav',
        templateUrl: 'app/nav.html',
        inputs: ['page'],
        outputs: ['changePage', 'triggerLogin']
    }).Class({

        constructor: function () {
            this.username = null;
            this.changePage = new ng.core.EventEmitter();
            this.triggerLogin = new ng.core.EventEmitter();
            this.navs = [{
                id: 1,
                title: "Home"
            }, {
                id: 3,
                title: "About"
            }, {
                id: 2,
                title: "Map"
            },  {
                id: 4,
                title: "Forum"
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
            $(e.target).parents(".navbar-collapse").removeClass('in');
            this.changePage.next({ page: nav.id });
        },
        logOut: function() {
            setCookie("token", "");
            setCookie("username", "");
            location.reload();
        },
        profile: function(e) {
            window.location = "#?page=9&id=" + getCookie("userId");
            e.stopImmediatePropagation();
            e.preventDefault();
            $('.username-dropdown').removeClass("open");
        }

    });

});