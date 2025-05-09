window.addEventListener('keydown', (event) => {
	//console.log(event)
	switch (event.key) {
		case 'a':
			keys.any.pressed = true
			keys.a.pressed = true
			break
		case 'd':
			keys.any.pressed = true
			keys.d.pressed = true
			break
		case 'w':
			keys.any.pressed = true
			keys.w.pressed = true
			break
	}
})

window.addEventListener('keyup', (event) => {
	//console.log(event)
	switch (event.key) {
		case 'a':
			keys.any.pressed = false
			keys.a.pressed = false
			break
		case 'd':
			keys.any.pressed = false
			keys.d.pressed = false
			break
		case 'w':
			keys.any.pressed = false
			keys.w.pressed = false
	}
})