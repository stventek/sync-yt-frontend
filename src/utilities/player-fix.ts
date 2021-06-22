export function getDuration(player: any, pause: boolean){
    if(pause){
        player.playVideo();
        player.pauseVideo();
    }

    return new Promise<number>((resolve) => {
        const interval = setInterval(async()=> {
            const duration: number = await player.getDuration();
            if(duration > 0){
                clearInterval(interval);
                resolve(duration * 1000);
            }
        }, 50);
    })
};

export function seekTo(player: any, start: number){
    const started = new Date()
    return new Promise<void>((resolve) => {
        const interval = setInterval(async()=> {
            const duration: number = await player.getDuration();
            if(duration > 0){
                player.seekTo((0.2 + start + (new Date().getTime() - started.getTime())) * 1/1000);
                resolve();
                clearInterval(interval);
            }
        }, 50);
    })
}
