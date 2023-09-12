export const getUuidFromUrl = () => {
    const uuidArray = window.location.pathname.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/g,
    )

    if (uuidArray === null) return []

    return uuidArray
}
