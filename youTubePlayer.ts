/// <reference path="typings\youtube.d.ts" />

// Module
module Shapes {

    // Interface
    export interface IMediaPlayer {
        play();
        pause();
        currentTime: number;
        volume: number;
        paused: bool;
        playing: bool;
    }

    // Class
    export class YouTubePlayer implements IMediaPlayer {
        player: YT.Player;

        // Constructor
        constructor(public mediaUri: string, onPlayerReady: () => any) {
            this.player = new YT.Player('videoPlayer', {
                videoId: /v=(.*)/.exec(mediaUri)[1],
                events: {
                    onReady: (evt) => onPlayerReady(),
                    onStateChange: (evt) => this.onPlayerStateChange(evt)
                }
            });
        }

        onPlayerReady(event) {
            
        }

        onPlayerStateChange(event) {
        }

        getCurrentTime() {
            return this.player.getCurrentTime();
        }

        play() {
            this.player.playVideo();
        }

        pause() {
            this.player.pauseVideo();
        }

        get currentTime(): number {
            return this.player.getCurrentTime();
        }

        set currentTime(val: number) {
            this.player.seekTo(val, true);
        }

        get volume(): number {
            return this.player.getVolume();
        }

        set volume(val: number) {
            this.player.setVolume(val);
        }

        get paused(): bool {
            return this.player.getPlayerState() == 2;
        }

        get playing(): bool {
            return this.player.getPlayerState() == 1;
        }
    }
}

interface HTMLAudioElement extends HTMLMediaElement {
    playing: bool;
}

Object.defineProperty(HTMLAudioElement.prototype, "playing", {
    get: function () {
        return this.paused == false;
    },
    enumerable: true,
    configurable: true
});