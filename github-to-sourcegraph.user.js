// ==UserScript==
// @name     GitHub -> Sourcegraph
// @version  1
// @grant    none
// @match    https://github.com/*/*
// @run-at   document-end
// ==/UserScript==

const loc = () => {
	const path = /^(?:\/[^\/]+){2}/.exec(window.location.pathname)?.[0]
	if (path == null) return null
	return `https://sourcegraph.com/github.com${path}`
}

const anchor = document.createElement('a')
anchor.href = loc()
anchor.textContent = 'Search in Sourcegraph'
anchor.className =
	'Button Button--secondary Button--medium AppHeader-button color-fg-muted'

const changer = () => {
	const div = document.getElementsByClassName('AppHeader-search')[0]
	if (div != null) {
		div.replaceWith(anchor)
	}
	anchor.href = loc()
}

const observer = new MutationObserver(changer)
observer.observe(document.body, { childList: true })
changer()
