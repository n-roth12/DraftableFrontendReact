export const epochToTimeAgo = (ts) => {
    var currentDate = new Date()
    var currentTs = Math.floor(currentDate.getTime())
    var secondsAgo = (currentTs - ts) / 1000;

   if (secondsAgo > 365*24*3600) {
      return `${Math.floor(secondsAgo / (365*24*3600))} years ago`
   }
    if (secondsAgo > 2*24*3600) {
       return `${Math.floor(secondsAgo / (24*3600))} days ago`
    }
    if (secondsAgo > 24*3600) {
       return "yesterday"
    }
    if (secondsAgo > 3600) {
       return "a few hours ago"
    }
    if (secondsAgo > 60) {
      return "a few minutes ago"
    }
    else {
       return "a few seconds ago"
    }
}