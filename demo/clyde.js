var Clyde = Ghost.extend({
	init: function (x, y) {
		this._super(x, y, 1, '#ffb851');
		this.computedX = 0;
		this.computedY = 0;
		this.defaultX = -1;
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
						var distance = Math.sqrt(Math.pow(this.gameX - game.pacman.gameX, 2) + Math.pow(this.gameY - game.pacman.gameY, 2));

						if (distance >= 8) {
							this.targetX = game.pacman.gameX;
							this.targetY = game.pacman.gameY;
						} else {
							this.targetX = this.defaultX;
							this.targetY = this.defaultY;
						}
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
