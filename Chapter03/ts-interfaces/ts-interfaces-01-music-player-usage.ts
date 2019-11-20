class BasicMusicPlayer implements MusicPlayer {
    fastForward(seconds: number): void {
        console.log(`Moving forward ${seconds} seconds`);
    }

    pause(): void {
        console.log("Pausing");
    }

    play(): void {
        console.log("Playing")
    }

    rewind(seconds: number): void {
        console.log(`Rewinding ${seconds}`);
    }

    stop(): void {
        console.log("Stopping");
    }
    
}