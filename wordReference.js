/// <reference path="..\typings\jquery\jquery.d.ts" />
// Module
var Dictionary;
(function (Dictionary) {
    // Class
    var WordReference = (function () {
        function WordReference() {
        }
        // Constructor
        //constructor (public x: number, public y: number) { }
        // Instance member
        //getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        WordReference.prototype.hydrate = function (data) {
            if (data.original != undefined) {
                var compounds = [];
                for (var i in data.original.Compounds) {
                    var compound = data.original.Compounds[i];
                    var cleanTranslation = compound.FirstTranslation.term.replace(/, invisible: .*/g, '');
                    var cleanCompound = compound.OriginalTerm.term.replace(/, invisible: .*/g, '');
                    compounds.push({ translation: cleanTranslation, compound: cleanCompound });
                }
            }
            if (data.term0 != undefined) {
                var translations = [];
                for (var i in data.term0) {
                    for (var ii in data.term0[i]) {
                        for (var key in data.term0[i][ii]) {
                            if (this.endsWith(key, "Translation")) {
                                var term = data.term0[i][ii][key].term;
                                if (translations.indexOf(term) == -1)
                                    translations.push(data.term0[i][ii][key].term);
                            }
                        }
                    }
                }
            }
            var def = {
                compounds: compounds,
                translations: translations
            };
            return def;
        };
        WordReference.prototype.endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };
        WordReference.prototype.getTranslation = function (word, lang, callback) {
            var _this = this;
            $.ajax({
                url: 'http://api.wordreference.com/991f0/json/' + lang + 'en/' + encodeURI(word),
                dataType: 'jsonp',
                success: function (data) { return callback(_this.hydrate(data)); },
                cache: true
            });
        };
        return WordReference;
    })();
    Dictionary.WordReference = WordReference;
})(Dictionary || (Dictionary = {}));
