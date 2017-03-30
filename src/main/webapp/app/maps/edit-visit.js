var hasMapLoaded = false;
define([],
    function () {
        var component = ng.core.Component({
            selector: 'edit-visit',
            templateUrl: 'app/maps/edit-visit.html'
        }).Class({

            constructor: function () {
            },
            ngOnInit: function () {
                var _this = this;
                window.setTimeout(function () {
                    quickforms.parseForm( //formId*, app, fact*, callback
                        {
                            formId: 'newVisit',
                            fact: 'foragevisits'
                        });
                }, 300);
                this.id = QueryString("id");
            },
            
            onSubmit: function(btn) {
                var _this = this;
                this.loading = true;
                var currentForm = quickforms.currentFormnewVisit;
                currentForm.fact="foragevisits";
                currentForm.childMap['token'].currentVal = getCookie('token');
                quickforms.formRedirect = this.onFinish.bind(this);
                quickforms.putFact(btn, "/");
            },
            onCancel: function () {
                window.location = "#?page=2";
            },
            
            deleteVisit: function() {
                this.loading = true;
                quickforms.executeQuery(quickforms.app, 'foragevisits_delete_row',
                    'id=' + this.id, function () {
                        this.loading = false;
                        window.location = "#?page=2";
                    });
            },
            onFinish: function() {
                this.loading = false;
                window.location = "#?page=2";
            }
        });
        return component;
});