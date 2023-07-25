export const epochToTimeAgo = (ts) => {
   var currentDate = new Date()
   var currentTs = Math.floor(currentDate.getTime())
   var secondsAgo = (currentTs - ts) / 1000

   if (secondsAgo > 365 * 24 * 3600) {
      return `${Math.floor(secondsAgo / (365 * 24 * 3600))} years ago`
   }
   if (secondsAgo > 2 * 24 * 3600) {
      return `${Math.floor(secondsAgo / (24 * 3600))} days ago`
   }
   if (secondsAgo > 24 * 3600) {
      return "yesterday"
   }
   if (secondsAgo > 3600) {
      const hours = Math.floor(secondsAgo / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
   }
   if (secondsAgo > 60) {
      const minutes = Math.floor(secondsAgo / 60) 
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
   }
   else {
      return "moments ago"
   }
}