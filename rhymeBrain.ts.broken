/// <reference path="typings\jquery\jquery.d.ts" />

interface RhymeBrainRecord {
    word: string;
    pron: string;
    ipa: string;
    freq: number;
    flags: string;
    syllables: string;
}

// Module
module Dictionary {

    // Class
    export class RhymeBrain {

        static callback: (record: RhymeBrainRecord) => any;

        static show_result(record: RhymeBrainRecord) {
            callback(record);
        }

        static getWordInfo(word: string, language: string, callback: (record: RhymeBrainRecord) => any) {
            $.ajax({
                url: 'http://rhymebrain.com/talk',
                data: {
                    function: 'getWordInfo',
                    word: word,
                    lang: language
                },
                dataType: 'jsonp',
                success: show_result
            });

            RhymeBrain.callback = callback;
        }
    }

}