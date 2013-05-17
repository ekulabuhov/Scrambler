/// <reference path="typings\jquery\jquery.d.ts" />

interface PhoneticsRecord {
    language: string;
    value: string;
}

class WiktionaryRecord {
    definitions: string[];
    phonetics: PhoneticsRecord[];

    constructor() {
        this.definitions = [];
        this.phonetics = [];
    }
}

// Module
module Dictionary {

    // Class
    export class WiktionaryParser {

        static callback: (record: WiktionaryRecord) => any;

        static show_result(data) {
            var wikiRecord = new WiktionaryRecord();

            var pageId = Object.keys(data.query.pages)[0]
            if (pageId == "-1") // page missing
                return;
            var wikitext = data.query.pages[pageId].revisions[0]['*'];

            var definitionsStart = wikitext.indexOf('===Noun===')
            var definitionsEnd = wikitext.indexOf('\n=', definitionsStart)
            var definitions = wikitext.slice(definitionsStart, definitionsEnd);

            // Find definitions
            var regexp = /# .*\n/g;
            do {
                var match = regexp.exec(definitions)
                if (match != null) {
                    var cleanMatch = match[0].replace(/[\[\]#]/g, '');
                    wikiRecord.definitions.push(cleanMatch);
                }
            } while (match != null)

            // Find phonetics
            regexp = /\n\* {{IPA\|\/(.*)\/\|lang=(.*)}}/g;
            do {
                var match = regexp.exec(wikitext)
                if (match != null) {
                    wikiRecord.phonetics.push({ language: match[2], value: match[1] });
                }
            } while (match != null)

            WiktionaryParser.callback(wikiRecord);
        }

        static parse(word: string, language: string, callback: (record: WiktionaryRecord) => any) {
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
                success: show_result
            });

            WiktionaryParser.callback = callback;
        }
    }

}