var Canvas = function (el, tileWidth, tileHeight) {
	this.width = el.width;
	this.height = el.height;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.ctx = el.getContext('2d');
};

Canvas.prototype.getRealX = function (x) {
	return this.tileWidth * x;
};
Canvas.prototype.getRealY = function (y) {
	return this.tileHeight * y;
};
