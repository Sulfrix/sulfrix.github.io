/**
 * Creates a <portal> element with src.
 * @param {String} src 
 */
function createPortal(src) {
    if (!'HTMLPortalElement' in window) {
        console.error(this + ": This browser does not support the html <portal> tag!")
        let portal = document.createElement('p')
        portal.innerHTML('This browser does not support Portals! On Google Chrome, they can be enabled at chrome://flags.')
        return portal
    }
    let portal = document.createElement('portal')
    if (src) {
        portal.src = src
    }
    portal.addEventListener('click', evt => {
        portal.activate();
    })
    return portal
}