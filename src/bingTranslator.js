/// <reference path="..\typings\jquery\jquery.d.ts" />
// Module
var Dictionary;
(function (Dictionary) {
    // Class
    var BingTranslator = (function () {
        function BingTranslator() {
        }
        // Constructor
        //constructor (public x: number, public y: number) { }
        // Instance member
        //getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        // Static member
        BingTranslator.speak = function (word, language, callback) {
            $.ajax({
                url: 'http://api.microsofttranslator.com/V2/Ajax.svc/Speak',
                dataType: 'jsonp',
                success: callback,
                data: {
                    language: language,
                    text: word,
                    appId: '68D088969D79A8B23AF8585CC83EBA2A05A97651'
                },
                jsonp: 'oncomplete'
            });
        };
        return BingTranslator;
    }());
    Dictionary.BingTranslator = BingTranslator;
})(Dictionary || (Dictionary = {}));
