"use strict";
var BasicMusicPlayer = /** @class */ (function () {
    function BasicMusicPlayer() {
    }
    BasicMusicPlayer.prototype.fastForward = function (seconds) {
        console.log("Moving forward " + seconds + " seconds");
    };
    BasicMusicPlayer.prototype.pause = function () {
        console.log("Pausing");
    };
    BasicMusicPlayer.prototype.play = function () {
        console.log("Playing");
    };
    BasicMusicPlayer.prototype.rewind = function (seconds) {
        console.log("Rewinding " + seconds);
    };
    BasicMusicPlayer.prototype.stop = function () {
        console.log("Stopping");
    };
    return BasicMusicPlayer;
}());
