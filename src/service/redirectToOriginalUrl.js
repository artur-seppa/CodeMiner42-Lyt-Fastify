export function redirectToOriginalUrl(shortCode, urlDatabase) {
    const urlEntry = urlDatabase[shortCode];

    if (!urlEntry) {
        return {
            status: 'error',
            message: 'Short URL not found'
        };
    } else {
        urlEntry.visits++;

        return {
            status: 'success',
            redirect: urlEntry.originalUrl
        };
    }
}