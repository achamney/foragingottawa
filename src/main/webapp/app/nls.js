define([], function() {
    var pseudo, _resources = { "Threads": "Threads" };
    if (window.navigator.userLanguage || window.navigator.language === 'pseudo') {
        pseudo = function (s) {
            var p = new Array(Math.ceil(s.length * 0.15) + 1).join('_');
            return p + ' ' + s + ' ' + p;
        };
    }
    else {
        pseudo = function (s) { return s; };
    }
    function nls(key, map) {
        var result = _resources[key] || key;
        if (map) {
            //result = esri.string.substitute(result, map, null, null);
            console.log(result, map);
        }
        return pseudo(result);
    }
    NlsPipe = (function () {
        function NlsPipe() {
        }
        NlsPipe.prototype.transform = function (key) {
            return nls(key);
        };
        return NlsPipe;
    }());
    NlsPipe = Reflect.decorate([
        ng.core.Pipe({ name: "nls" }),
        Reflect.metadata("design:paramtypes", [])
    ], NlsPipe);
    return NlsPipe;
});