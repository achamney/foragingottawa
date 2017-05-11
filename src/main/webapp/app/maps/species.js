define(['dom/form/form',
    "dom/form/autocomplete",
    'server/getFieldSelection'],
    function () {
        var SpeciesElement = function (dom, formObj) // Monitors text activity
        {
            this.autocompleteElement = new quickforms.AutoCompleteElement(dom, formObj);
            this.autocompleteElement.createOption = function (json) {
                var opt = $('<option value="' + json.id + '" ' + json.selected + '>' + json.label + '<small>' + json.commonName + '</small></option>');
                return opt;
            };
        };
        quickforms.form.domParsers.push(function (formObj) {
            var texts = formObj.dom.find('input.species[type=text]');
            texts.each(function (i, tex) {
                tex = $(tex);

                var texObj = new SpeciesElement(tex, formObj);
                texObj.parseDom(formObj);
            });
        });

    });