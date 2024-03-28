// ==UserScript==
// @name GitHub -> Sourcegraph
// @version 1
// @grant none
// @match https://github.com/*
// @run-at document-end
// @updateURL https://raw.githubusercontent.com/xnuk/firefox-ext/userscripts/github-to-sourcegraph.user.js
// ==/UserScript==

const anchor = document.createElement('a')
anchor.textContent = 'Search in Sourcegraph'
anchor.className =
	'Button Button--secondary Button--medium AppHeader-button color-fg-muted'

let pathBefore = null

const update = () => {
	const path = /^(?:\/[^\/]+){2}/.exec(window.location.pathname)?.[0]
	if (path === pathBefore) return
	pathBefore = path

	if (path == null) {
		anchor.href = 'https://sourcegraph.com/search'
	} else {
		anchor.href = `https://sourcegraph.com/github.com${path}`
	}
}

const changer = () => {
	if (!anchor.isConnected) {
		const poorSearchButton =
			document.getElementsByClassName('AppHeader-search')[0]

		if (poorSearchButton != null) {
			poorSearchButton.replaceWith(anchor)
		}
	}

	update()
}

const observer = new MutationObserver(changer)
// [aria-busy], [class], [data-turbo-loaded]
observer.observe(document.documentElement, { attributes: true })
changer()
