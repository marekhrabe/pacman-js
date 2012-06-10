var Pacman = Entity.extend({
	init: function (x, y, speed) {
		this._super();
		this.speed = speed || 1;
		this.nextDirection = this.direction;
		this.x = game.canvas.getRealX(x);
		this.y = game.canvas.getRealY(y);
		this.state = 0;

		var pacman = this;

		addEventListener('keydown', function (e) {
			switch (e.keyCode) {
				case 38: 
					pacman.nextDirection = direction.up;
					break;
				case 40: 
					pacman.nextDirection = direction.down;
					break;
				case 37: 
					pacman.nextDirection = direction.left;
					break;
				case 39: 
					pacman.nextDirection = direction.right;
					break;

			}
		});
	},
	update: function (gametime) {
		this._super(gametime);

		// collisions

		var ghost;
		for (var name in game.ghosts) {
			ghost = game.ghosts[name];
			if (this.gameX === ghost.gameX && this.gameY === ghost.gameY) {
				game.pause();
				alert('died');
				return;
			}
		}

		// animation
		if (this.moving) {
			this.state = (this.state + 1) % 16;
		} else {
			this.state = 8;
		}
		
		// eating
		if (game.maze.getTile(this.gameX, this.gameY) & type.food) {
			game.maze.eat(this.gameX, this.gameY);
		}

		// controlling
		if (this.direction !== this.nextDirection) {
			var turns = game.maze.getTurns(this.gameX, this.gameY);
			if (turns & this.nextDirection) {
				if (this.direction === direction.left && this.nextDirection === direction.right) {
					this.turn();
				} else if (this.direction === direction.right && this.nextDirection === direction.left) {
					this.turn();
				} else if (this.direction === direction.up && this.nextDirection === direction.down) {
					this.turn();
				} else if (this.direction === direction.down && this.nextDirection === direction.up) {
					this.turn();
				} else if (this.inTile < .2) {
					this.turn();
				}
			}
		}
	},
	render: function (canvas) {
		var ctx = canvas.ctx;

		var rotate;
		var plusX = 0;
		var plusY = 0;
		if (this.direction === direction.left) {
			rotate = 0;
			plusY = 1;
		} else if (this.direction === direction.right) {
			rotate = Math.PI;
			plusY = -1;
		} else if (this.direction === direction.up) {
			rotate = Math.PI / 2;
			plusX = -1;
		} else if (this.direction === direction.down) {
			rotate = Math.PI + Math.PI / 2;
			plusX = 1;
		}

		var state = Math.abs(this.state - 8);

		ctx.fillStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(this.x + canvas.tileWidth / 2 + plusX, this.y + canvas.tileHeight / 2 + plusY, canvas.tileWidth / 2 - 1, rotate + Math.PI + state / 10, rotate + 2 * Math.PI + state / 10, false);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.x + canvas.tileWidth / 2, this.y + canvas.tileHeight / 2, canvas.tileWidth / 2 - 1, rotate + 2 * Math.PI - state / 10, rotate + Math.PI - state / 10, false);
		ctx.fill();
	},
	turn: function () {
		this.direction = this.nextDirection;
	},
});
