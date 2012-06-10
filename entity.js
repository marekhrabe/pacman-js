var Entity = Class.extend({
	init: function () {
		this.speed = 1;
		this.direction = direction.left;
		this.moving = false;
		this.x = 0;
		this.y = 0;
		this.gameX = 0;
		this.gameY = 0;
		this.inTile = 0;
	},
	update: function () {
		// computing coords
		var x = Math.floor(this.x / game.canvas.tileWidth);
		var y = Math.floor(this.y / game.canvas.tileHeight);
		this.gameX = Math.round(this.x / game.canvas.tileWidth);
		this.gameY = Math.round(this.y / game.canvas.tileHeight);

		// what part of entity is in tile
		this.inTile = Math.sqrt(Math.pow(this.x - this.gameX * game.canvas.tileWidth, 2) + Math.pow(this.y - this.gameY * game.canvas.tileHeight, 2)) / ((game.canvas.tileWidth + game.canvas.tileHeight) / 2);

		// movment
		this.moving = false;
		if (this.direction === direction.left) {
			if (this.canGo(game.maze.getTile(Math.floor((this.x - 1) / game.canvas.tileWidth), y))) {
				this.x -= this.speed;
				this.moving = true;
			} else {
				this.x = this.gameX * game.canvas.tileWidth;
			}
			this.y = this.gameY * game.canvas.tileHeight;
		} else if (this.direction === direction.right) {
			if (this.canGo(game.maze.getTile(x + 1, y))) {
				this.x += this.speed;
				this.moving = true;
			} else {
				this.x = this.gameX * game.canvas.tileWidth;
			}
			this.y = this.gameY * game.canvas.tileHeight;
		} else if (this.direction === direction.down) {
			if (this.canGo(game.maze.getTile(x, y + 1))) {
				this.y += this.speed;
				this.moving = true;
			} else {
				this.y = this.gameY * game.canvas.tileHeight;
			}
			this.x = this.gameX * game.canvas.tileWidth;
		} else if (this.direction === direction.up) {
			if (this.canGo(game.maze.getTile(x, Math.floor((this.y - 1) / game.canvas.tileHeight)))) {
				this.y -= this.speed;
				this.moving = true;
			} else {
				this.y = this.gameY * game.canvas.tileHeight;
			}
			this.x = this.gameX * game.canvas.tileWidth;
		}

		// teleport
		if (this.gameY === 0 && this.direction === direction.up) {
			this.y = (game.maze.height - 1) * game.canvas.tileHeight;
		}
		if (this.gameY === game.maze.height - 1 && this.direction === direction.down) {
			this.y = 0;
		}
		if (this.gameX === 0 && this.direction === direction.left) {
			this.x = (game.maze.width - 1) * game.canvas.tileWidth;
		}
		if (this.gameX === game.maze.width - 1 && this.direction === direction.right) {
			this.x = 0;
		}
	},
	canGo: function (tile) {
		return tile & type.floor;
	},
});
