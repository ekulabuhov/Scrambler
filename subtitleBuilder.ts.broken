/// <reference path="typings\jquery\jquery.d.ts" />
/// <reference path="youTubePlayer.ts" />

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

interface Karaoke {
    timeCode: number;
    text: string;
}

class TableColumns {
    static text: number = 1;
    static timeCode: number = 1;
}

class Main {
    //videoPlayer: HTMLVideoElement;
    timeSpan: HTMLSpanElement;
    timerHandle: number;
    tableIndex: number;
    karaoke: Karaoke[] = [];
    previewDiv: HTMLDivElement;

    constructor(public videoPlayer: Shapes.IMediaPlayer) {
        //this.videoPlayer = <HTMLVideoElement>document.getElementById('videoPlayer');
        //this.videoPlayer.src = videoSrc;
        if (this.karaoke != null)
            this.loadKaraokeToTable(this.karaoke);
        this.timeSpan = <HTMLSpanElement>document.getElementById('timeSpan');
        this.previewDiv = <HTMLDivElement>document.getElementById('preview');
        this.tableIndex = 0;
    }

    start() {
        this.timerHandle = setInterval(() => {
            var currentTime = this.videoPlayer.currentTime;
            this.timeSpan.innerHTML = currentTime.toString();
            var matchingRecords = this.karaoke.filter(function (el, index, array) {
                return el.timeCode <= currentTime
            })
            if (matchingRecords.length > 0 && currentTime - matchingRecords[matchingRecords.length - 1].timeCode < 5) {
                this.previewDiv.innerHTML = matchingRecords[matchingRecords.length - 1].text;
            }
            else
                this.previewDiv.innerHTML = '';
        }, 100);
    }

    highlightRow(index: number) {
        var rows = $('#rows > tr');
        if (index < rows.length && index >= 0) {
            rows.removeClass('highlighted');
            $(rows[index]).addClass('highlighted');
            this.tableIndex = index;
        }
    }

    keyHandler(ev: KeyboardEvent) {
        if ($(':focus').length > 0 && $(':focus')[0].id == 'text')
            return true;

        console.log(ev.keyCode);


        switch (ev.keyCode) {
            case 32: // SPACE
                if (this.videoPlayer.playing == false)
                    this.videoPlayer.play();
                else
                    this.videoPlayer.pause();
                break;
            case 37: // LEFT
                this.videoPlayer.currentTime -= 2;
                break;
            case 39: // RIGHT
                this.videoPlayer.currentTime += 2;
                break;
            case 79: // O
                this.highlightRow(this.tableIndex - 1);
                break
            case 80: // P
                this.highlightRow(this.tableIndex + 1);
                break;
            case 13: // Enter
                // Save timestamp
                var timeStamp = this.videoPlayer.currentTime;
                $('#rows > tr:eq(' + this.tableIndex + ') > td > input').val(timeStamp);
                this.karaoke[this.tableIndex].timeCode = timeStamp;
                this.highlightRow(this.tableIndex + 1);
                break;
            case 40: // Down arrow
                if (this.videoPlayer.volume >= 0.1)
                    this.videoPlayer.volume -= 0.1;
                else
                    this.videoPlayer.volume = 0;
                break;
            case 38: // Up arrow
                if (this.videoPlayer.volume <= 0.9)
                    this.videoPlayer.volume += 0.1;
                else
                    this.videoPlayer.volume = 1;
                break;
            default:
                return true;
        }

        return false;
    }

    //loadSubtitleFromTable(): string {
    //    this.karaoke = new Karaoke[];
    //    var cells = $('#rows > tr td');
    //    var inputs = $('#rows > tr td input');
    //    inputs.map((index, el) => {
    //        var timeCode = (<HTMLInputElement>el).valueAsNumber;
    //        var text = cells[index * 3].innerText;
    //        this.karaoke.push({ text: text, timeCode: timeCode });
    //    })
    //    return JSON.stringify(this.karaoke);
    //}

    loadKaraokeToTable(karaoke: Karaoke[]) {
        karaoke.forEach((val) => {
            this.addRowToTable(val);
        });
        this.highlightRow(0);
    }

    getTimeCodes(): number[]{
        return this.karaoke.map(function (val) { return val.timeCode.toFixed(1) /* divide by 1 to get numbers again */; })
    }

    addRowToTable(karaoke: Karaoke) {
        var timeCode = (karaoke.timeCode != undefined) ? karaoke.timeCode.toFixed(1) : "";

        $('#rows').append(
                '<tr>' +
                    '<td>' + karaoke.text + '</td>' +
                    '<td><input type="number" step="0.1" value="' + timeCode + '"></td>' +
                    '<td></td>' +
                '</tr>');

        $('#rows tr').click((ev) => this.onRowClick(ev));
        $('#rows tr td input').on('change', (ev) => this.timeStampChange(ev))
    }

    loadTextToTable() {
        var text: string = $('#text').val();
        var strings = text.split('\n');
        //this.karaoke = new Karaoke[];
        strings.forEach((val) => {
            var karaoke = { text: val, timeCode: undefined };
            this.addRowToTable(karaoke);
            this.karaoke.push(karaoke);
        });
        this.highlightRow(0);
    }

    onRowClick(el: JQueryEventObject) {
        var row = <HTMLTableRowElement>el.currentTarget;

        this.videoPlayer.currentTime = this.karaoke[row.rowIndex - 1].timeCode;
    }

    timeStampChange(ev: JQueryEventObject) {
        var input = <HTMLInputElement>ev.currentTarget;
        var index = (<HTMLTableRowElement>input.parentElement.parentElement).rowIndex;

        this.karaoke[index - 1].timeCode = input.valueAsNumber;
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();

    var main;

    var yt = new Shapes.YouTubePlayer('blah', () => {
        main.start();
    });

    var main = new Main(yt);
    
    $('#btnConvert').click(() => main.loadTextToTable());
    document.onkeydown = (ev) => main.keyHandler(ev);
};