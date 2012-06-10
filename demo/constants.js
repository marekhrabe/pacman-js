var direction = {
	left: 1,
	right: 2,
	up: 4,
	down: 8,
};

var opposite = {
	1: 2,
	2: 1,
	4: 8,
	8: 4,	
};

var move = {
	1: [-1, 0],
	2: [1, 0],
	4: [0, -1],
	8: [0, 1],
};

var possibleTurns = {
	1: [1],
	2: [2],
	3: [1, 2],
	4: [4],
	5: [1, 4],
	6: [2, 4],
	7: [1, 2, 4],
	8: [8],
	9: [1, 8],
	10: [2, 8],
	11: [1, 2, 8],
	12: [4, 8],
	13: [1, 4, 8],
	14: [2, 4, 8],
	15: [1, 2, 4, 8],
};

var type = {
	wall: 1,
	floor: 2,
	free: 4,
	house: 8,
	food: 16,
	tunnel: 32,
	door: 64,
};

var mode = {
	scatter: 1,
	chase: 2,
	panic: 4,
};
