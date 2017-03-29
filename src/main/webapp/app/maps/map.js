var hasMapLoaded = false;
define(['server/getFactData', 'dom/form/text', 'dom/form/date', 'dom/form/checkbox', "dom/form/select", "dom/form/autocomplete", 'dom/tableControl'],
    function () {
        return ng.core.Component({
            selector: 'maps',
            templateUrl: 'app/maps/map.html'
        }).Class({

            constructor: function () {
                if (!hasMapLoaded) {
                    quickforms.loadCss('app/maps/css/map.css');
                    hasMapLoaded = true;
                }
                this.icons = {
                    1: "img/tree.png",
                    2: "img/greens.png",
                    3: "img/berry.png",
                    4: "img/mushroom.png",
                    5: "img/herbs.png"
                };
                this.months = [{ label: 'January', id: 0 }, { label: 'February', id: 1 }, { label: 'March', id: 2 }, { label: 'April', id: 3 }, { label: 'May', id: 4 },
                { label: 'June', id: 5 }, { label: 'July', id: 6 }, { label: 'August', id: 7 }, { label: 'September', id: 8 }, { label: 'October', id: 9 },
                { label: 'November', id: 10 }, { label: 'December', id: 11 }];
                this.icon = 1;
            },
            ngOnInit: function () {
                quickforms.getFactData({
                    queryName: 'getForageLocations',
                    params: '',
                    callback: this.markerResponse.bind(this)
                });
                this.username = getCookie("username");
                this.id = QueryString("id");
                this.newPoint = !!this.id;
                this.parseForm();
            },
            markerResponse: function (data) {
                this.loading = false;
                var _this = this;
                if (isJSONString(data)) {
                    var json = JSON.parse(data);
                    this.markers = json.map(function (datum) {
                        return {
                            position: { lat: parseFloat(datum.latitude), lng: parseFloat(datum.longitude) },
                            icon: _this.getIcon(parseInt(datum.icon)),
                            title: datum.name,
                            description: datum.description,
                            img: datum.img,
                            date: datum.date,
                            username: datum.username,
                            id: datum.foragelocationsKey
                        }
                    })
                } else {
                    this.markers = [];
                }
            },

            clickNewPoint() {
                this.newPoint = true;
                this.parseForm();
            },

            parseForm: function () {
                if (!this.newPoint) return;
                window.setTimeout(function () {
                    quickforms.parseForm( //formId*, app, fact*, callback
                        {
                            formId: 'addPointForm',
                            fact: 'forageLocations'
                        });
                }, 200);
            },
            setPosition: function (latLng) {
                if (!this.username) return;
                
                var currentForm = quickforms.currentFormmapadvanced || quickforms.currentFormaddPointForm;
                var lat = currentForm.childMap['addPointLat'],
                    long = currentForm.childMap['addPointLong'];
                lat.currentVal = latLng.lat();
                long.currentVal = latLng.lng();
                lat.dom.val(lat.currentVal);
                long.dom.val(long.currentVal);
                this.setMarker(lat.currentVal, long.currentVal);
                window.setTimeout(function () {
                    $("#addPointForm, .advanced").focus();
                }, 700);
            },
            setMarker: function (lat, long) {
                if (this.newMarker && !lat) {
                    lat = this.newMarker.position.lat;
                    long = this.newMarker.position.lng;
                }
                this.newMarker = {
                    position: { lat: lat, lng: long },
                    icon: this.getIcon(this.icon),
                    animation: google.maps.Animation.DROP,
                    draggable: true
                }
            },
            submit: function (btn) {
                var redir = quickforms.formRedirect;
                var _this = this;
                var currentForm = quickforms.currentFormmapadvanced || quickforms.currentFormaddPointForm;
                this.loading = true;
                this.finishButton = btn;
                // If updating the location, don't put a new visit
                if (currentForm.updateRow) {
                    quickforms.formRedirect = this.onFinish.bind(this);
                } else {
                    quickforms.formRedirect = this.onFinishLocation.bind(this);
                }

                if (this.advanced) {
                    currentForm.childMap['harvestMonth'].currentVal = this.getMonthText();
                }
                currentForm.childMap['token'].currentVal = getCookie('token');
                quickforms.putFact(btn, "/");
                quickforms.formRedirect = redir;
                quickforms.serverQueries[quickforms.serverQueries.length - 1].addErrorListener(function (e) {
                    _this.onError(e);
                });
                this.loading = true;
            },

            onFinishLocation: function(data) {
                if (data.indexOf("[") !== 0) return this.onError(data);
                var _this = this;
                var json = JSON.parse(data);
                this.foragelocation = json[0].id;
                var currentForm = quickforms.currentFormmapadvanced || quickforms.currentFormaddPointForm;
                currentForm.fact="foragevisits";
                currentForm.childMap['foragelocation'].currentVal = json[0].id;
                quickforms.formRedirect = this.onFinish.bind(this);
                quickforms.putFact(this.finishButton, "/");
            },

            onFinish(data) {
                this.loading = false;
                if (data.indexOf("[") !== 0) return this.onError(data);
                window.location.reload();
            },
            onError: function (data) {
                if (~data.indexOf("Duplicate entry")) {
                    this.duplicate = true;
                }
            },
            getIcon: function (id) {
                return this.icons[id];
            },
            setMarkerIcon: function (id) {
                this.icon = id;
                if (this.newMarker) {
                    this.setMarker();
                }
            },

            openAdvanced: function () {
                this.advanced = true;
                var _this = this;
                window.setTimeout(function () {
                    $(".advanced").focus();
                    quickforms.parseForm( //formId*, app, fact*, callback
                        {
                            formId: 'mapadvanced',
                            fact: 'forageLocations',
                            callback: function(formObj) {
                                if(_this.newMarker) {
                                    var lat = formObj.childMap['addPointLat'],
                                        long = formObj.childMap['addPointLong'];
                                    lat.currentVal = _this.newMarker.position.lat;
                                    long.currentVal = _this.newMarker.position.lng;
                                }
                                if(formObj.updateRow) {
                                    var selectedMonths = formObj.childMap['harvestMonth'].currentVal.split(", ");
                                    for(var month of _this.months) {
                                        if(~selectedMonths.indexOf(month.label)) {
                                            month.selected = true;
                                        }
                                    }
                                }
                            }
                        });
                }, 300);
            },

            delete: function () {
                this.loading = true;
                quickforms.executeQuery(quickforms.app, 'foragelocations_delete_row',
                    'id=' + this.id, function () {
                        this.loading = false;
                        window.location = "#?page=2";
                        location.reload();
                    });
            },
            onCancel: function () {
                if (!this.id) {
                    this.newPoint = false;
                    this.advanced = false;
                } else {
                    window.location = '#?page=2';
                    window.location.reload();
                }
            },
            getMonthText: function () {
                var txt = ""
                for (var key in this.months) {
                    if (this.months[key].selected) {
                        txt += this.months[key].label + ", ";
                    }
                }
                txt = txt.substr(0, txt.length-2);
                return txt;
            },
            selectMonth: function (monthText) {
                this.months[monthText.id].selected = !this.months[monthText.id].selected;
            },
            getVisits: function (id) {
                this.id = id;
                this.visits=true;
                window.setTimeout(function() {
                    quickforms.loadTable(//appName, queryName*, parameterList, callback
                        { queryName: 'getVisits',
                        parameterList: 'id=' + id,
                        domId: "visits",
                        callback: function() {
                            $('#visits').focus();
                        }});
                }, 10);
            }
        });
    });