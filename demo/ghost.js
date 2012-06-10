var Ghost = Entity.extend({
	init: function (x, y, speed, color) {
		this._super();
		this.speed = speed || 1;
		this.color = color || '#222';
		this.x = game.canvas.getRealX(x || 0);
		this.y = game.canvas.getRealY(y || 0);
		this.state = 0;
		this.inHouse = true;
		this.direction = direction.right;
		this.turnedX = 0;
		this.turnedY = 0;
		this.justTurned = false;
		this.lastDirection = this.direction;
		this.targetX = this.defaultX;
		this.targetY = this.defaultY;
		this.lastMode = game.mode;
	},
	update: function (gametime) {
		this._super(gametime);

		if (this.inHouse) {
			if (!this.moving) {
				this.direction = opposite[this.direction];
				return;
			}
			if (this.inTile < .1 && game.maze.getTile(this.gameX, this.gameY - 1) & type.door) {
				this.direction = direction.up;
			}
			if (game.maze.getTile(this.gameX, this.gameY) & type.door) {
				this.inHouse = false;
				this.targetX = this.defaultX;
				this.targetY = this.defaultY;
			}
		} else {
			var crossing = game.maze.getCrossing(this.gameX, this.gameY);
			if (crossing && this.inTile < .1 && (this.turnedX !== this.gameX || this.turnedY !== this.gameY)) {
				this.turnedX = this.gameX;
				this.turnedY = this.gameY;

				var bestDistance = Infinity;
				var bestDirection;
				var distX, distY, distance;

				var turns = game.maze.getTurns(this.gameX, this.gameY);
				var possible = possibleTurns[turns];
				if (possible.length > 1) {
					if (turns & opposite[this.direction]) {
						turns^= opposite[this.direction];
						possible = possibleTurns[turns];
					}
					for (var i = 0, ii = possible.length; i < ii; ++i) {
						distX = Math.pow(this.targetX - (this.gameX + move[possible[i]][0]), 2);
						distY = Math.pow(this.targetY - (this.gameY + move[possible[i]][1]), 2);
						distance = Math.sqrt(distX + distY);

						if (distance < bestDistance) {
							bestDistance = distance;
							bestDirection = possible[i];
						}
					}

					this.direction = bestDirection;
				} else {
					this.direction = possible[0];
				}
			}
		}

	},
	render: function (canvas) {
		var ctx = canvas.ctx;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x + 1, this.y + (canvas.tileHeight - 1));
		ctx.lineTo(this.x + 1, this.y + ((canvas.tileHeight - 1) / 2));
		ctx.arc(this.x + canvas.tileWidth / 2, this.y + canvas.tileHeight / 2, canvas.tileWidth / 2 - 1, Math.PI, 2 * Math.PI, false);
		ctx.lineTo(this.x + (canvas.tileWidth - 1), this.y + (canvas.tileHeight - 1));
		ctx.fill();
		//ctx.fillRect(this.targetX * canvas.tileWidth, this.targetY * canvas.tileHeight, canvas.tileWidth, canvas.tileHeight);
	},
	canGo: function (tile) {
		return tile & (this.inHouse ? type.house : type.floor);
	},
});
