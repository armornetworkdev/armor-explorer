function timeDifference(previous, current = Date.now() / 1000) {
    const sPerMinute = 60;
    const sPerHour = sPerMinute * 60;
    const sPerDay = sPerHour * 24;
    const sPerMonth = sPerDay * 30;
    const sPerYear = sPerDay * 365;
    const elapsed = current - previous;

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

module.exports = {
    timeDifference
};
