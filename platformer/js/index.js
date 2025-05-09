const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
/*
canvas.width = window.innerWidth
canvas.height = window.innerHeight
*/
canvas.width = 64 * 22
canvas.height = 64 * 12

document.addEventListener("DOMContentLoaded", () => {
	let idleMouseTimer
	let forceMouseHide = false
	document.body.style.cursor = "none"
	document.body.addEventListener("mousemove", () => {
	if (forceMouseHide) {
	return
	}
	document.body.style.cursor = ""
	clearTimeout(idleMouseTimer)
	idleMouseTimer = setTimeout(() => {
	document.body.style.cursor = "none"
	forceMouseHide = true
	setTimeout(() => {
	forceMouseHide = false
	}, 200)
	}, 1000)
	})
})

const lerp = (x, y, a) => x * (1 - a) + y * a;
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
const parsedCollisions = collisionsLevel1.parse2d()
const collisionBlocks1 = parsedCollisions.createObjectsFrom2d()

const keys = {
	any: {pressed: false,},
	w: {pressed: false,},
	a: {pressed: false,},
	d: {pressed: false,},
}
const triangle = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: './img/3triangle.png'
})

const player = new Player({
	position: {
		x: 0,
		y: 0,
	},
	collisionBlocks: collisionBlocks1
})

function wait(n) {
	setTimeout(n)
}

function drawShape(x, y, r, sides) {
	c.translate(x, y);
	for (let i = 0; i < sides; i++) {
	  const rotation = ((Math.PI * 2) / sides) * i;
	  if (i === 0) {
		c.moveTo(r * Math.cos(rotation), r * Math.sin(rotation));
	  } else {
		c.lineTo(r * Math.cos(rotation), r * Math.sin(rotation));
	  }
	}
	c.closePath();
	c.stroke();
	c.resetTransform();
  }  

player.position.x = 32 * 1 + 16 - player.width / 2
player.position.y = 32 * 1 + 16 - player.height / 2
//document.body.style.cursor = "none"

function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = 'rgb(140, 150, 240)'
	c.fillRect(0, 0, canvas.width, canvas.height)
	collisionBlocks1.forEach(CollisionBlock => {
		CollisionBlock.draw()
	})
	CollisionBlock.opacity -= 0.01
	player.draw()
	player.update()
	//triangle.draw()
}

animate()