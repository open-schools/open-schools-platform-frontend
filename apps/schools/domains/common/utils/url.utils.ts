import { JAVASCRIPT_URL_XSS } from '../constants/regexp'

// refs to: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
export function extractHostname(url: string) {
    let hostname

    if (url.indexOf('//') > -1) {
        hostname = url.split('/')[2]
    } else {
        hostname = url.split('/')[0]
    }

    hostname = hostname.split(':')[0]
    hostname = hostname.split('?')[0]

    return hostname
}

export function extractRootDomain(url: string) {
    let domain = extractHostname(url)
    const domainPaths = domain.split('.')
    const pathLength = domainPaths.length

    if (pathLength > 2) {
        domain = domainPaths[pathLength - 2] + '.' + domainPaths[pathLength - 1]
        if (
            domainPaths[pathLength - 2].length === 2 &&
            domainPaths[pathLength - 1].length === 2
        ) {
            domain = domainPaths[pathLength - 3] + '.' + domain
        }
    }

    return domain
}

export function extractOrigin(url: string) {
    try {
        return new URL(url).origin
    } catch {
        return null
    }
}

/**
 * Detects if url contains XSS script
 * @param url
 * @returns {boolean}
 */
export function isSafeUrl(url: string) {
    if (typeof url !== 'string' || !url) return false
    const decodedUrl = decodeURI(url)

    return true
}
