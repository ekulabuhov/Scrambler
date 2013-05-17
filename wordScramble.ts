/// <reference path="typings\jquery\jquery.d.ts" />
/// <reference path="typings\jqueryui\jqueryui.d.ts" />
/// <reference path="wordReference.ts" />
/// <reference path="bingTranslator.ts" />
/// <reference path="wiktionaryParser.ts" />
/// <reference path="db.ts" />
/// <reference path="youTubePlayer.ts" />

class WordScramble {
    
    guessedWord: string;
    /* Guessed letter index in the word */
    guessedIndex: number;
    audioPlayer = <HTMLAudioElement>$('#audioSample')[0];
    //audio = <HTMLVideoElement>$('video')[0];
    vocabularyIndex: number = 0;
    selectedVocabulary: number[] = new number[];

    constructor(public lyrics: Lyrics, public audio: Shapes.IMediaPlayer) {
        while (this.selectedVocabulary.length < 10) {
            var randomIndex = Math.floor((Math.random() * this.lyrics.vocabulary.length));
            if (this.selectedVocabulary.indexOf(randomIndex) == -1)
                this.selectedVocabulary.push(randomIndex);
        }
    }

    keyHandler(ev: KeyboardEvent) {
        console.log(ev.keyCode);


        switch (ev.keyCode) {
            case 32: // SPACE
                this.lyrics.vocabulary[this.selectedVocabulary[this.vocabularyIndex - 1]].english = window.getSelection().toString();
                break;
            default:
                return true;
        }

        return false;
    }

    fadeOut() {
        $(this.audio).animate({ volume: 0 }, 1000, "swing", () => { this.audio.pause(); });
    }

    fadeIn() {
        this.audio.play();
        $(this.audio).animate({ volume: 1 }, 1000);
    }

    // start and stop in seconds (with fractions)
    playSample(start: number, stop: number) {
        this.audio.currentTime = start;
        this.fadeIn();
        setTimeout(() => this.fadeOut(), (stop - start) * 1000)
    }

    showWordReferenceResults(data: Definition) {
        var translatedSentence = $('#translation').text();
        var currentWord = this.lyrics.vocabulary[this.selectedVocabulary[this.vocabularyIndex - 1]];
        if (data.translations != undefined) {
            $('#wordReferenceData').append('<h2>Translation</h2> <ul id="translationList"></ul>');
            data.translations.forEach((val) => {
                $('#wordReferenceData #translationList').append('<li>' + val + '</li>')
                if (currentWord.english == undefined && translatedSentence.indexOf(val) > 0) {
                    translatedSentence = translatedSentence.replace(val, '<b>' + val + '</b>');
                    $('#translation').html(translatedSentence);
                    currentWord.english = val;
                }
            });
            
        }

        if (data.compounds != undefined) {
            $('#wordReferenceData').append('<h2>Usage</h2> <ul id="compoundsList"></ul>');
            data.compounds.forEach((val, index) => {
                if (index < 5)
                    $("#wordReferenceData #compoundsList").append('<li>' + val.compound + ': ' + val.translation + '</li>')
            });
        }
    }

    audioPrononcuationReceived(audioUri: string) {
        (<HTMLAudioElement>$('#audioSample')[0]).src = audioUri;
    }

    wikiDataReceived(record: WiktionaryRecord) {
        if (record.phonetics.length > 0)
            $('#phonetics').text('/' + record.phonetics[0].value + '/')
    }
    
    scramble() {
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
        for (var i = 0; i < randomWord.length; i++) replace += '_'
        var returnSentence = originalSentence.replace(new RegExp(randomWord, 'ig'), replace);

        // Clean the screen
        $('#rack').html("");
        $('#smallRack').html("");
        // translation and usage always gets recreated
        $('#wordReferenceData').html("");
        // this includes audio and pronunciation, we want to hide it. 
        $('#wordReference').hide();
        $('#phonetics').html("");
        $('#sentence').text(returnSentence);
        $('#translation').html(translatedSentence);
        $('#playSampleBtn')[0].onclick = () => this.playSample(this.lyrics.timeCode[randomVoc.line], this.lyrics.timeCode[randomVoc.line + 1]);
        // End of Clean the screen
        
        // External services
        if (randomVoc.translatorWord != undefined)
            randomWord = randomVoc.translatorWord;
        var wr = new Dictionary.WordReference();
        wr.getTranslation(randomWord, 'fr', this.showWordReferenceResults);
        Dictionary.BingTranslator.speak(randomWord, 'fr', this.audioPrononcuationReceived);
        Dictionary.WiktionaryParser.parse(randomWord, 'fr', this.wikiDataReceived);
        randomWord = randomVoc.word;
        // End of External services
        
        this.guessedWord = randomWord;
        this.guessedIndex = 0;

        var explodedWord = randomWord.split('');
        for (var i = 0 ; i < randomWord.length; i++)
        {
            var randomIndex = Math.floor((Math.random() * randomWord.length))
            var temp = randomWord[randomIndex];
            explodedWord[randomIndex] = randomWord[i];
            explodedWord[i] = temp;
            randomWord = explodedWord.join('');
        }

        randomWord.split('').forEach((value) => {
            $('#rack').append($('<div/>', {
                class: "tile btn btn-primary",
                text: value
            }));
        });
        
        return [originalSentence, returnSentence, randomWord];
    }

    onTileClick(eventObject: JQueryEventObject) {
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
        } else {
            currentTarget.removeClass('btn-primary');
            currentTarget.addClass('btn-danger');
        }
    }

}

function getParameterByName(name: string): string {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function vkGetUriByAid(lesson: Lesson, callback: () => any) {
    $.ajax({
        url: 'https://api.vk.com/method/audio.get',
        data: {
            aids: lesson.aid,
            access_token: '4e00731c8bb3dcd0516afb18b5d43b818b33eb4927fecec44da59cbb451e4ddae33e6ba86193d9059a73e'
        },
        dataType: 'jsonp',
        success: (data) => { lesson.mediaUri = data.response[0].url; callback(); }
    });
}

window.onload = () => {
    var lessonId = parseInt(getParameterByName('lesson'))
    var lyrics = Logic.Db.getLyrics(lessonId);
    var lesson = Logic.Db.getLesson(lessonId);
    var game: WordScramble;

    vkGetUriByAid(lesson, () => {
        var audio = <HTMLAudioElement>$('<audio src=' + lesson.mediaUri + '/>').appendTo('body')[0];
        game = new WordScramble(lyrics, audio);
    });

    //var player = new Shapes.YouTubePlayer(lesson.mediaUri, () => {
    //    game = new WordScramble(lyrics, player);
    //});

    $('#btn').click(function () {
        var scramble = game.scramble()
        console.log(scramble)

        //$(".tile").draggable({
        //    stack: ".tile",
        //    scroll: false,
        //    containment: "parent"
        //    //revert: "invalid"
        //});

        document.onkeydown = (ev) => game.keyHandler(ev);
        $(".tile").click((ev) => game.onTileClick(ev));
        $('#playBtn').click(() => {
            // some kind of a bug is preventing me from re-starting the audio using currentTime
            var src = game.audioPlayer.src;
            game.audioPlayer.src = '';
            game.audioPlayer.src = src;
            //game.audioPlayer.currentTime = 0;

            game.audioPlayer.play()
        });
    });
}