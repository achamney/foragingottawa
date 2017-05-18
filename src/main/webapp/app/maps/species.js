define(['dom/form/form',
    "dom/form/autocomplete",
    'server/getFieldSelection'],
    function () {
        var SpeciesElement = function (dom, formObj) // Monitors text activity
        {
            this.autocompleteElement = new quickforms.AutoCompleteElement(dom, formObj);
            this.autocompleteElement.createOption = function (json) {
                var opt = $('<div value="' + json.id + '" ' + json.selected + '><i>' + json.label + '</i><small> (' + json.commonName_en + ')</small></div>');
                return opt;
            };
            this.autocompleteElement.getAutoCompleteList = function (val) {
                this.loading.removeClass("hidden");
                quickforms.getFactData({
                    queryName: 'get'+this.name,
                    params: 'label=%'+val+'%,label=%'+val+'%,label=%'+val+'%',
                    callback: this.convertJSONtoSelect.bind(this)
                });
            };
            
            this.autocompleteElement.selectOption = function(dom, e) {
                var text = $(dom).text();
                this.list.children().remove();
                this.dom.val(text);
                this.currentVal = text;
            }
        };
        quickforms.form.domParsers.push(function (formObj) {
            var texts = formObj.dom.find('input.species[type=text]');
            texts.each(function (i, tex) {
                tex = $(tex);

                var texObj = new SpeciesElement(tex, formObj);
                texObj.autocompleteElement.parseDom(formObj);
            });
        });

    });