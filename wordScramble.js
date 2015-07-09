/// <reference path="..\typings\jquery\jquery.d.ts" />
/// <reference path="..\typings\jqueryui\jqueryui.d.ts" />
/// <reference path="..\typings\mustache.d.ts" />
// Include JQuery carousel
/// <reference path="..\typings\bootstrap\bootstrap.d.ts" />
/// <reference path="wordReference.ts" />
/// <reference path="bingTranslator.ts" />
/// <reference path="wiktionaryParser.ts" />
/// <reference path="db.ts" />
/// <reference path="youTubePlayer.ts" />
var WordScramble = (function () {
    function WordScramble(lyrics, audio) {
        this.lyrics = lyrics;
        this.audio = audio;
        this.audioPlayer = $('#audioSample')[0];
        //audio = <HTMLVideoElement>$('video')[0];
        this.vocabularyIndex = 0;
        this.selectedVocabulary = new Array();
        while (this.selectedVocabulary.length < 10) {
            var randomIndex = Math.floor((Math.random() * this.lyrics.vocabulary.length));
            if (this.selectedVocabulary.indexOf(randomIndex) == -1)
                this.selectedVocabulary.push(randomIndex);
        }
    }
    WordScramble.prototype.keyHandler = function (ev) {
        console.log(ev.keyCode);
        switch (ev.keyCode) {
            case 32:
                this.lyrics.vocabulary[this.selectedVocabulary[this.vocabularyIndex - 1]].english = window.getSelection().toString();
                break;
            default:
                return true;
        }
        return false;
    };
    WordScramble.prototype.fadeOut = function () {
        var _this = this;
        $(this.audio).animate({ volume: 0 }, 1000, "swing", function () {
            _this.audio.pause();
        });
    };
    WordScramble.prototype.fadeIn = function () {
        this.audio.play();
        $(this.audio).animate({ volume: 1 }, 1000);
    };
    // start and stop in seconds (with fractions)
    WordScramble.prototype.playSample = function (start, stop) {
        var _this = this;
        this.audio.currentTime = start;
        this.fadeIn();
        setTimeout(function () { return _this.fadeOut(); }, (stop - start) * 1000);
    };
    WordScramble.prototype.showWordReferenceResults = function (data) {
        var translatedSentence = $('#translation').text();
        var currentWord = this.lyrics.vocabulary[this.selectedVocabulary[this.vocabularyIndex - 1]];
        if (data.translations != undefined) {
            $('#wordReferenceData').append('<h2>Translation</h2> <ul id="translationList"></ul>');
            data.translations.forEach(function (val) {
                $('#wordReferenceData #translationList').append('<li>' + val + '</li>');
                if (currentWord.english == undefined && translatedSentence.indexOf(val) > 0) {
                    translatedSentence = translatedSentence.replace(val, '<b>' + val + '</b>');
                    $('#translation').html(translatedSentence);
                    currentWord.english = val;
                }
            });
        }
        if (data.compounds != undefined) {
            $('#wordReferenceData').append('<h2>Usage</h2> <ul id="compoundsList"></ul>');
            data.compounds.forEach(function (val, index) {
                if (index < 5)
                    $("#wordReferenceData #compoundsList").append('<li>' + val.compound + ': ' + val.translation + '</li>');
            });
        }
    };
    WordScramble.prototype.audioPrononcuationReceived = function (audioUri) {
        $('#audioSample')[0].src = audioUri;
    };
    WordScramble.prototype.wikiDataReceived = function (record) {
        if (record.phonetics.length > 0)
            $('#phonetics').text('/' + record.phonetics[0].value + '/');
    };
    WordScramble.prototype.scramble = function () {
        var _this = this;
        //var randomVoc = this.lyrics.vocabulary.splice(Math.floor((Math.random() * this.lyrics.vocabulary.length)), 1)[0];
        var indexOverride = parseInt(getParameterByName("vocIndex"));
        if (isNaN(indexOverride) == false)
            var randomVoc = this.lyrics.vocabulary[indexOverride];
        else
            var randomVoc = this.lyrics.vocabulary[this.selectedVocabulary[this.vocabularyIndex++]];
        var randomWord = randomVoc.word;
        var originalSentence = this.lyrics.french.split('\n')[randomVoc.line];
        var translatedSentence = this.lyrics.english.split('\n')[randomVoc.line];
        if (randomVoc.english != undefined)
            translatedSentence = translatedSentence.replace(randomVoc.english, '<b>' + randomVoc.english + '</b>');
        var replace = '';
        for (var i = 0; i < randomWord.length; i++)
            replace += '_';
        var returnSentence = originalSentence.replace(new RegExp(randomWord, 'ig'), replace);
        this.guessedWord = randomWord;
        this.guessedIndex = 0;
        var explodedWord = randomWord.split('');
        for (var i = 0; i < randomWord.length; i++) {
            var randomIndex = Math.floor((Math.random() * randomWord.length));
            var temp = randomWord[randomIndex];
            explodedWord[randomIndex] = randomWord[i];
            explodedWord[i] = temp;
            randomWord = explodedWord.join('');
        }
        var renderedTemplate = Mustache.render($('#template').html(), {
            sentence: returnSentence,
            translation: translatedSentence,
            tiles: randomWord.split('')
        });
        $('.item').not('.active').html(renderedTemplate);
        $('#myCarousel').one('slid', function () {
            $('.item').not('.active').html("");
            $('#playSampleBtn')[0].onclick = function () { return _this.playSample(_this.lyrics.timeCode[randomVoc.line], _this.lyrics.timeCode[randomVoc.line + 1]); };
            // External services
            if (randomVoc.translatorWord != undefined)
                randomWord = randomVoc.translatorWord;
            else
                randomWord = randomVoc.word;
            var wr = new Dictionary.WordReference();
            wr.getTranslation(randomWord, 'fr', function (data) { return _this.showWordReferenceResults(data); });
            Dictionary.BingTranslator.speak(randomWord, 'fr', _this.audioPrononcuationReceived);
            Dictionary.WiktionaryParser.parse(randomWord, 'fr', _this.wikiDataReceived);
            // End of External services
            $('#myCarousel').carousel('pause');
            // Assign Event Handlers
            document.onkeydown = function (ev) { return _this.keyHandler(ev); };
            $(".tile").click(function (ev) { return _this.onTileClick(ev); });
            $('#playBtn').click(function () {
                // some kind of a bug is preventing me from re-starting the audio using currentTime
                var src = _this.audioPlayer.src;
                _this.audioPlayer.src = '';
                _this.audioPlayer.src = src;
                _this.audioPlayer.play();
            });
            $('#nextBtn').click(function () { return _this.scramble(); });
        });
        $('#myCarousel').carousel('next');
        return [originalSentence, returnSentence, randomWord];
    };
    WordScramble.prototype.onTileClick = function (eventObject) {
        var currentTarget = $(eventObject.currentTarget);
        var clickedLetter = currentTarget.text();
        if (this.guessedWord[this.guessedIndex].toUpperCase() == clickedLetter.toUpperCase()) {
            currentTarget.remove();
            this.guessedIndex++;
            $('.tile').removeClass('btn-danger');
            $('.tile').addClass('btn-primary');
            currentTarget.appendTo('#smallRack');
            if (this.guessedIndex == this.guessedWord.length)
                $('#wordReference').fadeIn('fast');
        }
        else {
            currentTarget.removeClass('btn-primary');
            currentTarget.addClass('btn-danger');
        }
    };
    return WordScramble;
})();
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function vkGetUriByAid(lesson, callback) {
    $.ajax({
        url: 'https://api.vk.com/method/audio.get',
        data: {
            aids: lesson.aid,
            access_token: '4e00731c8bb3dcd0516afb18b5d43b818b33eb4927fecec44da59cbb451e4ddae33e6ba86193d9059a73e'
        },
        dataType: 'jsonp',
        success: function (data) {
            lesson.mediaUri = data.response[0].url;
            callback();
        }
    });
}
window.onload = function () {
    var lessonId = parseInt(getParameterByName('lesson') || '1');
    var lyrics = Logic.Db.getLyrics(lessonId);
    var lesson = Logic.Db.getLesson(lessonId);
    var game;
    var audio = $('<audio src=resources/placebo-protege_moi.mp3 />').appendTo('body')[0];
    game = new WordScramble(lyrics, audio);
    var scramble = game.scramble();
    console.log(scramble);
};
