var Blinky = Ghost.extend({
	init: function (x, y) {
		this._super(x, y, 1.2, 'red');
		this.computedX = 0;
		this.computedY = 0;
		this.defaultX = game.maze.width;
		this.defaultY = -1;
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
						// blinky follows pacman
						this.targetX = game.pacman.gameX;
						this.targetY = game.pacman.gameY;
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
