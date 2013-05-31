/// <reference path="typings\jquery\jquery.d.ts" />

// Interface
interface Compound {
    compound: string;
    translation: string;
}

interface Definition {
    compounds: Compound[];
    translations: string[];
}

// Module
module Dictionary {

    // Class
    export class WordReference {
        // Constructor
        //constructor (public x: number, public y: number) { }

        // Instance member
        //getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        
        hydrate(data) : Definition {
            if (data.original != undefined) {
                var compounds = [];
                for (var i in data.original.Compounds) {
                    var compound = data.original.Compounds[i]
                    var cleanTranslation = compound.FirstTranslation.term.replace(/, invisible: .*/g, '');
                    var cleanCompound = compound.OriginalTerm.term.replace(/, invisible: .*/g, '');
                    compounds.push({ translation: cleanTranslation, compound: cleanCompound })
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
            var def: Definition = {
                compounds: compounds,
                translations: translations
            };

            return def;
        }

        endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        getTranslation(word: string, lang: string, callback: (arrayOfCompounds: Definition) => any) {
            $.ajax({
                url: 'http://api.wordreference.com/991f0/json/' + lang + 'en/' + encodeURI(word),
                dataType: 'jsonp',
                success: (data) => callback(this.hydrate(data)),
                cache: true
            });
        };
    }

}