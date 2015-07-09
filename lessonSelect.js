/// <reference path="..\typings\jquery\jquery.d.ts" />
/// <reference path="..\typings\dataTables.d.ts" />
var aaDataArray = (function () {
    function aaDataArray(array) {
        this.array = array;
    }
    Object.defineProperty(aaDataArray.prototype, "id", {
        get: function () {
            return parseInt(this.array[4]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(aaDataArray.prototype, "image", {
        get: function () {
            return this.array[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(aaDataArray.prototype, "artist", {
        get: function () {
            return this.array[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(aaDataArray.prototype, "name", {
        get: function () {
            return this.array[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(aaDataArray.prototype, "duration", {
        get: function () {
            return this.array[3];
        },
        enumerable: true,
        configurable: true
    });
    return aaDataArray;
})();
window.onload = function () {
    var oldStart = 0;
    $('#results').dataTable({
        bLengthChange: false,
        "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap",
        "fnDrawCallback": function (o) {
            // scroll to top on page change
            if (o._iDisplayStart != oldStart) {
                $('html,body').animate({ scrollTop: 0 }, 500);
                oldStart = o._iDisplayStart;
            }
            $('#results tbody tr').hover(function () {
                $(this).css('cursor', 'pointer');
            }, function () {
                $(this).css('cursor', 'auto');
            });
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var data = new aaDataArray(aData);
            $(nRow).click(function () { return window.location.href = 'WordScramble.htm?lesson=' + data.id; });
        },
        "aaData": [
            ["http://img.youtube.com/vi/7pKrVB5f2W0/0.jpg", "Stromae", "Alors on danse", "3:56", "2"],
            ["http://cs13473.vk.me/u13362584/video/l_dbb29d1f.jpg", "Placebo", "Protege moi", "3:21", "1"]
        ],
        "aoColumns": [
            { "sTitle": "Video", "mRender": function (data, type, full) {
                var record = new aaDataArray(full);
                return '<div>' + '<img width=200 style="float: left; padding-right: 10px;" src="' + record.image + '"/>' + record.artist + '<br>' + record.name + '<br>Duration: ' + record.duration + '</div>';
            } }
        ]
    });
};
