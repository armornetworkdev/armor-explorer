function timeDifference(previous, current) {
	сurrent = Date.now() / 1000;
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;
    var elapsed = current - previous;

    if (elapsed < sPerMinute) {
         return Math.round(elapsed) + ' seconds ago';
    } else if (elapsed < sPerHour) {
         return Math.round(elapsed/sPerMinute) + ' minutes ago';
    } else if (elapsed < sPerDay) {
         return Math.round(elapsed/sPerHour ) + ' hours ago';
    } else if (elapsed < sPerMonth) {
        return 'approximately ' + Math.round(elapsed/sPerDay) + ' days ago';
    } else if (elapsed < sPerYear) {
        return 'approximately ' + Math.round(elapsed/sPerMonth) + ' months ago';
    }
    return 'approximately ' + Math.round(elapsed/sPerYear ) + ' years ago';
}
