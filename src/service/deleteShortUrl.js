export function deleteShortUrl(urlId, urlDatabase) {
    const urlEntry = urlDatabase[urlId];

    if (!urlEntry) {
        return {
            status: 'error',
            message: 'Short URL not found'
        };
    }

    delete urlDatabase[urlId];

    return {
        status: 'success',
        message: 'URL deleted successfully'
    };
}