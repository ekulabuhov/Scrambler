/// <reference path="..\typings\jquery\jquery.d.ts" />
/// <reference path="youTubePlayer.ts" />
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
var TableColumns = (function () {
    function TableColumns() {
    }
    TableColumns.text = 1;
    TableColumns.timeCode = 1;
    return TableColumns;
})();
var Main = (function () {
    function Main(videoPlayer) {
        this.videoPlayer = videoPlayer;
        this.karaoke = [];
        //this.videoPlayer = <HTMLVideoElement>document.getElementById('videoPlayer');
        //this.videoPlayer.src = videoSrc;
        if (this.karaoke != null)
            this.loadKaraokeToTable(this.karaoke);
        this.timeSpan = document.getElementById('timeSpan');
        this.previewDiv = document.getElementById('preview');
        this.tableIndex = 0;
    }
    Main.prototype.start = function () {
        var _this = this;
        this.timerHandle = setInterval(function () {
            var currentTime = _this.videoPlayer.currentTime;
            _this.timeSpan.innerHTML = currentTime.toString();
            var matchingRecords = _this.karaoke.filter(function (el, index, array) {
                return el.timeCode <= currentTime;
            });
            if (matchingRecords.length > 0 && currentTime - matchingRecords[matchingRecords.length - 1].timeCode < 5) {
                _this.previewDiv.innerHTML = matchingRecords[matchingRecords.length - 1].text;
            }
            else
                _this.previewDiv.innerHTML = '';
        }, 100);
    };
    Main.prototype.highlightRow = function (index) {
        var rows = $('#rows > tr');
        if (index < rows.length && index >= 0) {
            rows.removeClass('highlighted');
            $(rows[index]).addClass('highlighted');
            this.tableIndex = index;
        }
    };
    Main.prototype.keyHandler = function (ev) {
        if ($(':focus').length > 0 && $(':focus')[0].id == 'text')
            return true;
        console.log(ev.keyCode);
        switch (ev.keyCode) {
            case 32:
                if (this.videoPlayer.playing == false)
                    this.videoPlayer.play();
                else
                    this.videoPlayer.pause();
                break;
            case 37:
                this.videoPlayer.currentTime -= 2;
                break;
            case 39:
                this.videoPlayer.currentTime += 2;
                break;
            case 79:
                this.highlightRow(this.tableIndex - 1);
                break;
            case 80:
                this.highlightRow(this.tableIndex + 1);
                break;
            case 13:
                // Save timestamp
                var timeStamp = this.videoPlayer.currentTime;
                $('#rows > tr:eq(' + this.tableIndex + ') > td > input').val(timeStamp.toString());
                this.karaoke[this.tableIndex].timeCode = timeStamp;
                this.highlightRow(this.tableIndex + 1);
                break;
            case 40:
                if (this.videoPlayer.volume >= 0.1)
                    this.videoPlayer.volume -= 0.1;
                else
                    this.videoPlayer.volume = 0;
                break;
            case 38:
                if (this.videoPlayer.volume <= 0.9)
                    this.videoPlayer.volume += 0.1;
                else
                    this.videoPlayer.volume = 1;
                break;
            default:
                return true;
        }
        return false;
    };
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
    Main.prototype.loadKaraokeToTable = function (karaoke) {
        var _this = this;
        karaoke.forEach(function (val) {
            _this.addRowToTable(val);
        });
        this.highlightRow(0);
    };
    Main.prototype.getTimeCodes = function () {
        return this.karaoke.map(function (val) {
            return val.timeCode.toFixed(1);
        });
    };
    Main.prototype.addRowToTable = function (karaoke) {
        var _this = this;
        var timeCode = (karaoke.timeCode != undefined) ? karaoke.timeCode.toFixed(1) : "";
        $('#rows').append('<tr>' + '<td>' + karaoke.text + '</td>' + '<td><input type="number" step="0.1" value="' + timeCode + '"></td>' + '<td></td>' + '</tr>');
        $('#rows tr').click(function (ev) { return _this.onRowClick(ev); });
        $('#rows tr td input').on('change', function (ev) { return _this.timeStampChange(ev); });
    };
    Main.prototype.loadTextToTable = function () {
        var _this = this;
        var text = $('#text').val();
        var strings = text.split('\n');
        //this.karaoke = new Karaoke[];
        strings.forEach(function (val) {
            var karaoke = { text: val, timeCode: undefined };
            _this.addRowToTable(karaoke);
            _this.karaoke.push(karaoke);
        });
        this.highlightRow(0);
    };
    Main.prototype.onRowClick = function (el) {
        var row = el.currentTarget;
        this.videoPlayer.currentTime = this.karaoke[row.rowIndex - 1].timeCode;
    };
    Main.prototype.timeStampChange = function (ev) {
        var input = ev.currentTarget;
        var index = input.parentElement.parentElement.rowIndex;
        this.karaoke[index - 1].timeCode = input.valueAsNumber;
    };
    return Main;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
    var main;
    var yt = new Shapes.YouTubePlayer('blah', function () {
        main.start();
    });
    var main = new Main(yt);
    $('#btnConvert').click(function () { return main.loadTextToTable(); });
    document.onkeydown = function (ev) { return main.keyHandler(ev); };
};
