export const epochToTimeAgo = (ts) => {
    var currentDate = new Date()
    var currentTs = Math.floor(currentDate.getTime())
    var secondsAgo = (currentTs - ts) / 1000;

    if (secondsAgo > 2*24*3600) {
       return "a few days ago";
    }
    if (secondsAgo > 24*3600) {
       return "yesterday";
    }
    if (secondsAgo > 3600) {
       return "a few hours ago";
    }
    else {
       return "a few seconds ago";
    }
}