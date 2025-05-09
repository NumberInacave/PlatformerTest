class Player {
	constructor({collisionBlocks = []}) {
		this.position = {
			x: 0,
			y: 0,
		}
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.width = 16 //16 //63.9
		this.height = 16 //2 //32
		this.collisionBlocks = collisionBlocks
		this.speed = 6//6
		this.acceleration = 1.5
		this.friction = 0.3
		this.gravity = 0.85
		this.jumpForce = -13
		//this.jumpTimer = 0
		this.coyoteTime = 0.25
		this.isJumping = false
	}
	draw() {
		c.fillStyle = 'rgba(150, 245, 150, 1)'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	update() {
		this.position.x += this.velocity.x
		this.checkHorizontalCollisions()
		this.applyGravity()
		this.checkVerticalCollisions()
		this.movement()
	}
	checkHorizontalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i += 1) {
			const collisionBlock = this.collisionBlocks[i]
			if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
				this.position.x + this.width >= collisionBlock.position.x &&
				this.position.y + this.height >= collisionBlock.position.y &&
				this.position.y <= collisionBlock.position.y + collisionBlock.height
			) {
				if (player.velocity.x < -0) {
					player.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
					break
				}
				if (player.velocity.x > 0) {
					player.position.x = collisionBlock.position.x - player.width - 0.01
					break 
				}
			}
		}
	}
	applyGravity() {
		this.velocity.y += this.gravity
		this.position.y += this.velocity.y
	}
	checkVerticalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i += 1) {
			const collisionBlock = this.collisionBlocks[i]
			if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
				this.position.x + this.width >= collisionBlock.position.x &&
				this.position.y + this.height >= collisionBlock.position.y &&
				this.position.y <= collisionBlock.position.y + collisionBlock.height
			) {
				if (player.velocity.y < -0) {
					player.velocity.y = 0
					player.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
					break
				}
				if (player.velocity.y > 0) {
					player.velocity.y = 0
					player.position.y = collisionBlock.position.y - player.height - 0.01
					break 
				}
			}
		}
	}
	movement() {
		if (keys.w.pressed) {
			if (this.velocity.y === 0) {
				if (!this.isJumping) {
					this.isJumping = true
					this.velocity.y = this.jumpForce
				}
			}
		}
		else if (!keys.w.pressed) {
			this.isJumping = false
		}
		if (this.isJumping) this.velocity.x = lerp(this.velocity.x, 0, 0.25)
		if (keys.a.pressed) this.velocity.x -= this.acceleration
		else if (keys.d.pressed) this.velocity.x += this.acceleration
		else {
			if (this.velocity.y === 0) {
				if (!this.isJumping) this.velocity.x = lerp(this.velocity.x, 0, this.friction)
			}
			if (!this.velocity.y === 0) {
				if (this.isJumping) this.velocity.x = lerp(this.velocity.x, 0, this.friction + 0.5)
			}
		}
		this.velocity.x = clamp(this.velocity.x, -this.speed, this.speed)
	}
}