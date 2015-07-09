/// <reference path="..\typings\jquery\jquery.d.ts" />
/// <reference path="..\typings\dataTables.d.ts" />

class aaDataArray {
    constructor(public array: string[]) { }

    get id(): number {
        return parseInt(this.array[4]);
    }

    get image(): string {
        return this.array[0];
    }

    get artist(): string {
        return this.array[1];
    }

    get name(): string {
        return this.array[2];
    }

    get duration(): string {
        return this.array[3];
    }
}

window.onload = () => {
    var oldStart = 0;
    $('#results').dataTable( {
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
            $(nRow).click(() => window.location.href = 'WordScramble.htm?lesson=' + data.id);
        },
		"aaData": [
			["http://img.youtube.com/vi/7pKrVB5f2W0/0.jpg", "Stromae", "Alors on danse", "3:56", "2"],
            ["http://cs13473.vk.me/u13362584/video/l_dbb29d1f.jpg", "Placebo", "Protege moi", "3:21", "1"]
		],
		"aoColumns": [
            { "sTitle": "Video",
            "mRender": function (data, type, full) {
                var record = new aaDataArray(full);
                return '<div>' + '<img width=200 style="float: left; padding-right: 10px;" src="' + record.image + '"/>' +
                   record.artist + '<br>' + record.name + '<br>Duration: ' + record.duration + '</div>';
              }}
		]
	} );
}