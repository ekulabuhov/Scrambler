module Logic {
    export class Db {
        static lessons = [];
        static lyrics = [];

        static getAllLessons(): Lesson[] {
            return Db.lessons;
        }

        static getLesson(lessonId: number): Lesson {
            return Db.lessons[lessonId - 1];
        }

        static getLyrics(lyricsId: number): Lyrics {
            return Db.lyrics[lyricsId - 1];
        }
    }
}

var MongoUri = 'mongodb://heroku_app10435961:1j0k2mcejifgfg2btuh4trku24@ds043047.mongolab.com:43047/heroku_app10435961';

interface User {
    _id: string;
    name: string;
    color: string;
    age: number;
}

interface Lesson {
    artist: string;
    name: string;
    mediaUri: string;
    image: string;
    lang: string;
    aid: number;
    duration: string;
    difficulty: string;
}

interface Vocabulary {
    //dictionaryId: number;
    word: string;
    line: number;
    translatorWord?: string;
    english?: string;
}

interface Lyrics {
    french: string;
    english: string;
    vocabulary: Vocabulary[];
    timeCode: number[];
}

interface Dictionary {
    lyricsIds: Number[];
    lang: string;
    word: string;
    //guessCount: Number;
    //missCount: Number;
}

var lessonProtegeMoi: Lesson = ({
    "artist": "Placebo",
    "name": "Protege Moi",
    "mediaUri": "placebo-protege_moi.mp3",
    "image": "http://cs13473.vk.me/u13362584/video/l_dbb29d1f.jpg",
    "lang": "fr",
    "duration": "3:21",
    "difficulty": "Medium",
    "aid": 82008540
});
Logic.Db.lessons.push(lessonProtegeMoi);

var lessonAlorsOnDanse: Lesson = ({
    "artist": "Stromae",
    "name": "Alors on danse",
    "mediaUri": "http://cs12733.vk.me/u20241899/videos/16be934870.360.mp4",
    "image": "http://img.youtube.com/vi/7pKrVB5f2W0/0.jpg",
    "lang": "fr",
    "duration": "3:56",
    "difficulty": "Medium",
    "aid": 102326334
});
Logic.Db.lessons.push(lessonAlorsOnDanse);

var lessonLePetitPrince: Lesson = ({
    "artist": "Antoine de Saint-Exupéry",
    "name": "Le Petit Prince",
    "mediaUri": "Le_Petit_Prince_1-4.mp3",
    "image": "",
    "lang": "fr",
    "duration": "3:56",
    "difficulty": "Medium",
    "aid": 102326334
});
Logic.Db.lessons.push(lessonLePetitPrince);

var lyricsProtegeMoi: Lyrics = ({
    "timeCode": [13.2, 16.9, 20.099999999999998, 22.7, 26.499999999999996, 29.499999999999996, 32.800000000000004, 35.7, 39.6, 39.6, 42.800000000000004, 46.1, 49.1, 50.300000000000004, 52.800000000000004, 52.800000000000004, 64.4, 64.4, 67.8, 71.4, 74.4, 78.10000000000001, 80.8, 83.9, 87.10000000000001, 91, 91, 94.10000000000001, 97.2, 100.5, 101.4, 103.8, 103.8, 107, 110.2, 113.2, 114.2, 129.1, 129.1, 132.29999999999998, 135.29999999999998, 142.2, 142.2, 145.5, 148.6, 151.79999999999998, 152.5],
    "french": "C'est le malaise du moment\nL'epidemie qui s'etend\nLa fete est finie on descend\nLes pensees qui glacent la raison\nPaupieres baissees, visage gris\nSurgissent les fantomes de notre lit\nOn ouvre le loquet de la grille\nDu taudis qu'on appelle maison\n\nProtect me from what I want\nProtect me from what I want\nProtect me from what I want\nProtect me\nProtect me\n\nProtege-moi, protege-moi {x4}\n\nSommes nous les jouets du destin\nSouviens toi des moments divins\nPlanants, eclates au matin\nEt maintenant nous sommes tout seuls\nPerdus les reves de s'aimer\nLe temps ou on avait rien fait\nIl nous reste toute une vie pour pleurer\nEt maintenant nous sommes tout seuls\n\nProtect me from what I want\nProtect me from what I want\nProtect me from what I want\nProtect me\nProtect me\n\nProtect me from what I want (Protege-moi, protege-moi)\nProtect me from what I want (Protege-moi, protege-moi)\nProtect me from what I want (Protege-moi, protege-moi)\nProtect me\nProtect me\n\nProtege-moi, protege-moi\nProtege-moi de mes desirs\nProtege-moi, protege-moi\n\nProtect me from what I want\nProtect me from what I want\nProtect me from what I want\nProtect me\nProtect me",
    "english": "It's the disease of the age, \nAn epidemic that spreads, \nThe party is over and we descend, \nThe thoughts that freeze the mind. \nLowered eyes and gray faces, \nThe ghosts of our past awaken; \nWe open the latch on the gate \nOf the slum that we call home. \n\nProtect me from what I want\nProtect me from what I want\nProtect me from what I want\nProtect me\nProtect me\n\nProtect me, Protect me (x4)\n\nAre we the playthings of fate \nRemember those divine moments \nWe'd laugh and party until dawn** \nAnd now we are all alone. \nDreams of happiness lost, \nThe time we have done nothing (Dreams of innocence gone) \nWe're left with a lifetime to cry, \nAnd now we are all alone.\n\nProtect me from what I want\nProtect me from what I want\nProtect me from what I want\nProtect me\nProtect me\n\nProtect me from what I want (Protect me, Protect me)\nProtect me from what I want (Protect me, Protect me)\nProtect me from what I want (Protect me, Protect me)\nProtect me\nProtect me\n\nProtect me, Protect me\nProtect me from my desires\nProtect me, Protect me\n\nProtect me from what I want\nProtect me from what I want\nProtect me from what I want\nProtect me\nProtect me",
    "vocabulary": [{ "line": 0, "word": "c'est" }, { "line": 0, "word": "malaise" }, { "line": 0, "word": "moment" }, { "line": 1, "word": "l'epidemie", translatorWord: "epidemie" }, { "line": 1, "word": "s'etend" }, { "line": 2, "word": "finie" }, { "line": 2, "word": "descend" }, { "line": 3, "word": "pensees" }, { "line": 3, "word": "glacent" }, { "line": 3, "word": "raison" }, { "line": 4, "word": "paupieres" }, { "line": 4, "word": "baissees" }, { "line": 4, "word": "visage" }, { "line": 5, "word": "surgissent" }, { "line": 5, "word": "fantomes" }, { "line": 5, "word": "notre" }, { "line": 6, "word": "ouvre" }, { "line": 6, "word": "loquet" }, { "line": 6, "word": "grille" }, { "line": 7, "word": "taudis" }, { "line": 7, "word": "qu'on" }, { "line": 7, "word": "appelle" }, { "line": 7, "word": "maison" }, { "line": 15, "word": "protege" }, { "line": 17, "word": "sommes" }, { "line": 17, "word": "jouets" }, { "line": 17, "word": "destin" }, { "line": 18, "word": "souviens" }, { "line": 18, "word": "moments" }, { "line": 18, "word": "divins" }, { "line": 19, "word": "planants" }, { "line": 19, "word": "eclates" }, { "line": 19, "word": "matin" }, { "line": 20, "word": "maintenant" }, { "line": 20, "word": "seuls" }, { "line": 21, "word": "perdus" }, { "line": 21, "word": "reves" }, { "line": 21, "word": "s'aimer" }, { "line": 22, "word": "temps" }, { "line": 22, "word": "avait" }, { "line": 23, "word": "reste" }, { "line": 23, "word": "toute" }, { "line": 23, "word": "pleurer" }, { "line": 39, "word": "desirs" }]
});
Logic.Db.lyrics.push(lyricsProtegeMoi);

var lyricsAlorsOnDanse: Lyrics = ({
    timeCode: [6.4, 15.3, 16, 18, 20.1, 22.1, 24.1, 26.1, 28.1, 30.1, 32.2, 36.2, 40.4, 44.3, 47.2, 47.2, 81, 81, 85.1, 89.1, 93.1, 97.1, 101.1, 104.3, 105.5, 112.3, 113.5, 120, 120.4, 133.6, 140.8, 169.1],
    french: "Alors on d? (X3)\n\nQui dit étude dit travail,\nQui dit taf te dit les thunes,\nQui dit argent dit dépenses,\nQui dit crédit dit créance,\nQui dit dette te dit huissier,\nOui dit assis dans la merde.\nQui dit Amour dit les gosses,\nDit toujours et dit divorce.\nQui dit proches te dis deuils car les problèmes ne viennent pas seul.\nQui dit crise te dis monde dit famine dit tiers- monde.\nQui dit fatigue dit réveille encore sourd de la veille,\nAlors on sort pour oublier tous les problèmes.\n\nAlors on danse? (X9)\n\nEt la tu te dis que c'est fini car pire que ça ce serait la mort.\nQu'en tu crois enfin que tu t'en sors quand y en a plus et ben y en a encore!\nEcstasy dis problème les problèmes ou bien la musique.\nÇa te prends les tripes ça te prends la tête et puis tu prie pour que ça s'arrête.\nMais c'est ton corps c'est pas le ciel alors tu t'bouche plus les oreilles.\nEt là tu cries encore plus fort et ca persiste...\nAlors on chante\nLalalalalala, Lalalalalala,\nAlors on chante\nLalalalalala, Lalalalalala\n\nAlors on chante (x2)\nEt puis seulement quand c'est fini, alors on danse.\nAlors on danse (x7)\nEt ben y en a encore (X5)",
    english: "So we just d (x3)\n\nWhen we say study, it means work,\nWhen we say work, it means cash,\nWhen we say money, it means spending\nWhen we say credit, it means debt,\nWhen we say debt, it means bailiff,\nWe agree to being in deep shit\nWhen we say love, it means kids,\nWhen we say forever, it means divorce.\nWhen we say family, we say grief, because misfortune never comes alone.\nWhen we say crisis, we talk about the world, famine and then third world.\nWhen we say tiredness, we  talk about waking up still deaf from sleepless night\nSo we just go out to forget all our problems.\n\nSo we just dance… (X9)\n\nAnd you say it’s worse than that because eventually it will be death.\nWhat do you think finally you do it when there are more, well there is more!\ndid you say these problems are the problems or is it the music.\nIt grabs you by the guts, it takes hold of your head and then you pray for it to end.\nBut your body is no heaven so you block your ears even more.\nAnd then you yell even louder and it goes on…\nSo we just sing\nLalalalalala, Lalalalalala,\nSo we just sing\nLalalalalala, Lalalalalala,\n\nSo we just sing (x2)\nAnd then only when it’s over, then we dance.\nSo we just dance (x7)\nAnd well, there’s still more (x5)",
    vocabulary: [{ "line": 0, "word": "alors", english: "So" }, { "line": 2, "word": "étude", english: "study" }, { "line": 2, "word": "travail", english: "work" }, { "line": 3, "word": "thunes", english: "cash" }, { "line": 4, "word": "argent", english: "money" }, { "line": 4, "word": "dépenses", english: "spending" }, { "line": 5, "word": "crédit", english: "credit" }, { "line": 5, "word": "créance", english: "debt" }, { "line": 6, "word": "dette", english: "debt" }, { "line": 6, "word": "huissier", english: "bailiff" }, { "line": 7, "word": "assis" }, { "line": 7, "word": "merde", english: "shit" }, { "line": 8, "word": "amour", english: "love" }, { "line": 8, "word": "gosses", english: "kids" }, { "line": 9, "word": "toujours", english: "forever" }, { "line": 9, "word": "divorce", english: "divorce" }, { "line": 10, "word": "proches", english: "family" }, { "line": 10, "word": "deuils", english: "grief" }, { "line": 10, "word": "problèmes" }, { "line": 10, "word": "viennent" }, { "line": 10, "word": "seul" }, { "line": 11, "word": "crise" }, { "line": 11, "word": "monde" }, { "line": 11, "word": "famine" }, { "line": 11, "word": "tiers" }, { "line": 12, "word": "fatigue" }, { "line": 12, "word": "réveille" }, { "line": 12, "word": "encore" }, { "line": 12, "word": "sourd" }, { "line": 12, "word": "veille" }, { "line": 13, "word": "oublier" }, { "line": 13, "word": "problèmes" }, { "line": 15, "word": "danse" }, { "line": 17, "word": "c'est" }, { "line": 17, "word": "serait", "english": "will be" }, { "line": 17, "word": "mort" }, { "line": 18, "word": "qu'en" }, { "line": 18, "word": "crois" }, { "line": 18, "word": "enfin" }, { "line": 18, "word": "quand" }, { "line": 18, "word": "encore" }, { "line": 19, "word": "ecstasy" }, { "line": 19, "word": "problème" }, { "line": 19, "word": "musique" }, { "line": 20, "word": "tripes" }, { "line": 20, "word": "prends", english: ["takes hold", "grabs"] }, { "line": 20, "word": "s'arrête", translatorWord: "arrêter" }, { "line": 21, "word": "corps" }, { "line": 21, "word": "t'bouche" }, { "line": 21, "word": "oreilles", translatorWord: "oreille" }, { "line": 22, "word": "cries" }, { "line": 22, "word": "persiste" }, { "line": 23, "word": "chante" }, { "line": 29, "word": "seulement" }, { "line": 29, "word": "fini" }, { "line": 29, "word": "danse" }]
});
Logic.Db.lyrics.push(lyricsAlorsOnDanse);

// Prepare a new line separated file with subs manually and File->Open it in Aegisub
// Open Audio track that you're going to annotate
// Use shortcuts: sdfg and Enter
// From Aegisub -> export to .sub format
// Then to extract timecodes use regex ^{(\d*)}.* and \1 as replacer
// For timecodes: copy(JSON.stringify(a.map((v) => v / 15)))
var lyricsLePetitPrince: Lyrics = {
    timeCode: [8.133333333333333,9.266666666666667,10.2,15.266666666666667,16.4,22.866666666666667,24.066666666666666,30.733333333333334,31.8,38.93333333333333,40.53333333333333,42.333333333333336,44.2,51.13333333333333,53,55.93333333333333,56.86666666666667,59.666666666666664,61.2,63.46666666666667,64.13333333333334,65.46666666666667,66.2,68.93333333333334],
    french: "A LÉON WERTH.\nJe demande pardon aux enfants d'avoir dédié ce livre à une grande personne. \nJ'ai une excuse sérieuse : cette grande personne est le meilleur ami que j'ai au monde. \nJ'ai une autre excuse : cette grande personne peut tout comprendre, même les livres pour enfants. \nJ'ai une troisième excuse : cette grande personne habite la France où elle a faim et froid. \nElle a besoin d'être consolée. \nSi toutes ces excuses ne suffisent pas, je veux bien dédier ce livre à l'enfant qu'a été autrefois cette grande personne. \nToutes les grandes personnes ont d'abord été des enfants. \n(Mais peu d'entre elles s'en souviennent.) \nJe corrige donc ma dédicace :\nA LÉON WERTH\nQUAND IL ÉTAIT PETIT GARÇON",
    english: "TO LEON WERTH\nI ask the indulgence of the children who may read this book for dedicating it to a grown-up. \nI have a serious reason: he is the best friend I have in the world. \nI have another reason: this grown-up understands everything, even books about children. \nI have a third reason: he lives in France where he is hungry and cold. \nHe needs cheering up. \nIf all these reasons are not enough, I will dedicate the book to the child from whom this grown-up grew. \nAll grown-ups were once children\n(although few of them remember it.)\nAnd so I correct my dedication:\nTO LEON WERTH\nWHEN HE WAS A LITTLE BOY",
    vocabulary: [{"line":1,"word":"demande"},{"line":1,"word":"pardon"},{"line":1,"word":"enfants"},{"line":1,"word":"d'avoir"},{"line":1,"word":"dédié"},{"line":1,"word":"livre"},{"line":1,"word":"grande"},{"line":1,"word":"personne."},{"line":2,"word":"excuse"},{"line":2,"word":"sérieuse"},{"line":2,"word":"cette"},{"line":2,"word":"personne"},{"line":2,"word":"meilleur"},{"line":2,"word":"monde."},{"line":3,"word":"autre"},{"line":3,"word":"comprendre"},{"line":3,"word":"livres"},{"line":3,"word":"enfants."},{"line":4,"word":"troisième"},{"line":4,"word":"habite"},{"line":4,"word":"france"},{"line":4,"word":"froid."},{"line":5,"word":"besoin"},{"line":5,"word":"d'être"},{"line":5,"word":"consolée."},{"line":6,"word":"toutes"},{"line":6,"word":"excuses"},{"line":6,"word":"suffisent"},{"line":6,"word":"dédier"},{"line":6,"word":"l'enfant"},{"line":6,"word":"autrefois"},{"line":7,"word":"grandes"},{"line":7,"word":"personnes"},{"line":7,"word":"d'abord"},{"line":8,"word":"mais"},{"line":8,"word":"d'entre"},{"line":8,"word":"elles"},{"line":8,"word":"souviennent."},{"line":9,"word":"corrige"},{"line":9,"word":"dédicace"},{"line":10,"word":"werth"},{"line":11,"word":"quand"},{"line":11,"word":"était"},{"line":11,"word":"petit"},{"line":11,"word":"garçon"}]
}
Logic.Db.lyrics.push(lyricsLePetitPrince);

// TODO: Get rid of dots and defis
function createVocabulary(lyrics: Lyrics): Vocabulary[] {
    // split a word on any whitespace char
    var wsRegex = /\s/;
    var words = lyrics.french.split(wsRegex);

    // sanitize words - 5 chars min, distinct
    words = words.filter(function (val) { return val.length >= 5; });
    var cleanWords = [];
    words.forEach((val) => {
        val = val.toLowerCase();
        val = val.replace(/[\[\]#(),]/g, '');
        if (cleanWords.indexOf(val) == -1)
            cleanWords.push(val)
    })

    var newRegex = /\n/
    var lineSeparated = lyrics.french.toLowerCase().split(newRegex)

    var vocabulary = []
    var wordIndex = 0;
    lineSeparated.forEach((line, lineIndex) => {
        for (; wordIndex < cleanWords.length; wordIndex++) {
            if (line.indexOf(cleanWords[wordIndex]) != -1)
                vocabulary.push({ line: lineIndex, word: cleanWords[wordIndex] });
            else
                return;
        }
    });

    return vocabulary;
}

