export function scrollToTop() {
    window.scrollTo({ top: 0, left: 0 })
}

export function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, left: 0 })
}
