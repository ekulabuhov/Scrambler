/// <reference path="..\typings\jquery\jquery.d.ts" />
var WiktionaryRecord = (function () {
    function WiktionaryRecord() {
        this.definitions = [];
        this.phonetics = [];
    }
    return WiktionaryRecord;
})();
// Module
var Dictionary;
(function (Dictionary) {
    // Class
    var WiktionaryParser = (function () {
        function WiktionaryParser() {
        }
        WiktionaryParser.show_result = function (data) {
            var wikiRecord = new WiktionaryRecord();
            var pageId = Object.keys(data.query.pages)[0];
            if (pageId == "-1")
                return;
            var wikitext = data.query.pages[pageId].revisions[0]['*'];
            var definitionsStart = wikitext.indexOf('===Noun===');
            var definitionsEnd = wikitext.indexOf('\n=', definitionsStart);
            var definitions = wikitext.slice(definitionsStart, definitionsEnd);
            // Find definitions
            var regexp = /# .*\n/g;
            do {
                var match = regexp.exec(definitions);
                if (match != null) {
                    var cleanMatch = match[0].replace(/[\[\]#]/g, '');
                    wikiRecord.definitions.push(cleanMatch);
                }
            } while (match != null);
            // Find phonetics
            regexp = /\n\* {{IPA\|\/(.*)\/\|lang=(.*)}}/g;
            do {
                var match = regexp.exec(wikitext);
                if (match != null) {
                    wikiRecord.phonetics.push({ language: match[2], value: match[1] });
                }
            } while (match != null);
            WiktionaryParser.callback(wikiRecord);
        };
        WiktionaryParser.parse = function (word, language, callback) {
            $.ajax({
                url: 'http://en.wiktionary.org/w/api.php',
                data: {
                    action: 'query',
                    prop: 'revisions',
                    format: 'json',
                    titles: word.toLowerCase(),
                    rvprop: 'content'
                },
                dataType: 'jsonp',
                success: WiktionaryParser.show_result
            });
            WiktionaryParser.callback = callback;
        };
        return WiktionaryParser;
    })();
    Dictionary.WiktionaryParser = WiktionaryParser;
})(Dictionary || (Dictionary = {}));
