var Pinky = Ghost.extend({
	init: function (x, y) {
		this._super(x, y, 1, '#ffb8ff');
		this.computedX = 0;
		this.computedY = 0;
		this.defaultX = -1;
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
						// pinky is going 4 tiles in front of pacman
						this.targetX = game.pacman.gameX + 4 * move[game.pacman.direction][0];
						this.targetY = game.pacman.gameY + 4 * move[game.pacman.direction][1];
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
