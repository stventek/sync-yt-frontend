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
                resolve(duration);
            }
        }, 50);
    })
}
