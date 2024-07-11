// ==UserScript==
// @name     Twitter hangul sucks
// @description 한글 끝단어 짤림 방지
// @version  3
// @grant    none
// @match    https://twitter.com/*
// @match    https://x.com/*
// @noframes
// @icon     https://twitter.com/favicon.ico
// @run-at   document-end
// @updateURL https://raw.githubusercontent.com/xnuk/firefox-ext/userscripts/twitter-hangul-sucks.user.js
// ==/UserScript==

;(() => {
	const listener = e => {
		const target = e.target
		const isDM = target.dataset.testid.startsWith('dmComposer')
		if (
			// DM -> Enter / Tweet -> Ctrl + Enter
			(e.ctrlKey || isDM) &&
			e.key === 'Enter' &&
			target.isContentEditable
		) {
			target.contentEditable = false
			e.stopPropagation()
			setTimeout(() => target.dispatchEvent(e), 200)
			setTimeout(() => (target.contentEditable = true), 400)
		}
	}

	const addListener = () =>
		[
			...document.querySelectorAll(
				'.public-DraftEditor-content[contenteditable]',
			),
		].map(v => v.addEventListener('keydown', listener))

	const observer = new MutationObserver(mutations => {
		if (
			mutations.some(({ addedNodes }) =>
				[...addedNodes].some(node => node.isContentEditable),
			)
		)
			addListener()
	})

	observer.observe(document.getElementById('react-root'), {
		childList: true,
		subtree: true,
	})
})()
