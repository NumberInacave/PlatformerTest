class CollisionBlock {
    constructor({position}) {
        this.position = position
        this.width = 32
        this.height = 32
        this.opacity = 1
    }
    draw() {
        c.fillStyle = 'rgba(130, 130, 130, ' + String(this.opacity) + ')'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}