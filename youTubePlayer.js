/// <reference path="..\typings\youtube.d.ts" />
// Module
var Shapes;
(function (Shapes) {
    // Class
    var YouTubePlayer = (function () {
        // Constructor
        function YouTubePlayer(mediaUri, onPlayerReady) {
            var _this = this;
            this.mediaUri = mediaUri;
            this.player = new YT.Player('videoPlayer', {
                videoId: /v=(.*)/.exec(mediaUri)[1],
                events: {
                    onReady: function (evt) { return onPlayerReady(); },
                    onStateChange: function (evt) { return _this.onPlayerStateChange(evt); }
                }
            });
        }
        YouTubePlayer.prototype.onPlayerReady = function (event) {
        };
        YouTubePlayer.prototype.onPlayerStateChange = function (event) {
        };
        YouTubePlayer.prototype.getCurrentTime = function () {
            return this.player.getCurrentTime();
        };
        YouTubePlayer.prototype.play = function () {
            this.player.playVideo();
        };
        YouTubePlayer.prototype.pause = function () {
            this.player.pauseVideo();
        };
        Object.defineProperty(YouTubePlayer.prototype, "currentTime", {
            get: function () {
                return this.player.getCurrentTime();
            },
            set: function (val) {
                this.player.seekTo(val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YouTubePlayer.prototype, "volume", {
            get: function () {
                return this.player.getVolume();
            },
            set: function (val) {
                this.player.setVolume(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YouTubePlayer.prototype, "paused", {
            get: function () {
                return this.player.getPlayerState() == 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YouTubePlayer.prototype, "playing", {
            get: function () {
                return this.player.getPlayerState() == 1;
            },
            enumerable: true,
            configurable: true
        });
        return YouTubePlayer;
    })();
    Shapes.YouTubePlayer = YouTubePlayer;
})(Shapes || (Shapes = {}));
Object.defineProperty(HTMLAudioElement.prototype, "playing", {
    get: function () {
        return this.paused == false;
    },
    enumerable: true,
    configurable: true
});
