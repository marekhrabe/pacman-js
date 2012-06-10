var Maze = Class.extend({
	init: function (data) {
		this.data = data;
		this.width = data[0].length;
		this.height = data.length;
		this.crossings = {};
		this.turns = {};

		var turns;
		for (var i = 1; i < this.height - 1; ++i) {
			for (var j = 1; j < this.width - 1; ++j) {
				turns = 0;
				if (this.data[i][j] & type.floor) {
					if (this.data[i][j + 1] & type.floor) {
						turns|= direction.right;
					}
					if (this.data[i][j - 1] & type.floor) {
						turns|= direction.left;
					}
					if (this.data[i - 1][j] & type.floor) {
						turns|= direction.up;
					}
					if (this.data[i + 1][j] & type.floor) {
						turns|= direction.down;
					}

					if (!this.turns[i]) {
						this.turns[i] = {};
					}
					this.turns[i][j] = turns;

					// crossings only
					if ((turns !== 0 && turns !== 3 && turns !== 12) || this.data[i + 1][j] & type.door) {
						if (!this.crossings[i]) {
							this.crossings[i] = {};
						}
						this.crossings[i][j] = turns;
					}
				}
			}
		}
	},
	update: function (gametime) {
		for (var i = 0; i < this.height; ++i) {
			for (var j = 0; j < this.width; ++j) {
				if (this.data[i][j] & type.food) {
					return;
				}
			}
		}
		game.pause();
		alert('winner');
	},
	render: function (canvas) {
		var ctx = canvas.ctx;
		ctx.clearRect(-canvas.tileWidth, -canvas.tileHeight, canvas.width + canvas.tileWidth * 2, canvas.height + canvas.tileHeight * 2);
		for (var i = 0; i < this.height; ++i) {
			for (var j = 0; j < this.width; ++j) {
				if (this.data[i][j] & type.wall) {
					ctx.fillStyle = 'blue';
					ctx.fillRect(canvas.getRealX(j), canvas.getRealY(i), canvas.tileWidth, canvas.tileHeight);
				} else if (this.data[i][j] & type.floor) {
					if (this.data[i][j] & type.food) {
						ctx.fillStyle = 'white';
						ctx.beginPath();
						ctx.arc(canvas.getRealX(j) + canvas.tileWidth / 2, canvas.getRealY(i) + canvas.tileHeight / 2, 1.5, 0, 2 * Math.PI, false);
						ctx.fill();
					}
				}
			}
		}
	},
	getTile: function (x, y) {
		return this.data[y][x];
	},
	getCrossing: function (x, y) {
		return this.crossings[y] && this.crossings[y][x];
	},
	getTurns: function (x, y) {
		return this.turns[y] && this.turns[y][x];
	},
	eat: function (x, y) {
		return this.data[y][x] = this.data[y][x] ^ type.food;
	},
});
