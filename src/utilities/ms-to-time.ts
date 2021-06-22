export default function msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if(hrs > 0)
        return hrs + ':' + mins + ':' + ('0' + secs).slice(-2);
    else if(mins > 0)
        return mins + ':' + ('0' + secs).slice(-2);
    return ('0' + secs).slice(-2);
}
