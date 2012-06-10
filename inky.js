var Inky = Ghost.extend({
	init: function (x, y) {
		this._super(x, y, 1, 'cyan');
		this.computedX = 0;
		this.computedY = 0;
		this.defaultX = game.maze.width;
		this.defaultY = game.maze.height;
	},
	update: function (gametime) {
		var crossing = game.maze.getCrossing(this.gameX, this.gameY);
		if (crossing && this.inTile < .1 && (this.computedX !== this.gameX || this.computedY !== this.gameY)) {
			this.computedX = this.gameX;
			this.computedY = this.gameY;
			var turns = game.maze.getTurns(this.gameX, this.gameY);
			var possible = possibleTurns[turns];
			if (possible.length > 1) {
				if (turns & opposite[this.direction]) {
					turns^= opposite[this.direction];
					possible = possibleTurns[turns];
				}
				
				if (game.mode === mode.chase) {
					if (Math.random() < game.inteligence) {
						var pacmanX = game.pacman.gameX + 2 * move[game.pacman.direction][0];
						var pacmanY = game.pacman.gameY + 2 * move[game.pacman.direction][1];
						var vectorX = pacmanX - game.ghosts.blinky.gameX;
						var vectorY = pacmanY - game.ghosts.blinky.gameY;
						this.targetX = this.gameX + vectorX * 2;
						this.targetY = this.gameY + vectorY * 2;
					}
				} else if (game.mode === mode.scatter) {
					this.targetX = this.defaultX;
					this.targetY = this.defaultY;
				}
			}
		}

		this._super(gametime);
	},
});
