interface MusicPlayer {
    play(): void;
    pause(): void;
    stop(): void;
    rewind(seconds: number): void;
    fastForward(seconds: number): void;
}
