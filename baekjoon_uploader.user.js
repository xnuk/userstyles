// ==UserScript==
// @name     Baekjoon Drag-n-Drop Uploader
// @description 이제 제출할 파일을 무료로 에디터에 끌어다 놓으세요 확장자에 따른 언어 감지도 해준다 백준저지 API 만들어주세요
// @version  1
// @grant    none
// @run-at   document-end
// @match    https://acmicpc.net/submit/*
// @match    https://www.acmicpc.net/submit/*
// @updateURL https://raw.githubusercontent.com/xnuk/firefox-ext/userscripts/baekjoon_uploader.user.js
// ==/UserScript==

;(() => {
	const languages = {
		c: [0, 59, 75, 77, 101, 102, 103, 104],
		c99: [0],
		cpp: [1, 49, 60, 66, 67, 84, 85, 88, 95, 96],
		pas: [2],
		pp: [2],
		pascal: [2],
		java: [3, 91, 93, 107],
		java8: [3],
		bash: [5],
		php: [7],
		pl: [8],
		perl: [8],
		m: [10],
		go: [12, 90],
		f: [13],
		for: [13],
		f90: [13],
		scm: [14],
		ss: [14],
		sc: [15],
		scala: [15],
		lua: [16],
		js: [17, 34],
		adb: [19],
		ads: [19],
		awk: [21],
		ml: [22],
		mli: [22],
		b: [23],
		bf: [23],
		ws: [24],
		whitespace: [24],
		tcl: [26],
		tbc: [26],
		asm: [27, 87],
		s: [27, 87],
		py: [28, 73],
		py3: [28],
		d: [29, 100],
		cbl: [35],
		cob: [35],
		cpy: [35],
		pike: [41],
		sed: [43],
		rs: [44, 94, 113],
		intercal: [47],
		bc: [48],
		txt: [58],
		mm: [64],
		cc: [66, 67, 85, 96],
		rb: [68],
		kt: [69],
		alg: [70],
		algol: [70],
		befunge: [71],
		swift: [74],
		bas: [78],
		basic: [78],
		gs: [79],
		golf: [79],
		golfscript: [79],
		hx: [81],
		haxe: [81],
		lol: [82],
		lolcode: [82],
		aheui: [83],
		cs: [86],
		v: [105],
		ts: [106],
		fs: [108],
		vb: [109],
		umm: [112],
	}

	const availLanguages = () =>
		Object.fromEntries(
			Array.from(
				document.querySelectorAll('select#language > option'),
			).map(v => [v.value | 0, v.textContent.trim()]),
		)

	const selectedLanguage = () => {
		const select = document.querySelector('select#language')
		const val = select.value | 0
		const text = select.options[select.selectedIndex].textContent
		return { val, text }
	}

	const problemId = () =>
		document.querySelector('#submit_form input[name=problem_id]').value

	const submit = (source, language) => {
		const oldForm = document.getElementById('submit_form')
		const $ = s => oldForm.querySelector(s).value

		const newForm = document.createElement('form')
		newForm.setAttribute('action', oldForm.action)
		newForm.setAttribute('method', 'post')

		const input = (name, value, type = 'hidden') => {
			const input = document.createElement('input')
			input.setAttribute('type', type)
			input.setAttribute('name', name)
			input.setAttribute('value', value)
			newForm.appendChild(input)
		}

		input('problem_id', $('input[name=problem_id]'))
		input('language', language)
		input('code_open', $('input[name=code_open]:checked'))
		input('source', source)
		input('csrf_key', $('input[name=csrf_key]'))
		document.body.appendChild(newForm)
		newForm.submit()
	}

	const findLanguage = filename => {
		const possibleId = filename.match(/\d{4,}/)?.[0]
		const probId = problemId()
		if (possibleId != null && possibleId !== probId) {
			const conf = window.confirm(
				`문제 번호(${probId})가 업로드하려는 파일명(${filename})과 일치하지 않는 것 같습니다. 계속할까요?`,
			)
			if (!conf) return null
		}

		const ext = filename.split('.').pop()
		const lang = languages[ext]
		const avail = availLanguages()
		const selected = selectedLanguage()

		if (lang == null) {
			const conf = window.confirm(
				`확장자 .${ext}이 무슨 언어인지 모르겠습니다. 선택된 ${selected.text}로 제출할까요?`,
			)

			if (conf) return selected.val
			return null
		}

		if (lang.includes(selected.val)) return selected.val

		const possible = lang
			.map(v => [v, avail[v]])
			.filter(([k, v]) => v != null)

		if (possible.length === 0) {
			window.alert(
				`선택 가능한 언어 중에 .${ext} 파일에 대응하는 언어가 없는 것 같습니다. 언어 설정을 바꾸시거나 문제의 언어 제한을 확인해주세요.`,
			)

			return null
		}

		if (possible.length === 1) {
			return possible[0][0]
		}

		const [max, maxText] = possible.sort((a, b) => a[0] - b[0]).pop()

		const tt = window.confirm(
			`확장자 .${ext}에 대응하는 언어가 여러가지 있습니다. ${maxText}로 제출할까요? 원치 않으면 선택된 언어를 변경해주세요.`,
		)

		if (!tt) return null
		return max
	}

	const handleFile = file => {
		const lang = findLanguage(file.name)
		if (lang == null) return
		return file.text().then(text => submit(text, lang))
	}

	const cute = () => {
		const editor = document.querySelector('#source')?.parentElement
		if (editor == null) return

		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute(
			'style',
			[
				'bottom: 0',
				'right: 0',
				'position: absolute',
				'background: rgba(255,255,255,.6)',
				'z-index: 5',
			].join(';'),
		)
		editor.appendChild(input)

		input.addEventListener('change', e => {
			const file = e.currentTarget.files[0]
			if (file != null) handleFile(file)
		})

		editor.addEventListener(
			'drop',
			e => {
				e.preventDefault()
				e.stopPropagation()

				const first = e.dataTransfer.items?.[0]
				if (first == null || first.kind !== 'file') return
				handleFile(first.getAsFile())
			},
			{ useCapture: true },
		)
	}

	cute()
})()
