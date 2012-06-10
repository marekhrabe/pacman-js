var Game = Class.extend({
	init: function (options) {
		this.running = false;
		this.canvas = new Canvas(options.canvas, options.tileWidth, options.tileHeight);
		this.maze = new Maze(options.maze);
		this.mode = mode.scatter;
		this.inteligence = .7;
		this.scatters = [[0, 7], [27, 34], [54, 59], [79, 84]];

		this.canvas.ctx.translate(this.canvas.tileWidth, this.canvas.tileHeight);
	},
	prepare: function (options) {
		this.pacman = new Pacman(options.pacman.x, options.pacman.y, options.pacman.speed);
		this.ghosts = options.ghosts;
	},
	start: function () {
		this.running = true;
		this.started = +new Date();
		this.loop();
	},
	pause: function () {
		this.running = false;
	},
	loop: function () {
		if (game.running) {
			var gametime = new Date() - this.started;
			requestAnimFrame(function () {
				game.loop();
			});
			this.update(gametime);
			this.render(this.canvas);
		}
	},
	update: function (gametime) {
		var sec = Math.floor(gametime / 1000);
		this.mode = mode.chase;
		
		for (var i = 0, ii = this.scatters.length; i < ii; ++i) {
			if (sec > this.scatters[i][0] && sec < this.scatters[i][1]) {
				this.mode = mode.scatter;
				break;
			}
		}

		this.pacman.update(gametime);
		this.maze.update(gametime);
		for (var name in this.ghosts) {
			this.ghosts[name].update();
		}
	},
	render: function (canvas) {
		this.maze.render(canvas);
		for (var name in this.ghosts) {
			this.ghosts[name].render(canvas);
		}
		this.pacman.render(canvas);
	},
});
